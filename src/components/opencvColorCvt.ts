import cv, { Mat } from "opencv-ts";

// temp function
export const convertToGray = (mat: Mat | null): Mat | null => {
  if (mat === null) {
    console.error("Failed to convert to gray.");
    return null;
  }
  if (mat.empty()) {
    console.error("Failed to convert to gray.");
    return null;
  }
  const gray = new cv.Mat();
  cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY);
  return gray;
};
