<!-- components/PointInput.vue -->
<template>
  <div class="point-input">
    <label>{{ title }}</label>
    <div class="input-container">
      <input
        :value="xValue"
        @input="updateXValue"
        type="number"
        class="custom-input"
      />
      <input
        :value="yValue"
        @input="updateYValue"
        type="number"
        class="custom-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  xValue: Number,
  yValue: Number,
  title: String,
});

const emit = defineEmits(["update:xValue", "update:yValue"]);

const updateXValue = (event: Event) => {
  updateValue(event, props.xValue as number, "update:xValue");
};

const updateYValue = (event: Event) => {
  updateValue(event, props.yValue as number, "update:yValue");
};

const updateValue = (
  event: Event,
  value: number,
  emitEvent: "update:xValue" | "update:yValue"
) => {
  if (event.target === null) return;
  if (!(event.target instanceof HTMLInputElement)) return;
  const newVal = parseInt(event.target.value, 10);
  if (isNaN(newVal)) return;
  value = newVal;
  emit(emitEvent, value);
};
</script>

<style lang="scss">
.point-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1em;
  font-weight: bold;

  .input-container {
    display: flex;
    margin: 5px;
    width: 50%;

    .custom-input {
      flex: 1;
      font-size: 1em;
      color: var(--text-color);
      text-align: center;
      border: none;
      background-color: var(--dark-secondary);

      &:hover {
        background: var(--light-secondary);
      }
    }

    .custom-input:last-child {
      margin-right: 0; // Remove right margin for the last input field
    }
  }
}
</style>
