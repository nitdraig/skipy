import { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://skipy-back.onrender.com/${slug}`);

        if (response.ok) {
          const data = await response.json();

          if (data.redirectedUrl) {
            window.location.href = data.redirectedUrl;
          } else {
            console.error(
              "Error en la respuesta:",
              data.error || response.statusText
            );
          }
        } else {
          console.error("Error en la respuesta:", response.statusText);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <div>
      <p>Redirigiendo...</p>
    </div>
  );
};

export default RedirectPage;
