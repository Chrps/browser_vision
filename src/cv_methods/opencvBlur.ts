// components/opencvBlur.ts
import cv, { Mat, Size, Point } from "opencv-ts";

export const blurImage = (
  src: Mat,
  ksize: Size,
  anchor: Point,
  borderType: number
): Mat => {
  const dst = new cv.Mat();
  cv.blur(src, dst, ksize, anchor, borderType);
  return dst;
};
