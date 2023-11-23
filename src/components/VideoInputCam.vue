<template>
  <div>
    <h1>Camera Component</h1>
    <video id="videoElement" autoplay></video>
    <canvas id="canvasOutput" style="display: none"></canvas>
  </div>
</template>

<script setup lang="ts">
import cv from "opencv-ts";
import { ref, onMounted } from "vue";

const videoElement = ref(null);
const canvasOutput = ref(null);
const cap = ref(null);

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.value.srcObject = stream;
    cap.value = new cv.VideoCapture("videoElement");
  } catch (error) {
    console.error("Error accessing the camera: ", error);
  }
};

const processVideo = () => {
  const src = new cv.Mat();
  const dst = new cv.Mat();

  if (cap.value.read(src)) {
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);

    // Resize to match the video feed size
    cv.resize(
      dst,
      dst,
      new cv.Size(videoElement.value.width, videoElement.value.height),
      0,
      0,
      cv.INTER_AREA
    );

    const ctx = canvasOutput.value.getContext("2d");
    cv.imshow(ctx, dst);
    src.delete();
    dst.delete();
  }

  requestAnimationFrame(processVideo);
};

onMounted(() => {
  videoElement.value = document.getElementById("videoElement");
  canvasOutput.value = document.getElementById("canvasOutput");
  startCamera();
  requestAnimationFrame(processVideo);
});
</script>
