"use client";
import { useEffect, useState } from "react";
import InputField from "./components/InputField";
import { useSearchParams } from "next/navigation";
import { convertColorToAllFormats } from "./conversion/colorConversion";
import { ColorFormat } from "./page";

export default function Home() {
  const searchParams = useSearchParams();

  const [color, setColor] = useState(searchParams?.get("color") || "#000000");
  const [colorFormat, setColorFormat] = useState<ColorFormat>(
    searchParams?.get("format") as ColorFormat || "hex"
  );

  const [colorFormats, setColorFormats] = useState(
    convertColorToAllFormats(color)
  );

  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const updateColorAndFormat = (newColor: string, newFormat?: ColorFormat) => {
    setColor(newColor);
    if (newFormat) {
      setColorFormat(newFormat);
    }

    try {
      const allFormats = convertColorToAllFormats(newColor);
      setColorFormats(allFormats);
    } catch (error) {
      console.error(error);
    }
  };

  const handleColorInputChange = (newColor: string) => {
    updateColorAndFormat(newColor);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFormat = e.target.value;
    setColorFormat(newFormat as ColorFormat);

    try {
      const allFormats = convertColorToAllFormats(color);
      setColorFormats(allFormats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams as any);
    params.set("color", color);
    params.set("format", colorFormat);

    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.replaceState(null, "", newUrl);
  }, [color, colorFormat, searchParams]);

  const handleCopy = (format: string, value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopiedFormat(format);
        setTimeout(() => {
          setCopiedFormat(null);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <main className="flex min-h-screen flex-col text-center p-8 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-2">Color Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert colors between different formats like HEX, RGB, HSL, and more.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 mb-8">
        <input
          type="color"
          value={colorFormats.hex}
          onChange={(e) => handleColorInputChange(e.target.value)}
          className="w-20 h-20 cursor-pointer border-2 border-border-light dark:border-border-dark rounded-full"
        />
        <InputField
          label={colorFormat.toUpperCase()}
          value={colorFormats[colorFormat]}
          format={colorFormat}
          onChange={handleColorInputChange}
        />
          <label className="text-lg mr-4">Format:</label>
        <div>
          <select
            value={colorFormat}
            onChange={handleFormatChange}
            className="p-2 border rounded w-full max-w-xs bg-white dark:bg-gray-700 border-border-light dark:border-border-dark text-text-light dark:text-text-dark"
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="rgba">RGBA</option>
            <option value="hsl">HSL</option>
            <option value="hsv">HSV</option>
            <option value="hsi">HSI</option>
            <option value="cmyk">CMYK</option>
            <option value="lab">LAB</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {Object.entries(colorFormats).map(([format, value]) => (
          <div
            key={format}
            className={`relative bg-card-bg-light dark:bg-card-bg-dark shadow-md rounded p-4 w-full max-w-sm cursor-pointer border border-border-light dark:border-border-dark ${
              copiedFormat === format ? "border-green-500" : ""
            }`}
            onClick={() => handleCopy(format, value)}
          >
            <h3 className="text-xl font-semibold mb-2 uppercase">{format}</h3>
            <p className="text-gray-700 dark:text-gray-300 break-all">
              {value}
            </p>
            {copiedFormat === format && (
              <span className="absolute top-2 right-2 text-sm text-green-600">
                Copied!
              </span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
