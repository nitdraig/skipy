import { useState } from "react";

const Acortar = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleAcortar = async () => {
    try {
      // Lógica para acortar el enlace, puedes utilizar un servicio como Bitly o tu propia lógica.
      // Aquí deberías hacer una solicitud HTTP al servicio de acortamiento de enlaces.

      // Ejemplo de solicitud ficticia
      const response = await fetch("/api/acortar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setShortenedUrl(data.shortenedUrl);
    } catch (error) {
      console.error("Error al acortar el enlace:", error);
    }
  };

  return (
    <div>
      <h1>Acortar Enlace</h1>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleAcortar}>Acortar</button>
      {shortenedUrl && <p>Enlace acortado: {shortenedUrl}</p>}
    </div>
  );
};

export default Acortar;
