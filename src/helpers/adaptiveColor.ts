export const adaptiveColor = (backgroundColor: string): string => {
  const foregroundColor = ["#000000", "#FFFFFF"];
  try {
    /*eslint no-bitwise: ["error", { "allow": ["&", ">>"] }] */
    const bgColor = backgroundColor.substring(1);
    const rgb = parseInt(bgColor, 16);
    const red = (rgb >> 16) & 0xff;
    const green = (rgb >> 8) & 0xff;
    const blue = (rgb >> 0) & 0xff;
    const brightness = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

    return brightness > 128 ? foregroundColor[0] : foregroundColor[1];
  } catch (error) {
    return foregroundColor[0]; // return black by default
  }
};
