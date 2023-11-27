import cv from "opencv-ts";

const getInterpolationMethods = (): { label: string; value: number }[] => {
  return [
    { label: "Nearest", value: cv.INTER_NEAREST },
    { label: "Linear", value: cv.INTER_LINEAR },
    { label: "Cubic", value: cv.INTER_CUBIC },
    { label: "Area", value: cv.INTER_AREA },
    { label: "Lanczos4", value: cv.INTER_LANCZOS4 },
    { label: "Linear Exact", value: cv.INTER_LINEAR_EXACT },
    { label: "Nearest Exact", value: cv.INTER_NEAREST_EXACT },
    { label: "Max", value: cv.INTER_MAX },
    { label: "Fill Outliers", value: cv.WARP_FILL_OUTLIERS },
    { label: "Inverse Map", value: cv.WARP_INVERSE_MAP },
  ];
};

export function getInterpolationFromLabel(label: string): number | undefined {
  debugger;
  const selectedOption = getInterpolationMethods().find(
    (option) => option.label === label
  );
  if (selectedOption) {
    return selectedOption.value;
  }
}

export const getInterpolationLabels = (): string[] => {
  return getInterpolationMethods().map((option) => option.label);
};
