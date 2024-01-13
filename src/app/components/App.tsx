import React, { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const App = () => {
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
      <ThemeSwitcher />
      <div>
        <h1>Link Shortener</h1>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button onClick={shortenUrl}>Shorten</button>
        {shortenedUrl && (
          <div>
            <p>Shortened URL:</p>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
