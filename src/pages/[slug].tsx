import { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/shorter/${slug}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.redirectedUrl) {
            window.location.href = data.redirectedUrl;
          } else {
            console.error("Error en la respuesta");
          }
        } else {
          console.error("Error en la respuesta");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud");
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
