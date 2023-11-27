<template>
  <div class="sidebar">
    <div class="button-container">
      <button class="sidebar-button" @click="navigateTo('/')">Home</button>
      <button class="sidebar-button" @click="navigateTo('/convert')">
        Image<br />Convert
      </button>
      <button class="sidebar-button" @click="navigateTo('/resize')">
        Image<br />Resize
      </button>
      <button class="sidebar-button" @click="navigateTo('/image_blur')">
        Image<br />Blur
      </button>
      <button
        class="sidebar-button"
        @click="navigateTo('/canny_edge_detection')"
      >
        Canny<br />Edge<br />Detection
      </button>
      <button class="sidebar-button" @click="navigateTo('/thresholding')">
        Thresholding
      </button>
    </div>
    <div class="settings-container">
      <label for="show-input-image" class="checkbox-label">
        Show<br />Input Image
        <input
          type="checkbox"
          id="show-input-image"
          v-model="showInputImage"
          @change="handleShowImageChange"
        />
      </label>
      <label for="fixed-width" class="checkbox-label">
        Fixed Width
        <input
          type="checkbox"
          id="fixed-width"
          v-model="isFixedWidth"
          @change="handleFixedWidthChange"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { ref, onUnmounted } from "vue";

const router = useRouter();
const navigateTo = (route: string) => {
  router.push(route);
};

const store = useStore();

let showInputImage = ref(true);
let isFixedWidth = ref(false);

store.commit("updateShowInputImage", showInputImage);
store.commit("updateIsFixedWidth", isFixedWidth);

const handleShowImageChange = (event: any) => {
  store.commit("updateShowInputImage", event.target.checked);
};
const handleFixedWidthChange = (event: any) => {
  store.commit("updateIsFixedWidth", event.target.checked);
  store.commit("updateFixedWidth", calculateFixedWidth());
};

const calculateFixedWidth = () => {
  return 0.4 * window.innerWidth;
};

const handleWindowResize = () => {
  store.commit("updateFixedWidth", calculateFixedWidth());
};

window.addEventListener("resize", handleWindowResize);

onUnmounted(() => {
  window.removeEventListener("resize", handleWindowResize);
});
</script>

<style lang="scss">
@import "@/assets/styles/pallet.scss";

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 110px;
  background-color: var(--dark-secondary);
  align-items: center;
  margin: 0;
}

.button-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Add scrollbar for overflow */
  max-height: calc(
    100vh - 110px
  ); /* Set a max height, adjusting for checkbox height and margin */
  flex: 1; /* Allow the button container to take remaining space */
}

.sidebar-button {
  width: 110px;
  height: 110px;
  padding-bottom: 100px;
  border: 1px solid var(--light-secondary);
  background-color: var(--dark-secondary);
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.3s ease;

  align-items: center;
  font-weight: bold;
  text-align: center;
  font-size: 1em;
  padding: 0;
}

.sidebar-button:hover {
  background-color: var(--light-secondary);
}

.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  margin: 10px;
}

.settings-container input {
  width: 15px;
  height: 15px;
  margin-top: 5px;
  background-color: var(--dark-secondary);
  &:checked {
    background-color: var(--light-secondary);
    border: 2px solid var(--dark-secondary);
  }
}

.checkbox-label {
  display: flex;
  flex-direction: column;
  font-size: 0.7em;
  font-weight: bold;
  align-items: center;
  text-align: center;
}
</style>
