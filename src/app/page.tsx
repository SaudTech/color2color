"use client";
import { useState, useEffect } from "react";
import InputField from "./components/InputField";
import { useSearchParams } from "next/navigation";
import { convertColorToAllFormats } from "./conversion/colorConversion";
import Head from "next/head";
import ColorFormatGrid from "./components/ColorFormatGrid";

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
  const [color, setColor] = useState(searchParams?.get("color") || "#4A90E2");
  const [inputValue, setInputValue] = useState(color);
  const [colorFormats, setColorFormats] = useState(
    convertColorToAllFormats(color)
  );
  const [colorFormat, setColorFormat] = useState<ColorFormat>(
    (searchParams?.get("from") as ColorFormat) || "hex"
  );
  const [toFormat, setToFormat] = useState<ColorFormat>(
    (searchParams?.get("to") as ColorFormat) || "rgb"
  );

  useEffect(() => {
    setColorFormats(convertColorToAllFormats(color));
  }, [color]);

  const updateColorAndFormat = (newColor: string) => {
    setColor(newColor);
    setInputValue(newColor);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    try {
      const converted = convertColorToAllFormats(value);
      setColor(converted[colorFormat]);
    } catch (error) {
    }
  };

  const getPageTitle = () =>
    `Color Converter: ${colorFormat.toUpperCase()} to All Formats | Color2Color`;
  const getPageDescription = () =>
    `Convert ${colorFormat.toUpperCase()} colors to HEX, RGB, RGBA, HSL, HSV, HSI, CMYK, and LAB formats instantly. Free online color converter tool for designers and developers.`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourwebsite.com/color-converter" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph and Twitter Card meta tags */}
      </Head>

      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-6 py-3">
          <a
            href="/"
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            Color2Color
          </a>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          Color Converter
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-12">
          Transform colors between HEX, RGB, RGBA, HSL, HSV, HSI, CMYK, and LAB
          formats instantly.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <input
              type="color"
              value={colorFormats.hex}
              onChange={(e) => updateColorAndFormat(e.target.value)}
              className="w-full md:w-1/3 h-64 cursor-pointer border-4 border-gray-300 dark:border-gray-600 rounded-lg shadow-inner"
            />
            <div className="w-full md:w-2/3 space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 dark:text-text-dark text-text-light">
                <InputField
                  label={`${colorFormat.toUpperCase()} Color`}
                  value={inputValue}
                  format={colorFormat}
                  onChange={handleInputChange}
                />
                <div>
                  <label className="block text-lg mb-2 text-gray-700 dark:text-gray-300">
                    Format:
                  </label>
                  <select
                    value={colorFormat}
                    onChange={(e) => {
                      setColorFormat(e.target.value as ColorFormat);
                      setInputValue(
                        colorFormats[e.target.value as ColorFormat]
                      );
                    }}
                    className="p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  >
                    {[
                      "hex",
                      "rgb",
                      "rgba",
                      "hsl",
                      "hsv",
                      "hsi",
                      "cmyk",
                      "lab",
                    ].map((format) => (
                      <option key={format} value={format}>
                        {format.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <ColorFormatGrid
                colorFormats={colorFormats}
                highlight={toFormat.toUpperCase()}
              />
            </div>
          </div>
        </div>

        {/* How to Use and Why Use sections */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              How to Use Our Color Converter
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Choose your input color format from the dropdown menu.</li>
              <li>
                Enter your color value in the input field or use the color
                picker.
              </li>
              <li>
                Instantly see the converted color values in all available
                formats.
              </li>
              <li>Click on any format to copy the value to your clipboard.</li>
            </ol>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Why Use Color2Color Converter?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Support for 8 different color models</li>
              <li>Real-time conversions with instant updates</li>
              <li>User-friendly interface with visual color picker</li>
              <li>Accurate conversions for web and print projects</li>
              <li>Free to use with no registration required</li>
            </ul>
          </div>{" "}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-6 text-center">
        <p>
          Built with ❤️ by{" "}
          <a
            href="https://saudzubedi.com"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Saud
          </a>
        </p>
      </footer>
    </div>
  );
}
