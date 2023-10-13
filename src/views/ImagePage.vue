<template>
  <div>
    <label for="imageInput" class="file-input-label">Select an Image</label>
    <input
      type="file"
      accept="image/*"
      id="imageInput"
      @change="handleFileSelect"
      style="display: none"
    />
    <div
      class="drop-zone"
      @dragenter="dragEnter"
      @dragover="dragOver"
      @dragleave="dragLeave"
      @drop="handleDrop"
      @click="openFileInput"
    >
      Drag and drop an image here or click to upload.
    </div>
    <div class="image-container">
      <canvas
        id="imageCanvas"
        class="image-container"
        width="400"
        height="400"
      ></canvas>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import cv, { Mat, Rect } from "opencv-ts";

export default defineComponent({
  data() {
    return {
      imageSrc: null,
      src: null, // Store the OpenCV image
      isOpenCVReady: false, // Flag to track OpenCV readiness
    };
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.loadImage(file);
      }
    },
    loadImage(file) {
      if (!this.isOpenCVReady) {
        // OpenCV.js is not ready, handle this case
        console.error("OpenCV.js not loaded.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.src) {
          this.src.delete(); // Release the previous image
        }
        const imgElement = new Image();
        imgElement.src = e.target.result;
        imgElement.onload = () => {
          this.src = cv.imread(imgElement); // Load the image using OpenCV.js

          // Apply your OpenCV.js image processing logic here
          // Example: cv.cvtColor(this.src, this.src, cv.COLOR_BGR2GRAY);

          cv.imshow("imageCanvas", this.src);
          this.imageSrc = imgElement.src;
        };
      };
      reader.readAsDataURL(file);
    },
    dragEnter(event) {
      event.preventDefault();
    },
    dragOver(event) {
      event.preventDefault();
    },
    dragLeave(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        this.loadImage(file);
      }
    },
    openFileInput() {
      const fileInput = document.getElementById("imageInput");
      fileInput.click();
    },
  },
  mounted() {
    cv.onRuntimeInitialized = () => {
      this.isOpenCVReady = true;
    };
  },
});
</script>

<style scoped>
.drop-zone {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
.image-container {
  margin-top: 20px;
}
</style>
