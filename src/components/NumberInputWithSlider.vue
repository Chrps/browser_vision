<template>
  <div class="number-input">
    <div>
      <label>{{ props.title }}</label>
    </div>
    <div>
      <div>
        <input
          :value="localValue"
          @input="updateValue"
          type="number"
          :min="min"
          :max="max"
          class="custom-input"
        />
      </div>
      <div>
        <input
          v-model="localValue"
          type="range"
          :min="min"
          :max="max"
          @input="updateValue"
          class="custom-slider"
        />
      </div>
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
const localValue = ref(props.modelValue || 0);

const updateValue = () => {
  const numericValue = parseInt(localValue.value, 10);
  if (
    (props.min !== undefined && numericValue < props.min) ||
    (props.max !== undefined && numericValue > props.max)
  ) {
    return;
  }
  emit("update:modelValue", numericValue);
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

.custom-input,
.custom-slider {
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

.custom-slider {
  margin-top: 5px;
}

.custom-input:hover,
.custom-slider:hover {
  background: var(--light-secondary);
}
</style>
