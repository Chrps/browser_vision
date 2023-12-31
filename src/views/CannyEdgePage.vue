<!-- views/ImageConvertPage.vue -->
<template>
  <div>
    <h1 style="text-align: center">Canny Edge Detection</h1>
    <MediaInput @image-uploaded="handleImageUploaded" />
    <div class="input-row">
      <NumberInput
        title="Threshold 1"
        :modelValue="threshold1"
        :min="1"
        :max="20000"
        @update:modelValue="handleNumberInputChange('Threshold 1', $event)"
      />
      <NumberInput
        title="Threshold 2"
        :min="1"
        :max="20000"
        :modelValue="threshold2"
        @update:modelValue="handleNumberInputChange('Threshold 2', $event)"
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
import { ref, watch, computed } from "vue";
import MediaInput from "@/components/MediaInput.vue";
import ImageGrid from "@/components/ImageGrid.vue";
import NumberInput from "@/components/NumberInput.vue";
import { cannyEdge } from "@/cv_methods/cannyEdgeDetection";
import { convertImageToMat, convertMatToImage } from "@/cv_methods/bridge";
import { Mat } from "opencv-ts";
import { useStore } from "vuex";
const store = useStore();

const uploadedImage = ref<HTMLImageElement | null>(null);
const outputImage = ref<HTMLImageElement | null>(null);
const images = ref<(HTMLImageElement | null)[]>([]);
const threshold1 = ref<number | undefined>(50);
const threshold2 = ref<number | undefined>(100);
const isFixedWidth = computed(() => store.state.isFixedWidth);
const fixedWidth = computed(() => store.state.fixedWidth);

// Function to handle image resizing
const handle = () => {
  if (uploadedImage.value === null) {
    return;
  }
  let mat = convertImageToMat(uploadedImage.value);
  mat = cannyEdge(
    mat as Mat,
    threshold1.value as number,
    threshold2.value as number
  );
  const outputImageElement = convertMatToImage(mat);

  outputImage.value = outputImageElement;
  if (outputImage.value === null) {
    return;
  }
  setImageGrid();
};

const setImageGrid = () => {
  if (store.state.showInputImage) {
    images.value = [uploadedImage.value, outputImage.value];
  } else {
    images.value = [outputImage.value];
  }
};

watch(
  () => store.state.showInputImage,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      setImageGrid();
    }
  }
);

const handleNumberInputChange = (title: string, value: number) => {
  if (title === "Threshold 1") {
    threshold1.value = value;
  } else if (title === "Threshold 2") {
    threshold2.value = value;
  }
  handle();
};

// Handle the custom event when the image is uploaded
const handleImageUploaded = (imgElement: HTMLImageElement) => {
  console.log("image uploaded: ", imgElement);
  uploadedImage.value = imgElement;
  handle();
};
</script>

<style lang="scss">
@import "@/assets/styles/pallet.scss";

body {
  margin: 0;
}

.input-row {
  display: flex;
}
</style>
