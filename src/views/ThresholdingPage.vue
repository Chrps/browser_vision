<!-- views/ImageConvertPage.vue -->
<template>
  <div>
    <h1 style="text-align: center">Thresholding</h1>
    <MediaInput @image-uploaded="handleImageUploaded" />
    <div class="input-row">
      <OptionInput
        title="Thresholding Type"
        :options="selectOptions"
        @selectedOption="handleOptionSelected"
      />
      <NumberInputWithSlider
        title="Threshold"
        :modelValue="threshold"
        :min="10"
        :max="255"
        @update:modelValue="handleSizeChange('Threshold', $event)"
      />
      <NumberInputWithSlider
        v-if="showMaxValueInput"
        title="Max Value"
        :min="0"
        :max="255"
        :modelValue="max_val"
        @update:modelValue="handleSizeChange('Max Value', $event)"
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
import OptionInput from "@/components/OptionInput.vue";
import NumberInputWithSlider from "@/components/NumberInputWithSlider.vue";
import { thresholding } from "@/cv_methods/thresholding";
import {
  getThresholdingTypeFromLabel,
  getThresholdingTypeLabels,
} from "@/cv_methods/thresholdingType";
import { convertImageToMat, convertMatToImage } from "@/cv_methods/bridge";
import { useStore } from "vuex";
const store = useStore();

const uploadedImage = ref<HTMLImageElement | null>(null);
const outputImage = ref<HTMLImageElement | null>(null);
const images = ref<(HTMLImageElement | null)[]>([]);
const selectedThesholdingType = ref<number | null>(0);
const threshold = ref<number | undefined>(170);
const max_val = ref<number | undefined>(200);
const isFixedWidth = computed(() => store.state.isFixedWidth);
const fixedWidth = computed(() => store.state.fixedWidth);

selectedThesholdingType.value = 0; // Hack
const selectOptions = getThresholdingTypeLabels();

// Function to handle image resizing
const handle = () => {
  if (uploadedImage.value === null) {
    return;
  }
  let mat = convertImageToMat(uploadedImage.value);
  mat = thresholding(
    mat,
    threshold.value as number,
    max_val.value as number,
    selectedThesholdingType.value as number
  );
  const outputImageElement = convertMatToImage(mat);
  mat.delete();
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

const handleOptionSelected = (selectedLabel: string) => {
  const selectedOption = getThresholdingTypeFromLabel(selectedLabel);
  if (selectedOption) {
    selectedThesholdingType.value = selectedOption;
    handle();
  }
};

const handleSizeChange = (title: string, value: number) => {
  if (title === "Threshold") {
    threshold.value = value;
  } else if (title === "Max Value") {
    max_val.value = value;
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

const showMaxValueInput = computed(() => {
  return (
    selectedThesholdingType.value === getThresholdingTypeFromLabel("Binary") ||
    selectedThesholdingType.value ===
      getThresholdingTypeFromLabel("Binary Inverted")
  );
});
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
