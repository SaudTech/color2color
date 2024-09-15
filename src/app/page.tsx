"use client";
import { useEffect, useState } from "react";
import InputField from "./components/InputField";
import { useSearchParams } from "next/navigation";
import { convertColorToAllFormats } from "./conversion/colorConversion";
import Head from "next/head";
import { CardSpotlight } from "./components/ui/card-spotlight";
import { cn } from "./lib/utils";

export type ColorFormat =
  | "hex"
  | "rgb"
  | "rgba"
  | "hsl"
  | "hsv"
  | "hsi"
  | "cmyk"
  | "lab";

export default function Home() {
  const searchParams = useSearchParams();

  const [color, setColor] = useState(searchParams.get("color") || "#000000");

  const [colorFormats, setColorFormats] = useState(
    convertColorToAllFormats(color)
  );
  const [colorFormat, setColorFormat] = useState<ColorFormat>(
    (searchParams.get("format") as ColorFormat) || "hex"
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
  }, [color, colorFormat]);

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
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>
          Color Converter - Convert Colors Between HEX, RGB, HSL, and More
        </title>
        <meta
          name="description"
          content="Easily convert colors between different formats like HEX, RGB, HSL, and more with our Color Converter tool."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Additional meta tags */}
      </Head>
      {/* Navigation Bar */}

      <nav className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark text-center shadow"></nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center text-center p-8 bg-gray-50 dark:bg-bg-dark text-text-dark dark:text-gray-100">
        <div className="mb-8">
          <a href="/">
            <h1 className="text-4xl font-semibold mb-2">Color2Color</h1>
          </a>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Easily convert colors between different formats like HEX, RGB, HSL,
            and more. Simply pick a color or enter a color code to see its
            equivalent in various formats.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 mb-12">
          <input
            type="color"
            value={colorFormats.hex}
            onChange={(e) => handleColorInputChange(e.target.value)}
            className="w-24 h-24 cursor-pointer border-4 border-gray-300 dark:border-gray-700 rounded-full shadow-lg"
          />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <InputField
              label={colorFormat.toUpperCase()}
              value={colorFormats[colorFormat]}
              format={colorFormat}
              onChange={handleColorInputChange}
            />
            <div className="flex flex-col items-start">
              <label className="block text-lg mr-2">Format:</label>
              <select
                value={colorFormat}
                onChange={handleFormatChange}
                className="p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(colorFormats).map(([format, value]) => (
            <CardSpotlight
              key={format}
              className={`relative bg-white dark:bg-gray-800 shadow-md rounded p-6 cursor-pointer border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all max-w-[300px] min-w-[300px]  duration-200 ${
                copiedFormat === format ? "border-green-500" : ""
              }`}
              onClick={() => handleCopy(format, value)}
            >
              <div className="text-neutral-200 mt-4 relative z-20">
                <h3 className="text-2xl font-semibold mb-2 uppercase">
                  {format}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 break-all">
                  {value}
                </p>
                {copiedFormat === format && (
                  <span className="absolute top-2 right-2 text-sm text-green-600">
                    Copied!
                  </span>
                )}
              </div>
            </CardSpotlight>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            Built by{" "}
            <a
              href="https://saudzubedi.com"
              className="font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Saud
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
