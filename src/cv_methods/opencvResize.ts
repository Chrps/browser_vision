import cv, { Mat } from "opencv-ts";

export const resizeImage = (
  mat: Mat | null,
  w: number,
  h: number,
  interpolationMethod: number
): Mat | null => {
  console.log(interpolationMethod);
  if (mat === null) {
    console.error("Mat is null.");
    return null;
  }
  if (mat.empty()) {
    console.error("Mat is empty.");
    return null;
  }

  const resized = new cv.Mat();
  try {
    cv.resize(mat, resized, new cv.Size(w, h), 0, 0, interpolationMethod);
  } catch (error) {
    console.error("Error in cv.resize:", error);
    return null;
  }

  return resized;
};
