<!-- views/ImageConvertPage.vue -->
<template>
  <div>
    <h1>Image Conversion</h1>
    <ImageUpload @image-uploaded="handleImageUploaded" />
    <div class="image-container" v-if="uploadedImage && outputImage">
      <!-- Row 1: Input and Output images side by side -->
      <div class="row">
        <div class="image-box">
          <span class="label">Input</span>
          <div class="image-wrapper">
            <img
              :src="uploadedImage.src"
              alt="Uploaded Image"
              class="scaled-image"
            />
          </div>
        </div>
        <div class="image-box">
          <span class="label">Output</span>
          <div class="image-wrapper">
            <img
              :src="outputImage.src"
              alt="Output Image"
              class="scaled-image"
            />
          </div>
        </div>
      </div>

      <!-- Row 2: Channels side by side -->
      <div class="row">
        <div class="image-box">
          <span class="label">Channels</span>
          <div class="image-wrapper">
            <!-- Add image elements for each channel -->
            <img
              v-for="(channelImage, index) in channelImages"
              :key="index"
              :src="channelImage?.src"
              class="scaled-image"
              alt="Channel Image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageUpload from "@/components/ImageUpload2.vue";
import {
  convertImageToMat,
  convertMatToImage,
} from "@/components/opencvBridge";
import {
  getNumberOfChannels,
  splitChannels,
} from "@/components/opencvChannels";
import { convertToGray } from "@/components/opencvColorCvt";
import { ref } from "vue";

const uploadedImage = ref<HTMLImageElement | null>(null);
const outputImage = ref<HTMLImageElement | null>(null);

// Additional references for channel images
const channelImages = ref<(HTMLImageElement | null)[]>([]);

// Handle the custom event when the image is uploaded
const handleImageUploaded = (imgElement: HTMLImageElement) => {
  console.log("Image uploaded");
  uploadedImage.value = imgElement;
  let mat = convertImageToMat(uploadedImage.value);
  // Convert the image to grayscale
  mat = convertToGray(mat);
  const outputImageElement = convertMatToImage(mat);
  console.log(outputImageElement);
  console.log(mat);
  outputImage.value = outputImageElement;

  const channels = splitChannels(mat);

  // Create images for each channel
  if (channels) {
    channelImages.value = channels.map((channelMat) =>
      convertMatToImage(channelMat)
    );
  } else {
    channelImages.value = []; // Set it to an empty array if 'channels' is null
  }
};
</script>

<style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap; /* Allow rows to wrap to the next line if necessary */
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Allow images to wrap within the row if necessary */
}

.image-box,
.channel-wrapper {
  margin: 10px;
  text-align: center;
  display: inline-block; /* Make image boxes inline-block */
  width: 45%; /* Specify a fixed width for each image box */
}

/* Add the following CSS for the channel images */
.channel-box {
  margin: 10px;
  text-align: center;
  display: inline-block;
  width: 45%; /* Adjust the width to match the input/output images */
}

.label {
  font-weight: bold;
}

.image-wrapper,
.channel-wrapper {
  max-width: 100%; /* Ensure the images don't exceed their container's width */
  max-height: 100vh; /* Ensure the images don't exceed the viewport's height */
  display: flex;
  align-items: center;
  justify-content: center;
}

.scaled-image,
.channel-image {
  width: 100%; /* Make sure all images have the same width */
  height: 100%; /* Make sure all images have the same height */
  object-fit: contain; /* Maintain aspect ratio and fit the images within the container */
}
</style>
