<template>
  <div>
    <ImageInputFile @image-uploaded="handleImageUploaded" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import ImageInputFile from "@/components/ImageInputFile.vue";
const emits = defineEmits(["image-uploaded"]);
const handleImageUploaded = (imgElement: HTMLImageElement) => {
  emits("image-uploaded", imgElement as HTMLImageElement);
};
</script>
