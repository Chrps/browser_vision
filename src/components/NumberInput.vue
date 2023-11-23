<template>
  <div class="number-input">
    <div>
      <label>{{ props.title }}</label>
    </div>
    <div>
      <input
        :value="modelValue"
        @input="updateValue"
        type="number"
        :min="min"
        :max="max"
        class="custom-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: Number,
  title: String,
  min: Number,
  max: Number,
});
const emit = defineEmits(["update:modelValue"]);
const inputValue = ref(props.modelValue || 0);

const updateValue = (event: Event) => {
  if (event.target === null) return;
  if (!(event.target instanceof HTMLInputElement)) return;
  const newVal = parseInt(event.target.value, 10);
  if (isNaN(newVal)) return;
  if (
    (props.min !== undefined && newVal < props.min) ||
    (props.max !== undefined && newVal > props.max)
  )
    return;
  inputValue.value = newVal;
  emit("update:modelValue", inputValue.value);
};
</script>

<style lang="scss">
@import "@/assets/styles/pallet.scss";

.number-input {
  flex: 1;
  margin: 5px;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  color: var(--text-color);
}

.custom-input {
  flex: 1;
  width: 30%;
  color: var(--text-color);
  font-size: 1em;
  text-align: center;
  border: none;
  background-color: var(--dark-secondary);

  &:hover {
    background: var(--light-secondary);
  }
}

.custom-input:hover {
  background: var(--light-secondary);
}
</style>
