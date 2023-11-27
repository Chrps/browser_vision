import cv, { Mat } from "opencv-ts";

export const convertImageToMat = (
  image: HTMLImageElement | null
): Mat | null => {
  if (image === null) {
    console.error("Failed to convert HTMLImageElement to Mat.");
    return null;
  }
  const mat = cv.imread(image);
  if (mat.empty()) {
    console.error("Failed to convert HTMLImageElement to Mat.");
    return null;
  }
  return mat;
};

export const convertMatToImage = (mat: Mat | null): HTMLImageElement | null => {
  if (mat === null) {
    console.error("Failed to convert Mat to HTMLImageElement.");
    return null;
  }
  if (mat.empty()) {
    console.error("Failed to convert Mat to HTMLImageElement.");
    return null;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    console.error("Failed to get 2D context.");
    return null;
  }

  // creative way to convert Mat to Image
  canvas.width = mat.cols;
  canvas.height = mat.rows;
  cv.imshow(canvas, mat);
  const image = new Image();
  image.src = canvas.toDataURL("image/png");

  return image;
};
