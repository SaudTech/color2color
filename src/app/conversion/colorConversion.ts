import * as chroma from "chroma.ts";

function formatPercentage(value: number) {
  return (value * 100).toFixed(2).replace(/\.00$/, "") + "%";
}

function formatDecimal(value: number) {
  return value.toFixed(2).replace(/\.00$/, "");
}

function formatLabValue(value: number) {
  return value === -0 ? 0 : parseFloat(formatDecimal(value));
}

function formatHue(value: number) {
  return ((value + 360) % 360).toFixed(2).replace(/\.00$/, "");
}

function sanitizeColorString(colorStr: string): string {
  return colorStr
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s*\(\s*/g, "(")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s*\)\s*/g, ")")
    .toLowerCase();
}

function parseColorString(colorStr: string): chroma.Color {
  const trimmedStr = colorStr.trim().toLowerCase();

  if (trimmedStr.startsWith("hsv(")) {
    const [h, s, v] = trimmedStr
      .slice(4, -1)
      .split(",")
      .map((val) => parseFloat(val));
    return chroma.hsv(h, s / 100, v / 100);
  } else if (trimmedStr.startsWith("cmyk(")) {
    const [c, m, y, k] = trimmedStr
      .slice(5, -1)
      .split(",")
      .map((val) => parseFloat(val) / 100);
    return chroma.cmyk(c, m, y, k);
  } else {
    return chroma.color(trimmedStr);
  }
}

export function convertColorToAllFormats(colorStr: string) {
  const sanitizedColorStr = sanitizeColorString(colorStr);
  let color: chroma.Color;

  try {
    color = parseColorString(sanitizedColorStr);
  } catch (error) {
    throw new Error("Invalid color format");
  }

  const rgb = color.rgb().map(Math.round);
  const rgba = [...rgb, color.alpha()];
  const hex = color.hex().toUpperCase(); // Returns uppercase hex

  const hsl = color.hsl();
  const hsv = color.hsv();
  const hsi = color.hsi();
  const cmyk = color.cmyk();
  const lab = color.lab();

  return {
    hex: hex,
    rgb: `rgb(${rgb.join(", ")})`,
    rgba: `rgba(${rgb.join(", ")}, ${formatDecimal(rgba[3])})`,
    hsl: `hsl(${formatHue(hsl[0])}, ${formatPercentage(
      hsl[1]
    )}, ${formatPercentage(hsl[2])})`,
    hsv: `hsv(${formatHue(hsv[0])}, ${formatPercentage(
      hsv[1]
    )}, ${formatPercentage(hsv[2])})`,
    hsi: `hsi(${formatHue(hsi[0])}, ${formatPercentage(
      hsi[1]
    )}, ${formatPercentage(hsi[2])})`,
    cmyk: `cmyk(${cmyk.map(formatPercentage).join(", ")})`,
    lab: `lab(${lab.map(formatLabValue).join(", ")})`,
  };
}
