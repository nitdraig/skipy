import React from "react";
import { Input } from "@nextui-org/react";
interface PasswordDisplayProps {
  password: any;
  copiedMessage: string;
  onCopyToClipboard: () => void;
}
const PasswordDisplay: React.FC<PasswordDisplayProps> = ({
  password,
  copiedMessage,
  onCopyToClipboard,
}) => (
  <div className="relative mt-6 h-36 w-full flex flex-col rounded-xl bg-white  bg-clip-border text-gray-700 shadow-md">
    <div className="p-6">
      <h5 className="mb-2 block font-sans text-xl  text-black font-semibold leading-snug tracking-normal antialiased">
        Contraseña Generada:
      </h5>
      <div className="flex items-center">
        <Input
          type="text"
          color="primary"
          variant="bordered"
          value={password}
          readOnly
          placeholder=""
          className="max-w-xs mr-2 text-black"
        />
        <button
          className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-[#91c1ff] transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={onCopyToClipboard}
        >
          {copiedMessage ? (
            <span className="mr-2">{copiedMessage}</span>
          ) : (
            <span>Copiar</span>
          )}
          <img
            width="28"
            height="28"
            className="bg-white dark:text-black"
            src="https://img.icons8.com/material-sharp/48/copy.png"
            alt="copy"
          />
        </button>
      </div>
    </div>
  </div>
);

export default PasswordDisplay;
