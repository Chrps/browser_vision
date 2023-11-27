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
      <div class="checkbox">
        <label for="keep-aspect-ratio" class="checkbox-label">
          Keep Aspect Ratio
          <input
            type="checkbox"
            id="keep-aspect-ratio"
            v-model="keepAspectRatio"
          />
        </label>
      </div>
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
import NumberInput from "@/components/NumberInput.vue";
import { resizeImage } from "@/cv_methods/resize";
import {
  getInterpolationFromLabel,
  getInterpolationLabels,
} from "@/cv_methods/interpolationTypes";
import { convertImageToMat, convertMatToImage } from "@/cv_methods/bridge";
import { useStore } from "vuex";
const store = useStore();

const uploadedImage = ref<HTMLImageElement | null>(null);
const outputImage = ref<HTMLImageElement | null>(null);
const images = ref<(HTMLImageElement | null)[]>([]);
const selectedInterpolation = ref<number | null>(null);
const resize_width = ref<number | undefined>(undefined);
const resize_height = ref<number | undefined>(undefined);
const isFixedWidth = computed(() => store.state.isFixedWidth);
const fixedWidth = computed(() => store.state.fixedWidth);
const keepAspectRatio = ref(false);

selectedInterpolation.value = 0; // Hack
const selectOptions = getInterpolationLabels();

// Function to handle image resizing
const handle = () => {
  if (uploadedImage.value === null) {
    return;
  }
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
  const selectedOption = getInterpolationFromLabel(selectedLabel);
  if (selectedOption) {
    selectedInterpolation.value = selectedOption;
    handle();
  }
};

const handleSizeChange = (title: string, value: number) => {
  if (title === "Width") {
    resize_width.value = value;
    if (keepAspectRatio.value && uploadedImage.value) {
      // If keep aspect ratio is enabled, calculate and update the height
      resize_height.value = Math.round(
        (value / uploadedImage.value.width) * uploadedImage.value.height
      );
    }
  } else if (title === "Height") {
    resize_height.value = value;
    if (keepAspectRatio.value && uploadedImage.value) {
      // If keep aspect ratio is enabled, calculate and update the width
      resize_width.value = Math.round(
        (value / uploadedImage.value.height) * uploadedImage.value.width
      );
    }
  }

  // Trigger the handle function to apply changes
  handle();
};

// Handle the custom event when the image is uploaded
const handleImageUploaded = (imgElement: HTMLImageElement) => {
  console.log("image uploaded: ", imgElement);
  uploadedImage.value = imgElement;
  images.value = [uploadedImage.value];
  // update Width and Height input values
  resize_width.value = uploadedImage.value.width;
  resize_height.value = uploadedImage.value.height;

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

.checkbox {
  flex-direction: column;
  align-items: center;
  bottom: 0;
  margin: 10px;
}

.checkbox input {
  width: 15px;
  height: 15px;
}

.checkbox-label {
  font-size: 1em;
  font-weight: bold;
  align-items: center;
  text-align: center;
}
</style>
