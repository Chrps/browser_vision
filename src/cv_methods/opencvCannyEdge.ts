// components/opencvBlur.ts
import cv, { Mat } from "opencv-ts";

export const cannyEdge = (
  src: Mat,
  threshold1: number,
  threshold2: number
): Mat => {
  const dst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
  cv.Canny(src, dst, threshold1, threshold2);
  return dst;
};
