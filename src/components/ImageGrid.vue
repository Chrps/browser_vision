<template>
  <div class="image-grid">
    <div v-for="(row, index) in imageRows" :key="index">
      <div class="image-row">
        <div
          v-for="image in row"
          :key="image.name"
          class="image-item"
          :style="{
            margin: `0 ${margin}px`,
            width: fixedWidth ? fixedWidth + 'px' : 'auto',
          }"
        >
          <img
            :src="image.src"
            :alt="image.name"
            :style="{ margin: margin + 'px', width: '100%' }"
          />
          <p>{{ image.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

// Define the props without destructuring
const props = defineProps({
  images: Array,
  margin: Number,
  rows: Number,
  fixedWidth: Number, // Add a prop for fixed width
});

const imageRows = computed(() => {
  const rowsCount = Math.max(1, props.rows as number);
  const result: Array<Array<{ name: string; src: string }>> = new Array(
    rowsCount
  )
    .fill(null)
    .map(() => []);

  if (props.images === undefined) {
    return result; // Return the initialized result array
  }

  // Cast props.images to an array of a specific type (e.g., assuming each image has a 'name' property)
  const castedImages = props.images as { name: string; src: string }[];

  castedImages.forEach((image, index) => {
    const rowIndex = index % rowsCount;
    result[rowIndex].push(image);
  });

  return result;
});
</script>

<style scoped>
.image-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-row {
  display: flex;
  justify-content: center;
}

.image-item {
  text-align: center;
  margin: 0;
  box-sizing: border-box;
}

.image-item img {
  max-width: 100%;
  height: auto;
}
</style>
