<template>
  <div>
    <input
      type="text"
      v-model="imageUrl"
      placeholder="Enter Image URL"
      @input="handleImageUrlChange"
    />
    <div class="image-container">
      <img @load="handleImgSrcChange" id="srcImage" style="display: none" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { ref } from "vue";

const emits = defineEmits(["image-uploaded"]);

const imageUrl = ref<string>("");

const handleImageUrlChange = (): void => {
  // Use the provided CORS proxy
  const proxyUrl = "https://crossorigin.me/";
  const fullImageUrl = proxyUrl + imageUrl.value;

  // Fetch the image using the proxy
  fetch(fullImageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Convert the image data to base64
        const dataUrl = reader.result as string;
        imageUrl.value = dataUrl;
      };
      reader.readAsDataURL(blob);
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
      // Handle error if needed
    });
};
</script>
