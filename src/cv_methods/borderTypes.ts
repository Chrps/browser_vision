import cv from "opencv-ts";

const getBorderTypes = (): { label: string; value: number }[] => {
  return [
    { label: "Replicate", value: cv.BORDER_REPLICATE },
    { label: "Constant", value: cv.BORDER_CONSTANT },
    { label: "Reflect", value: cv.BORDER_REFLECT },
    { label: "Wrap", value: cv.BORDER_WRAP },
    { label: "Reflect 101", value: cv.BORDER_REFLECT_101 },
    { label: "Transparent", value: cv.BORDER_TRANSPARENT },
    { label: "Isolated", value: cv.BORDER_ISOLATED },
  ];
};

export const getBorderTypeFromLabel = (label: string): number | undefined => {
  const selectedOption = getBorderTypes().find(
    (option) => option.label === label
  );
  if (selectedOption) {
    return selectedOption.value;
  }
};

// Function to get all border type labels
export const getBorderTypeLabels = (): string[] => {
  return getBorderTypes().map((option) => option.label);
};
