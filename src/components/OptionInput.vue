<template>
  <div class="option-selector">
    <div>
      <label>{{ props.title }}</label>
    </div>
    <div>
      <select @change="emitSelectedOption" class="custom-select">
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  title: String,
  options: Array,
});
const emit = defineEmits(["selectedOption"]); // Update the event name here

const emitSelectedOption = (event: Event) => {
  const selectedOption = (event.target as HTMLSelectElement).value;
  emit("selectedOption", selectedOption); // Emit the selectedOption event
};
</script>

<style lang="scss">
.option-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1em;
  font-weight: bold;

  select.custom-select {
    margin: 5px;
    flex: 1;
    font-size: 1em;
    color: var(--text-color);
    background-color: var(--dark-secondary);
    border: none;

    &:hover {
      background: var(--light-secondary);
    }
  }
}
</style>
