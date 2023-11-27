import cv from "opencv-ts";

const getThresholdingTypes = (): { label: string; value: number }[] => {
  return [
    { label: "Binary", value: cv.THRESH_BINARY },
    { label: "Binary Inverted", value: cv.THRESH_BINARY_INV },
    { label: "Truncated", value: cv.THRESH_TRUNC },
    { label: "To Zero", value: cv.THRESH_TOZERO },
    { label: "Otsu", value: cv.THRESH_OTSU },
    { label: "Triangle", value: cv.THRESH_TRIANGLE },
  ];
};

export const getThresholdingTypeFromLabel = (
  label: string
): number | undefined => {
  const selectedOption = getThresholdingTypes().find(
    (option) => option.label === label
  );
  if (selectedOption) {
    return selectedOption.value;
  }
};

export const getThresholdingTypeLabels = (): string[] => {
  return getThresholdingTypes().map((option) => option.label);
};
