<!-- views/ImageConvertPage.vue -->
<template>
  <div>
    <h1 style="text-align: center">Image Converter</h1>
    <MediaInput @image-uploaded="handleImageUploaded" />
    <ImageGrid :images="images" :margin="10" :rows="1" />
    <ImageGrid :images="channelImages" :margin="10" :rows="1" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MediaInput from "@/components/MediaInput.vue";
import ImageGrid from "@/components/ImageGrid.vue";
import { splitChannels } from "@/cv_methods/opencvChannels";
import { convertToGray } from "@/cv_methods/opencvColorCvt";
import {
  convertImageToMat,
  convertMatToImage,
} from "@/cv_methods/opencvBridge";

const uploadedImage = ref<HTMLImageElement | null>(null);
const outputImage = ref<HTMLImageElement | null>(null);

// Additional references for channel images
const channelImages = ref<(HTMLImageElement | null)[]>([]);
const images = ref<(HTMLImageElement | null)[]>([]);

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

  if (outputImage.value === null) {
    return;
  }
  images.value = [uploadedImage.value, outputImage.value];

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

<style lang="scss">
@import "@/assets/styles/pallet.scss";

body {
  margin: 0; /* Remove the default margin */
}
</style>
