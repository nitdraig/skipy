// pages/desacortar/[id].js
import { useRouter } from "next/router";

const Desacortar = () => {
  const router = useRouter();
  const { id } = router.query;

  // Lógica para desacortar el enlace, puedes utilizar tu propia lógica o un servicio.

  return (
    <div>
      <h1>Desacortar Enlace</h1>
      <p>Enlace desacortado para {id}</p>
    </div>
  );
};

export default Desacortar;
