<!-- views/ImageConvertPage.vue -->
<template>
  <div>
    <h1 style="text-align: center">Blur</h1>
    <MediaInput @image-uploaded="handleImageUploaded" />
    <div class="input-row">
      <OptionInput
        title="Border Type"
        :options="selectOptions"
        @selectedOption="handleOptionSelected"
      />
      <PointInput
        title="Ksize"
        :xValue="ksize_x"
        :yValue="ksize_y"
        @update:xValue="handlePointChange('ksize_x', $event)"
        @update:yValue="handlePointChange('ksize_y', $event)"
      />
      <PointInput
        title="Anchor"
        :xValue="anchor_x"
        :yValue="anchor_y"
        @update:xValue="handlePointChange('anchor_x', $event)"
        @update:yValue="handlePointChange('anchor_y', $event)"
      />
    </div>
    <ImageGrid
      :images="images"
      :margin="10"
      :rows="1"
      :fixedWidth="isFixedWidth ? fixedWidth : 0"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import MediaInput from "@/components/MediaInput.vue";
import ImageGrid from "@/components/ImageGrid.vue";
import OptionInput from "@/components/OptionInput.vue";
import PointInput from "@/components/PointInput.vue";
import { blurImage } from "@/cv_methods/blur";
import {
  getBorderTypeFromLabel,
  getBorderTypeLabels,
} from "@/cv_methods/borderTypes";
import { convertImageToMat, convertMatToImage } from "@/cv_methods/bridge";
import cv, { Mat } from "opencv-ts";
import { useStore } from "vuex";
const store = useStore();

const uploadedImage = ref<HTMLImageElement | null>(null);
const outputImage = ref<HTMLImageElement | null>(null);
const images = ref<(HTMLImageElement | null)[]>([]);
const selectedBorderType = ref<number | null>(null);
const ksize_x = ref<number | undefined>(5);
const ksize_y = ref<number | undefined>(5);
const anchor_x = ref<number | undefined>(-1);
const anchor_y = ref<number | undefined>(-1);
const isFixedWidth = computed(() => store.state.isFixedWidth);
const fixedWidth = computed(() => store.state.fixedWidth);

selectedBorderType.value = 1; // Hack
const selectOptions = getBorderTypeLabels();

const handle = () => {
  if (uploadedImage.value === null) {
    return;
  }
  const ksize = new cv.Size(ksize_x.value as number, ksize_y.value as number);
  const anchor = new cv.Point(
    anchor_x.value as number,
    anchor_y.value as number
  );
  let mat = convertImageToMat(uploadedImage.value);
  mat = blurImage(
    mat as Mat,
    ksize,
    anchor,
    selectedBorderType.value as number
  );
  const outputImageElement = convertMatToImage(mat);

  outputImage.value = outputImageElement;
  if (outputImage.value === null) {
    return;
  }
  images.value = [uploadedImage.value, outputImage.value];
};

const handleOptionSelected = (selectedLabel: string) => {
  const selectedOption = getBorderTypeFromLabel(selectedLabel);
  if (selectedOption) {
    selectedBorderType.value = selectedOption;
    handle();
  }
};

const handlePointChange = (title: string, value: number) => {
  console.log("point changed: ", value, "title: ", title);
  switch (title) {
    case "ksize_x":
      ksize_x.value = value;
      break;
    case "ksize_y":
      ksize_y.value = value;
      break;
    case "anchor_x":
      anchor_x.value = value;
      break;
    case "anchor_y":
      anchor_y.value = value;
      break;
    default:
      break;
  }
  handle();
};

// Handle the custom event when the image is uploaded
const handleImageUploaded = (imgElement: HTMLImageElement) => {
  console.log("image uploaded: ", imgElement);
  uploadedImage.value = imgElement;
  images.value = [uploadedImage.value];
  handle();
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
</style>
