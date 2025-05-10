import { PleasantLightness, PleasantSaturation } from "./const";

export const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const k = (n: number): number => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number): number =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const toHex = (x: number): string => {
    const hex = Math.round(255 * f(x)).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(0)}${toHex(8)}${toHex(4)}`;
};

export const generatePleasantColor = (): string => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = PleasantSaturation;
  const lightness = PleasantLightness;

  return hslToHex(hue, saturation, lightness);
};
