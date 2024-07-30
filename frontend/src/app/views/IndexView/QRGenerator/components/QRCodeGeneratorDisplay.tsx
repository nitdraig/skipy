import React from "react";
import QRCode from "qrcode.react";
interface QRCodeGeneratorDisplayProps {
  url: any;
  handleDownloadClick: () => void;
}
const QRCodeGeneratorDisplay: React.FC<QRCodeGeneratorDisplayProps> = ({
  url,
  handleDownloadClick,
}) => (
  <>
    <QRCode
      value={url}
      size={200}
      level="H"
      renderAs="canvas"
      id="qrcode-canvas"
      className="border border-blue-gray-200 mt-4"
    />
    <div className="flex items-center mt-2">
      <button
        className="group relative h-10 w-full sm:w-48 overflow-hidden rounded-[7px] bg-[#162255] text-lg font-bold text-white"
        onClick={handleDownloadClick}
      >
        Descargar QR
        <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
      </button>
    </div>
  </>
);

export default QRCodeGeneratorDisplay;
