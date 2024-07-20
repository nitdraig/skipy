import React from "react";

interface ShortenedURLDisplayProps {
  shortenedUrl: string;
  copiedMessage: string;
  copyToClipboard: () => void;
}

const ShortenedURLDisplay: React.FC<ShortenedURLDisplayProps> = ({
  shortenedUrl,
  copiedMessage,
  copyToClipboard,
}) => {
  return (
    <div className="w-full mt-4 m-auto sm:mt-0 text-center">
      {shortenedUrl && (
        <div className="relative mt-6 w-full flex flex-col rounded-xl bg-white items-center  bg-clip-border text-gray-700 shadow-md">
          <div className="p-6">
            <h5 className="mb-2 block font-sans text-xl text-black  font-semibold leading-snug tracking-normal antialiased">
              Link acortado:
            </h5>
            <a
              href={shortenedUrl}
              target="_blank"
              className="block font-sans text-[#91c1ff]  text-base font-light leading-relaxed text-inherit antialiased"
            >
              {shortenedUrl}
            </a>
          </div>
          <div className="p-6 pt-0">
            <button
              className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-[#91c1ff] transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={copyToClipboard}
            >
              {copiedMessage ? (
                <span className="mr-2">{copiedMessage}</span>
              ) : (
                <span>Copiar </span>
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
      )}
    </div>
  );
};

export default ShortenedURLDisplay;
