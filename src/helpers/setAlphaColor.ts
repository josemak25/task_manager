export const setAlphaColor = (color: string, opacity: number = 1): string => {
  let newColor = color;

  if (!newColor.startsWith("#") || newColor.length !== 7) {
    console.warn("Make sure you set with full hex color value. Ex: #F00F00");
    newColor = "#FFFFFF";
  }

  if (opacity === 1) return newColor;

  const _opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
  return newColor + _opacity.toString(16).toUpperCase();
};
