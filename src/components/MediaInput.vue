<template>
  <div>
    <ImageInputFile @image-uploaded="handleImageUploaded" />
    <!--<ImageInputURL @image-uploaded="handleImageUploaded" />-->
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import ImageInputFile from "@/components/ImageInputFile.vue";
import ImageInputURL from "@/components/ImageInputURL.vue";
const emits = defineEmits(["image-uploaded"]);
const handleImageUploaded = (imgElement: HTMLImageElement) => {
  // relay the event to the parent component
  emits("image-uploaded", imgElement as HTMLImageElement);
};
</script>
