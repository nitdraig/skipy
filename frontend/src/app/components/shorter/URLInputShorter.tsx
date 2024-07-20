// URLInput.tsx
import React from "react";

interface URLInputProps {
  originalUrl: string;
  setOriginalUrl: React.Dispatch<React.SetStateAction<string>>;
  shortenUrl: () => void;
  error: string;
}

const URLInput: React.FC<URLInputProps> = ({
  originalUrl,
  setOriginalUrl,
  shortenUrl,
  error,
}) => {
  return (
    <div className="flex flex-col  sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] rounded-xl shadow-md">
        <input
          id="email"
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#91c1ff] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=""
          required
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#91c1ff] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#91c1ff] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#91c1ff] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          ejemplo.com
        </label>
      </div>
      <div className="mt-4 sm:mt-0">
        <button
          onClick={shortenUrl}
          type="submit"
          className="group relative h-10 w-full sm:w-48 overflow-hidden rounded-[7px] bg-[#162255] text-lg font-bold text-white"
        >
          Acortar
          <div className="absolute inset-0 h-full w-full scale-0 rounded-[7px] transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>
      </div>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default URLInput;
