import LinkModel from "../models/linkModels";
import generateSlug from "../utils/slugGenerator";
import isValidUrl from "../utils/urlValidator";
import { Request, Response } from "express";
import https from "https";
import http from "http";
import { URL } from "url";

interface CreateShortLinkRequest {
  originalUrl: string;
}

interface UnshortenUrlRequest {
  shortUrl: string;
}

async function createShortLink(
  req: Request<{}, {}, CreateShortLinkRequest>,
  res: Response
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  let { originalUrl } = req.body;

  if (
    !originalUrl.startsWith("http://") &&
    !originalUrl.startsWith("https://")
  ) {
    originalUrl = "https://" + originalUrl;
  }

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "URL no válida" });
  }

  try {
    const existingLink = await LinkModel.findOne({ originalUrl });

    if (existingLink) {
      const frontendDomain = req.headers.origin || `http://${req.headers.host}`;
      const shortenedUrl = `${frontendDomain}/${existingLink.slug}`;
      return res.status(200).json({ shortenedUrl });
    }

    const slug = generateSlug();

    await LinkModel.create({ originalUrl, slug });

    const frontendDomain = req.headers.origin || `http://${req.headers.host}`;
    const shortenedUrl = `${frontendDomain}/${slug}`;

    res.status(200).json({ shortenedUrl });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function redirectToOriginalUrl(req: Request, res: Response) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ error: "Slug no proporcionado" });
  }

  try {
    const existingLink = await LinkModel.findOne({ slug });

    if (!existingLink) {
      return res.status(404).json({ error: "Enlace no encontrado" });
    }

    res.redirect(302, existingLink.originalUrl);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

function followRedirect(url: string, maxRedirects = 10): Promise<string> {
  return new Promise((resolve, reject) => {
    let redirects = 0;
    const visited = new Set<string>();

    const fetchUrl = (currentUrl: string) => {
      if (visited.has(currentUrl)) {
        return reject(new Error("Loop de redirección detectado"));
      }
      visited.add(currentUrl);

      if (redirects > maxRedirects) {
        return reject(new Error(`Demasiadas redirecciones (>${maxRedirects})`));
      }

      const lib = currentUrl.startsWith("https") ? https : http;

      const req = lib.get(
        currentUrl,
        {
          timeout: 10000, // 10 segundos de timeout
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; URL-Unshortener/1.0)",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate",
            Connection: "keep-alive",
          },
        },
        (res) => {
          const statusCode = res.statusCode || 0;

          // Manejar diferentes tipos de redirección
          if (statusCode >= 300 && statusCode < 400 && res.headers.location) {
            redirects++;

            // Resuelve URLs relativas y absolutas
            let nextUrl: string;
            try {
              nextUrl = new URL(res.headers.location, currentUrl).href;
            } catch (err) {
              return reject(
                new Error(
                  `URL de redirección inválida: ${res.headers.location}`
                )
              );
            }

            console.log(
              `Redirección ${redirects}: ${currentUrl} -> ${nextUrl}`
            );
            fetchUrl(nextUrl);
          } else if (statusCode >= 200 && statusCode < 300) {
            resolve(currentUrl);
          } else {
            reject(
              new Error(
                `Código de estado inesperado: ${statusCode} para URL: ${currentUrl}`
              )
            );
          }
        }
      );

      req.on("error", (err) => {
        reject(new Error(`Error de red: ${err.message}`));
      });

      req.on("timeout", () => {
        req.destroy();
        reject(new Error("Timeout: La solicitud tardó demasiado"));
      });

      req.end();
    };

    try {
      new URL(url);
      fetchUrl(url);
    } catch (err) {
      reject(new Error(`URL inicial inválida: ${url}`));
    }
  });
}

async function unshortenUrl(
  req: Request<{}, {}, UnshortenUrlRequest>,
  res: Response
) {
  const { shortUrl } = req.body;

  if (!shortUrl || typeof shortUrl !== "string") {
    return res.status(400).json({
      success: false,
      message: "URL inválida o no proporcionada",
    });
  }

  // Validar formato de URL
  if (!isValidUrl(shortUrl)) {
    return res.status(400).json({
      success: false,
      message: "Formato de URL inválido",
    });
  }

  try {
    console.log(`Intentando expandir URL: ${shortUrl}`);

    const finalUrl = await followRedirect(shortUrl);

    console.log(`URL final obtenida: ${finalUrl}`);

    return res.status(200).json({
      success: true,
      originalUrl: shortUrl,
      finalUrl: finalUrl,
      message: "URL expandida exitosamente",
    });
  } catch (err) {
    console.error("Error al seguir redirección:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";

    return res.status(500).json({
      success: false,
      message: `No se pudo obtener la URL final: ${errorMessage}`,
      originalUrl: shortUrl,
    });
  }
}

async function extractRedirectFromHTML(
  html: string,
  baseUrl: string
): Promise<string | null> {
  // Buscar meta refresh
  const metaRefreshMatch = html.match(
    /<meta[^>]*http-equiv=["']refresh["'][^>]*content=["'](?:\d+;)?\s*url=([^"']+)["']/i
  );
  if (metaRefreshMatch) {
    return new URL(metaRefreshMatch[1], baseUrl).href;
  }

  const jsRedirectMatches = [
    /window\.location\.href\s*=\s*["']([^"']+)["']/gi,
    /window\.location\s*=\s*["']([^"']+)["']/gi,
    /location\.href\s*=\s*["']([^"']+)["']/gi,
    /location\s*=\s*["']([^"']+)["']/gi,
    /document\.location\s*=\s*["']([^"']+)["']/gi,
    /window\.open\s*\(\s*["']([^"']+)["']/gi,
  ];

  for (const regex of jsRedirectMatches) {
    const match = regex.exec(html);
    if (match && match[1]) {
      try {
        return new URL(match[1], baseUrl).href;
      } catch {
        continue;
      }
    }
  }

  return null;
}

async function unshortenUrlWithFetch(
  req: Request<{}, {}, UnshortenUrlRequest>,
  res: Response
) {
  const { shortUrl } = req.body;

  if (!shortUrl || typeof shortUrl !== "string") {
    return res.status(400).json({
      success: false,
      message: "URL inválida o no proporcionada",
    });
  }

  if (!isValidUrl(shortUrl)) {
    return res.status(400).json({
      success: false,
      message: "Formato de URL inválido",
    });
  }

  try {
    console.log(`Intentando expandir URL: ${shortUrl}`);

    const response = await fetch(shortUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    let finalUrl = response.url;

    if (
      finalUrl === shortUrl ||
      finalUrl.includes(new URL(shortUrl).hostname)
    ) {
      console.log("No se detectó redirección HTTP, parseando HTML...");

      const html = await response.text();
      const extractedUrl = await extractRedirectFromHTML(html, shortUrl);

      if (extractedUrl) {
        finalUrl = extractedUrl;
        console.log(`URL extraída del HTML: ${finalUrl}`);
      }
    }

    console.log(`URL final obtenida: ${finalUrl}`);

    const isExpanded =
      finalUrl !== shortUrl && !finalUrl.includes(new URL(shortUrl).hostname);

    return res.status(200).json({
      success: true,
      originalUrl: shortUrl,
      finalUrl: finalUrl,
      isExpanded: isExpanded,
      message: isExpanded
        ? "URL expandida exitosamente"
        : "No se pudo expandir la URL (posiblemente requiere JavaScript)",
    });
  } catch (err) {
    console.error("Error al expandir URL:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";

    return res.status(500).json({
      success: false,
      message: `No se pudo obtener la URL final: ${errorMessage}`,
      originalUrl: shortUrl,
    });
  }
}

async function unshortenUrlWithPuppeteer(
  req: Request<{}, {}, UnshortenUrlRequest>,
  res: Response
) {
  const { shortUrl } = req.body;

  if (!shortUrl || typeof shortUrl !== "string") {
    return res.status(400).json({
      success: false,
      message: "URL inválida o no proporcionada",
    });
  }

  if (!isValidUrl(shortUrl)) {
    return res.status(400).json({
      success: false,
      message: "Formato de URL inválido",
    });
  }

  let browser;
  try {
    console.log(`Intentando expandir URL con Puppeteer: ${shortUrl}`);

    const puppeteer = await import("puppeteer");

    browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(shortUrl, {
      waitUntil: "networkidle2",
      timeout: 15000,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const finalUrl = page.url();

    await browser.close();

    console.log(`URL final obtenida: ${finalUrl}`);

    const isExpanded = finalUrl !== shortUrl;

    return res.status(200).json({
      success: true,
      originalUrl: shortUrl,
      finalUrl: finalUrl,
      isExpanded: isExpanded,
      message: "URL expandida exitosamente",
    });
  } catch (err) {
    if (browser) {
      await browser.close();
    }

    console.error("Error al expandir URL con Puppeteer:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";

    return res.status(500).json({
      success: false,
      message: `No se pudo obtener la URL final: ${errorMessage}`,
      originalUrl: shortUrl,
    });
  }
}

async function unshortenUrlHybrid(
  req: Request<{}, {}, UnshortenUrlRequest>,
  res: Response
) {
  const { shortUrl } = req.body;

  if (!shortUrl || typeof shortUrl !== "string") {
    return res.status(400).json({
      success: false,
      message: "URL inválida o no proporcionada",
    });
  }

  if (!isValidUrl(shortUrl)) {
    return res.status(400).json({
      success: false,
      message: "Formato de URL inválido",
    });
  }

  try {
    console.log(`Método híbrido - Intentando expandir: ${shortUrl}`);

    const response = await fetch(shortUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        Referer: "https://google.com/",
      },
    });

    let finalUrl = response.url;
    let method = "HTTP redirect";

    if (
      finalUrl === shortUrl ||
      finalUrl.includes(new URL(shortUrl).hostname)
    ) {
      console.log("Parseando HTML para encontrar redirecciones...");

      const html = await response.text();
      const extractedUrl = await extractRedirectFromHTML(html, shortUrl);

      if (extractedUrl) {
        finalUrl = extractedUrl;
        method = "HTML parsing";
        console.log(`URL encontrada en HTML: ${finalUrl}`);
      } else {
        console.log("HTML parsing falló, intentando con Puppeteer...");

        try {
          const puppeteer = await import("puppeteer");
          const browser = await puppeteer.default.launch({
            headless: true,
            args: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-web-security",
            ],
          });

          const page = await browser.newPage();
          await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          );

          await page.goto(shortUrl, {
            waitUntil: "networkidle2",
            timeout: 15000,
          });

          await new Promise((resolve) => setTimeout(resolve, 3000));

          finalUrl = page.url();
          method = "Puppeteer (JavaScript execution)";

          await browser.close();

          console.log(`URL obtenida con Puppeteer: ${finalUrl}`);
        } catch (puppeteerError) {
          console.log("Puppeteer no disponible o falló:", puppeteerError);
          method = "Failed - requires JavaScript";
        }
      }
    }

    const isExpanded =
      finalUrl !== shortUrl && !finalUrl.includes(new URL(shortUrl).hostname);

    return res.status(200).json({
      success: true,
      originalUrl: shortUrl,
      finalUrl: finalUrl,
      isExpanded: isExpanded,
      method: method,
      message: isExpanded
        ? `URL expandida usando: ${method}`
        : "No se pudo expandir la URL",
    });
  } catch (err) {
    console.error("Error en método híbrido:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";

    return res.status(500).json({
      success: false,
      message: `Error: ${errorMessage}`,
      originalUrl: shortUrl,
    });
  }
}

export {
  createShortLink,
  redirectToOriginalUrl,
  unshortenUrl,
  unshortenUrlWithFetch,
  unshortenUrlWithPuppeteer,
  unshortenUrlHybrid,
};
