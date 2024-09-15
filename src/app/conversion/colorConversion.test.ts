import { convertColorToAllFormats } from "./colorConversion";

describe("convertColorToAllFormats", () => {
  test("converts black correctly", () => {
    const result = convertColorToAllFormats("#000000");
    expect(result).toEqual({
      rgb: "rgb(0, 0, 0)",
      rgba: "rgba(0, 0, 0, 1)",
      hsl: "hsl(0, 0%, 0%)",
      hsi: "hsi(0, 0%, 0%)",
      hex: "#000000",
      cmyk: "cmyk(0%, 0%, 0%, 100%)",
      lab: "lab(0, 0, 0)",
      hsv: "hsv(0, 0%, 0%)",
    });
  });

  test("converts white correctly", () => {
    const result = convertColorToAllFormats("#FFFFFF");
    expect(result).toEqual({
      rgb: "rgb(255, 255, 255)",
      rgba: "rgba(255, 255, 255, 1)",
      hsl: "hsl(0, 0%, 100%)",
      hsi: "hsi(0, 0%, 100%)",
      cmyk: "cmyk(0%, 0%, 0%, 0%)",
      hex: "#FFFFFF",
      lab: "lab(100, 0, 0)",
      hsv: "hsv(0, 0%, 100%)",
    });
  });

  test("converts red correctly", () => {
    const result = convertColorToAllFormats("#FF0000");
    expect(result).toEqual({
      rgb: "rgb(255, 0, 0)",
      rgba: "rgba(255, 0, 0, 1)",
      hsl: "hsl(0, 100%, 50%)",
      hsi: "hsi(0, 100%, 33.33%)",
      cmyk: "cmyk(0%, 100%, 100%, 0%)",
      hex: "#FF0000",
      lab: "lab(53.24, 80.09, 67.2)",
      hsv: "hsv(0, 100%, 100%)",
    });
  });
  test("converts purple-ish correctly", () => {
    const result = convertColorToAllFormats("#9914e1");
    expect(result).toEqual({
      rgb: "rgb(153, 20, 225)",
      rgba: "rgba(153, 20, 225, 1)",
      hsl: "hsl(278.93, 83.67%, 48.04%)",
      hsi: "hsi(279.75, 84.92%, 52.03%)", // Updated intensity value
      cmyk: "cmyk(32%, 91.11%, 0%, 11.76%)",
      hex: "#9914E1",
      lab: "lab(42.32, 77.19, -73.89)",
      hsv: "hsv(278.93, 91.11%, 88.24%)",
    });
  });

  test("converts a pastel color correctly", () => {
    const result = convertColorToAllFormats("#FFB6C1"); // Light pink
    expect(result).toEqual({
      rgb: "rgb(255, 182, 193)",
      rgba: "rgba(255, 182, 193, 1)",
      hsl: "hsl(350.96, 100%, 85.69%)",
      hsi: "hsi(351.97, 13.33%, 82.35%)",
      cmyk: "cmyk(0%, 28.63%, 24.31%, 0%)",
      hex: "#FFB6C1",
      lab: "lab(81.05, 27.96, 5.04)",
      hsv: "hsv(350.96, 28.63%, 100%)",
    });
  });

  test("handles lowercase hex values", () => {
    const result = convertColorToAllFormats("#00ff00");
    expect(result.rgb).toBe("rgb(0, 255, 0)");
  });

  test("handles 3-digit hex values", () => {
    const result = convertColorToAllFormats("#0F0");
    expect(result.rgb).toBe("rgb(0, 255, 0)");
  });

  test("handles hex values with alpha", () => {
    const result = convertColorToAllFormats("#00FF0080");
    expect(result.rgba).toBe("rgba(0, 255, 0, 0.50)");
  });

  test("throws an error for invalid hex values", () => {
    expect(() => convertColorToAllFormats("#GG0000")).toThrow();
  });

  test("rounds RGB values correctly", () => {
    const result = convertColorToAllFormats("#7FAFD4");
    expect(result.rgb).toBe("rgb(127, 175, 212)");
  });

  test("formats HSL values correctly", () => {
    const result = convertColorToAllFormats("#FF8000");
    expect(result.hsl).toMatch("hsl(30.12, 100%, 50%)");
  });

  test("formats CMYK values correctly", () => {
    const result = convertColorToAllFormats("#800080");
    expect(result.cmyk).toMatch("cmyk(0%, 100%, 0%, 49.80%)");
  });
});

describe("convertColorToAllFormats", () => {
  test("converts HEX color correctly", () => {
    const result = convertColorToAllFormats("#FF5733");
    expect(result).toEqual({
      hex: "#FF5733",
      rgb: "rgb(255, 87, 51)",
      rgba: "rgba(255, 87, 51, 1)",
      hsl: "hsl(10.59, 100%, 60%)",
      hsv: "hsv(10.59, 80%, 100%)",
      hsi: "hsi(9.52, 61.07%, 51.37%)",
      cmyk: "cmyk(0%, 65.88%, 80%, 0%)",
      lab: "lab(60.18, 62.06, 54.34)",
    });
  });

  test("converts RGB color correctly", () => {
    const result = convertColorToAllFormats("rgb(255, 0, 0)");
    expect(result).toEqual({
      hex: "#FF0000",
      rgb: "rgb(255, 0, 0)",
      rgba: "rgba(255, 0, 0, 1)",
      hsl: "hsl(0, 100%, 50%)",
      hsv: "hsv(0, 100%, 100%)",
      hsi: "hsi(0, 100%, 33.33%)",
      cmyk: "cmyk(0%, 100%, 100%, 0%)",
      lab: "lab(53.24, 80.09, 67.2)",
    });
  });

  test("converts RGBA color correctly", () => {
    const result = convertColorToAllFormats("rgba(0, 255, 0, 0.5)");
    expect(result).toEqual({
      hex: "#00FF00",
      rgb: "rgb(0, 255, 0)",
      rgba: "rgba(0, 255, 0, 0.50)",
      hsl: "hsl(120, 100%, 50%)",
      hsv: "hsv(120, 100%, 100%)",
      hsi: "hsi(120, 100%, 33.33%)",
      cmyk: "cmyk(100%, 0%, 100%, 0%)",
      lab: "lab(87.73, -86.18, 83.18)",
    });
  });

  test("converts HSL color correctly", () => {
    const result = convertColorToAllFormats("hsl(240, 100%, 50%)");
    expect(result).toEqual({
      hex: "#0000FF",
      rgb: "rgb(0, 0, 255)",
      rgba: "rgba(0, 0, 255, 1)",
      hsl: "hsl(240, 100%, 50%)",
      hsv: "hsv(240, 100%, 100%)",
      hsi: "hsi(240, 100%, 33.33%)",
      cmyk: "cmyk(100%, 100%, 0%, 0%)",
      lab: "lab(32.3, 79.19, -107.86)",
    });
  });

  test("converts HSV color correctly", () => {
    const result = convertColorToAllFormats("hsv(60, 100%, 100%)");
    expect(result).toEqual({
      hex: "#FFFF00",
      rgb: "rgb(255, 255, 0)",
      rgba: "rgba(255, 255, 0, 1)",
      hsl: "hsl(60, 100%, 50%)",
      hsv: "hsv(60, 100%, 100%)",
      hsi: "hsi(60, 100%, 66.67%)",
      cmyk: "cmyk(0%, 0%, 100%, 0%)",
      lab: "lab(97.14, -21.55, 94.48)",
    });
  });

  test("converts CMYK color correctly", () => {
    const result = convertColorToAllFormats("cmyk(0%, 0%, 0%, 100%)");
    expect(result).toEqual({
      hex: "#000000",
      rgb: "rgb(0, 0, 0)",
      rgba: "rgba(0, 0, 0, 1)",
      hsl: "hsl(0, 0%, 0%)",
      hsv: "hsv(0, 0%, 0%)",
      hsi: "hsi(0, 0%, 0%)",
      cmyk: "cmyk(0%, 0%, 0%, 100%)",
      lab: "lab(0, 0, 0)",
    });
  });


  test("converts color with spaces correctly", () => {
    const result = convertColorToAllFormats(" rgb ( 128 , 128 , 128 ) ");
    expect(result.rgb).toBe("rgb(128, 128, 128)");
  });

  test("converts color with uppercase format correctly", () => {
    const result = convertColorToAllFormats("HSL(180, 50%, 50%)");
    expect(result.hsl).toBe("hsl(180, 50%, 50%)");
  });

  test("converts color with percentage RGB values", () => {
    const result = convertColorToAllFormats("rgb(50%, 50%, 50%)");
    expect(result.rgb).toBe("rgb(128, 128, 128)");
  });
});
