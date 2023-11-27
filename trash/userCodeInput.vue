<template>
  <div>
    <textarea
      class="code"
      v-model="userCodeString"
      spellcheck="false"
      rows="10"
      cols="40"
    ></textarea>
    <div>
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { userCode } from "@/cv_methods/opencvBlur"; // Import the userCode function
import opencv_ts from "opencv-ts";
const emit = defineEmits(["output-updated"]);

const result = ref<string>("");
const userCodeString = ref<string>(userCode.toString());

// Get the parameter names from the userCode function's signature
const paramNames = userCode
  .toString()
  .match(/\(([^)]*)\)/)[1]
  .split(", ");

// Create an object to store the parameter values
const paramValues = ref({});
paramNames.forEach((paramName) => {
  paramValues.value[paramName] = null;
});

// Function to run the user's code
const runCode = () => {
  try {
    console.log("running user code from userCodeInput");
    if (userCodeString.value.trim()) {
      console.log("userCodeString.value", userCodeString.value);
      const paramNamesString = paramNames.join(", ");
      const userCodeFunction = new Function(
        "opencv_ts", // Add opencv_ts as a parameter
        paramNamesString,
        userCodeString.value
      );

      const params = paramValues.value; // Pass the parameters dynamically
      const dst = userCodeFunction(
        opencv_ts,
        ...paramNames.map((paramName) => params[paramName])
      );
      result.value = "Code executed successfully";
      console.log("finished running user code");
      emit("output-updated", dst);
    } else {
      result.value = "User code is empty.";
    }
  } catch (error) {
    result.value = `Error: ${error}`;
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/pallet.scss";

.code {
  padding: 20px;
  font-size: 2em;
  background: var(--dark-primary);
  border-color: var(--light-secondary);
  color: var(--text-color);
}

.code:hover {
  background: var(--light-secondary);
  color: var(--dark-primary);
}
</style>
