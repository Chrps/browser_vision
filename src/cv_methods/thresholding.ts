// components/opencvBlur.ts
import cv, { Mat } from "opencv-ts";

export const thresholding = (
  src: Mat,
  threshold: number,
  max_val: number,
  thesholding_type: number
): Mat => {
  const dst = new cv.Mat();
  if (
    thesholding_type == cv.THRESH_OTSU ||
    thesholding_type == cv.THRESH_TRIANGLE
  ) {
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
  }
  cv.threshold(src, dst, threshold, max_val, thesholding_type);
  return dst;
};
