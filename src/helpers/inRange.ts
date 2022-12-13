// return true if in range, otherwise false
export const inRange = (x: number, min: number, max: number): boolean => {
  "worklet";
  return (x - min) * (x - max) <= 0;
};
