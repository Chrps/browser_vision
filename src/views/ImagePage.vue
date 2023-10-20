<template>
  <div>
    <label
      for="imageInput"
      class="file-input-label"
      style="display: none"
    ></label>
    <input
      type="file"
      accept="image/*"
      id="imageInput"
      @change="uploadImage"
      style="
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        cursor: pointer;
        top: 0;
        left: 0;
      "
    />
    <div
      class="drop-zone"
      @dragenter="dragEnter"
      @dragover="dragOver"
      @dragleave="dragLeave"
      @drop="handleDrop"
      @click="openFileDialog"
    >
      Drag and drop an image here or click to upload.
    </div>
    <div class="image-container">
      <img @load="handleImgSrcChange" id="srcImage" />
      <canvas id="outputCanvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import cv from "opencv-ts";

const supportedFormats = [
  "image/bmp",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/x-portable-bitmap",
  "image/x-portable-graymap",
  "image/x-portable-pixmap",
  "image/x-portable-anymap",
  "image/x-portable-raster",
  "image/tiff",
  "image/tiff-fx",
  "image/vnd.radiance",
  "image/vnd.radiance.rgb",
];

const uploadImage = (e: Event): void => {
  const inputElement = e.target as HTMLInputElement;
  if (!inputElement.files) {
    return;
  }
  const src: string = URL.createObjectURL(inputElement.files[0]);
  const img: HTMLImageElement | null = document.getElementById(
    "srcImage"
  ) as HTMLImageElement;
  if (img === null) return;
  img.setAttribute("src", src);
};

const openFileDialog = (): void => {
  const inputElement = document.getElementById(
    "imageInput"
  ) as HTMLInputElement;
  inputElement.click();
};

const handleImgSrcChange = (e: any): void => {
  const mat = cv.imread(e.target);
  cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
  cv.imshow("outputCanvas", mat);
};

const dragEnter = (e: DragEvent): void => {
  e.preventDefault();
  // Add any visual feedback for drag enter, e.g., highlighting the drop zone.
};

const dragOver = (e: DragEvent): void => {
  e.preventDefault();
  // Add any visual feedback for drag over, e.g., changing the cursor style.
};

const dragLeave = (e: DragEvent): void => {
  // Remove any visual feedback on drag leave.
};

const handleDrop = (e: DragEvent): void => {
  e.preventDefault();
  const items = e.dataTransfer?.items;
  // check if dropped items are files and they are images of supported formats
  if (!items) return;
  for (const item of items) {
    if (item.kind === "file" && supportedFormats.includes(item.type)) {
      const file = item.getAsFile();
      if (!file) {
        console.error("File is not supported");
        return;
      }
      const src: string = URL.createObjectURL(file);
      const img = document.getElementById("srcImage") as HTMLImageElement;
      img?.setAttribute("src", src);
      break;
    }
    console.error("File is not supported");
  }
};
</script>

<style scoped>
.drop-zone {
  border: 2px dashed #4caf50; /* Green border color */
  background: #e8f5e9; /* Light green background color */
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add a transition for a smoother hover effect */
  /* dark green text color*/
  color: #023020;
}

.drop-zone:hover {
  background: #c8e6c9; /* Darker green background color on hover */
}

/* Additional styling for the file input */
#imageInput {
  display: none; /* Hide the file input */
}

/* Recommended color palette */
:root {
  --primary-color: #4caf50; /* Green */
  --background-color: #e8f5e9; /* Light green background */
  --text-color: #333; /* Dark gray text color */
  --accent-color: #2196f3; /* Accent color for buttons, links, etc. */
}
.image-container {
  margin-top: 20px;
}
</style>
