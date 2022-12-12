const size = {
  xs: 10,
  s: 12,
  default: 14,
  md: 16,
  lg: 20,
  xlg: 24,
  xxlg: 30,
};

interface FontWeightType {
  full: "900";
  semi: "600";
  bold: "bold";
  normal: "normal";
  thin: "400";
}

const weight: FontWeightType = {
  full: "900",
  semi: "600",
  bold: "bold",
  normal: "normal",
  thin: "400",
};

const variants = {
  thin: "roboto-thin",
  bold: "roboto-bold",
  light: "roboto-light",
  medium: "roboto-medium",
  regular: "roboto-regular",
};

export default {
  size,
  weight,
  variants,
};
