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
      @drop="handleDrop"
      @click="openFileDialog"
    >
      Drop an image here or click to upload.
    </div>
    <div class="image-container">
      <img @load="handleImgSrcChange" id="srcImage" style="display: none" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

const emits = defineEmits(["image-uploaded"]);

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

const handleImgSrcChange = (e: Event): void => {
  emits("image-uploaded", e.target as HTMLImageElement);
};

const openFileDialog = (): void => {
  const inputElement = document.getElementById(
    "imageInput"
  ) as HTMLInputElement;
  inputElement.click();
};

const dragEnter = (e: DragEvent): void => {
  e.preventDefault();
  // Add any visual feedback for drag enter, e.g., highlighting the drop zone.
};

const dragOver = (e: DragEvent): void => {
  e.preventDefault();
  // Add any visual feedback for drag over, e.g., changing the cursor style.
};

//const dragLeave = (e: DragEvent): void => {
// Remove any visual feedback on drag leave.
//};

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

<style lang="scss">
@import "@/assets/styles/pallet.scss";

.drop-zone {
  background: var(--dark-secondary);
  padding: 20px;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add a transition for a smoother hover effect */
  color: var(--text-color);
}

.drop-zone:hover {
  background: var(--light-secondary);
}

#imageInput {
  display: none;
}

.image-container {
  margin-top: 20px;
}
</style>
