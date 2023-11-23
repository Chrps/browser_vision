<!-- views/ImageConvertPage.vue -->
<template>
  <div>
    <h1 style="text-align: center">Resize</h1>
    <MediaInput @image-uploaded="handleImageUploaded" />
    <div class="input-row">
      <OptionInput
        title="Interpolation"
        :options="selectOptions"
        @selectedOption="handleOptionSelected"
      />
      <NumberInput
        title="Width"
        :modelValue="resize_width"
        :min="1"
        :max="20000"
        @update:modelValue="handleSizeChange('Width', $event)"
      />
      <NumberInput
        title="Height"
        :min="1"
        :max="20000"
        :modelValue="resize_height"
        @update:modelValue="handleSizeChange('Height', $event)"
      />
      <button @click="toggleFixedWidth">Toggle Fixed Width</button>
    </div>
    <ImageGrid
      :images="images"
      :margin="10"
      :rows="1"
      :fixedWidth="isFixedWidth ? calculateFixedWidth() : 0"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MediaInput from "@/components/MediaInput.vue";
import ImageGrid from "@/components/ImageGrid.vue";
import OptionInput from "@/components/OptionInput.vue";
import NumberInput from "@/components/NumberInput.vue";
import { resizeImage } from "@/cv_methods/opencvResize";
import {
  getInterpolationFromLabel,
  getInterpolationLabels,
} from "@/cv_methods/opencvGetInterpolation";
import {
  convertImageToMat,
  convertMatToImage,
} from "@/cv_methods/opencvBridge";

const uploadedImage = ref<HTMLImageElement | null>(null);
const outputImage = ref<HTMLImageElement | null>(null);
const images = ref<(HTMLImageElement | null)[]>([]);
const selectedInterpolation = ref<number | null>(null);
const resize_width = ref<number | undefined>(undefined);
const resize_height = ref<number | undefined>(undefined);
const isFixedWidth = ref(false);

selectedInterpolation.value = 0; // Hack
const selectOptions = getInterpolationLabels();

// Function to handle image resizing
const handleImageResize = () => {
  if (uploadedImage.value === null) return;
  if (selectedInterpolation.value === null) return;
  if (resize_width.value === null) return;
  if (resize_height.value === null) return;

  let mat = convertImageToMat(uploadedImage.value);
  mat = resizeImage(
    mat,
    resize_width.value as number,
    resize_height.value as number,
    selectedInterpolation.value as number
  );
  const outputImageElement = convertMatToImage(mat);

  outputImage.value = outputImageElement;
  if (outputImage.value === null) {
    return;
  }
  images.value = [uploadedImage.value, outputImage.value];
};

const handleOptionSelected = (selectedLabel: string) => {
  console.log("option selected: ", selectedLabel);
  const selectedOption = getInterpolationFromLabel(selectedLabel);
  console.log("selected option: ", selectedOption);
  if (selectedOption) {
    console.log("selected option: ", selectedOption);
    selectedInterpolation.value = selectedOption;
    handleImageResize();
  }
};

const handleSizeChange = (title: string, value: number) => {
  console.log("size changed: ", value, "title: ", title);
  if (title === "Width") {
    resize_width.value = value;
  } else if (title === "Height") {
    resize_height.value = value;
  }
  handleImageResize();
};

// Handle the custom event when the image is uploaded
const handleImageUploaded = (imgElement: HTMLImageElement) => {
  console.log("image uploaded: ", imgElement);
  uploadedImage.value = imgElement;
  images.value = [uploadedImage.value];
  // update Width and Height input values
  resize_width.value = uploadedImage.value.width;
  resize_height.value = uploadedImage.value.height;

  handleImageResize();
};

const calculateFixedWidth = () => {
  // Calculate 40% of the area where it is displayed
  const area = window.innerWidth * window.innerHeight;
  return 0.6 * Math.sqrt(area); // Adjust the ratio or formula as needed
};

const toggleFixedWidth = () => {
  isFixedWidth.value = !isFixedWidth.value;
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
