import cv from "opencv-ts";

// Define border types
const borderTypes = [
  { label: "Replicate", value: cv.BORDER_REPLICATE },
  { label: "Constant", value: cv.BORDER_CONSTANT },
  { label: "Reflect", value: cv.BORDER_REFLECT },
  { label: "Wrap", value: cv.BORDER_WRAP },
  { label: "Reflect 101", value: cv.BORDER_REFLECT_101 },
  { label: "Transparent", value: cv.BORDER_TRANSPARENT },
  { label: "Isolated", value: cv.BORDER_ISOLATED },
];

// Function to get border type value from label
export const getBorderTypeFromLabel = (label: string): number | undefined => {
  const borderTypes = [
    { label: "Replicate", value: cv.BORDER_REPLICATE },
    { label: "Constant", value: cv.BORDER_CONSTANT },
    { label: "Reflect", value: cv.BORDER_REFLECT },
    { label: "Wrap", value: cv.BORDER_WRAP },
    { label: "Reflect 101", value: cv.BORDER_REFLECT_101 },
    { label: "Transparent", value: cv.BORDER_TRANSPARENT },
    { label: "Isolated", value: cv.BORDER_ISOLATED },
  ];
  const selectedOption = borderTypes.find((option) => option.label === label);
  if (selectedOption) {
    return selectedOption.value;
  }
};

// Function to get all border type labels
export const getBorderTypeLabels = (): string[] => {
  return borderTypes.map((option) => option.label);
};
