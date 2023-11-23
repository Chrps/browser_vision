<template>
  <select @change="handleSelection($event.target.value)">
    <option
      v-for="option in props.options"
      :key="option.value"
      :value="option.label"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["options"]);

const emit = defineEmits(["item-selected"]);

const handleSelection = (selectedLabel: string) => {
  const selectedOption = props.options.find(
    (option) => option.label === selectedLabel
  );
  if (selectedOption) {
    emit("item-selected", selectedOption.value);
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/pallet.scss";

.selector {
  padding: 20px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  color: var(--text-color);
}

.custom-option {
  color: var(--text-color);
  font-size: 1.5em;
  text-align: center;
  background-color: var(--dark-secondary);
  border: none;
}

.custom-option:hover {
  background: var(--light-secondary);
}
</style>
