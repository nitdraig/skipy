import { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/unshorter?slug=${slug}`);
        const data = await response.json();

        if (response.ok && data.originalUrl) {
          window.location.replace(data.originalUrl);
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
