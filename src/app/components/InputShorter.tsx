import { Button } from "@nextui-org/react";
import React, { useState } from "react";

export const InputShorter = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const shortenUrl = async () => {
    const response = await fetch("/api/shorter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();
    setShortenedUrl(data.shortenedUrl);
  };
  return (
    <div>
      <h3>Link Shortener</h3>
      <div className="flex flex-col mt-8 space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
        <input
          id="email"
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="px-6 py-3 text-white border rounded-md  dark:text-white dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring sm:mx-2"
          placeholder="Email Address"
        />

        <Button className="w-6" onClick={shortenUrl}>
          Acortar
        </Button>
      </div>

      {shortenedUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
};
