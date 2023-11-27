<template>
  <div>
    <h1 style="text-align: center">Image Blur</h1>
    <MediaInput @image-uploaded="handleImageUploaded" />

    <div class="input-row">
      <userCodeInput
        v-model:userCode="userCode"
        @output-updated="handleOutputUpdated"
      />
      <button class="generic-button" @click="runUserCode">Run</button>
    </div>
    <ImageGrid :images="images" :margin="10" :rows="1" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import cv, { Mat } from "opencv-ts";
import MediaInput from "@/components/MediaInput.vue";
import ImageGrid from "@/components/ImageGrid.vue";
import userCodeInput from "@/components/userCodeInput.vue";
import { userCode } from "@/cv_methods/blur";
import {
  convertImageToMat,
  convertMatToImage,
} from "@/cv_methods/bridge";

const uploadedImage = ref<HTMLImageElement | null>(null);
const outputImage = ref<HTMLImageElement | null>(null);
const images = ref<(HTMLImageElement | null)[]>([]);
const mat = ref<Mat | null>(null);

// Handle the custom event when the image is uploaded
const handleImageUploaded = (imgElement: HTMLImageElement) => {
  console.log("Image uploaded");
  uploadedImage.value = imgElement;

  images.value = [uploadedImage.value];

  mat.value = convertImageToMat(uploadedImage.value);

  if (outputImage.value === null) {
    return;
  }

  console.log("uploadedImage.value", uploadedImage.value);
  console.log("outputImage.value", outputImage.value);

  images.value = [uploadedImage.value, outputImage.value];
};

// Handle the custom event when the output image is updated
const handleOutputUpdated = (output: Mat) => {
  console.log("Output updated");
  outputImage.value = convertMatToImage(output);
  images.value = [uploadedImage.value, outputImage.value];
};

// Function to run the user code
const runUserCode = () => {
  console.log("running user code");
  debugger;
  // Create params object with Mat as one of its properties
  const params = {
    inputMat: convertImageToMat(uploadedImage.value),
    ksize: new cv.Size(3, 3), // Example kernel size
    anchor: new cv.Point(-1, -1), // Example anchor point
    borderType: cv.BORDER_DEFAULT, // Example border type
  };
  // set params and userCode of userCodeInput component and call runCode method of userCodeInput component
};
</script>

<style lang="scss">
@import "@/assets/styles/pallet.scss";

body {
  margin: 0; /* Remove the default margin */
}

.input-row {
  display: flex;
}

.generic-button {
  background-color: var(--dark-secondary);
  color: var(--text-color);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  align-items: center;
  font-weight: bold;
  text-align: center;
  font-size: 1.5em;
  padding-top: 5px;
  padding-bottom: 5px;
}

.generic-button:hover {
  background-color: var(--light-secondary);
}
</style>
