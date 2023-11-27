import cv, { Mat } from "opencv-ts";

export const getNumberOfChannels = (mat: Mat | null): number => {
  if (mat === null) {
    console.error("Failed to get number of channels.");
    return -1;
  }
  if (mat.empty()) {
    console.error("Failed to get number of channels.");
    return -1;
  }
  return mat.channels();
};

export const splitChannels = (mat: Mat | null): Mat[] | null => {
  if (mat === null) {
    console.error("Failed to split channels.");
    return null;
  }
  if (mat.empty()) {
    console.error("Failed to split channels.");
    return null;
  }
  const channels = new cv.MatVector();
  cv.split(mat, channels);
  const channelsArray = [];
  for (let i = 0; i < channels.size(); i++) {
    channelsArray.push(channels.get(i));
  }
  return channelsArray;
};
