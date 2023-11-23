<template>
  <div class="sidebar">
    <button class="sidebar-button" @click="navigateTo('/')">Home</button>
    <button class="sidebar-button" @click="navigateTo('/image_convert')">
      Image<br />Convert
    </button>
    <button class="sidebar-button" @click="navigateTo('/image_resize')">
      Image<br />Resize
    </button>
    <button class="sidebar-button" @click="navigateTo('/image_blur')">
      Image<br />Blur
    </button>
    <button class="sidebar-button" @click="navigateTo('/canny_edge_detection')">
      Canny<br />Edge<br />Detection
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
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
  width: 100px;
  background-color: var(--dark-secondary);
  align-items: center;
  margin: 0;
}

.sidebar-button {
  width: 100px;
  height: 100px;
  padding-bottom: 100px;
  background-color: var(--dark-secondary);
  color: var(--text-color);
  border: none;
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
</style>
