<template>
  <div class="sidebar">
    <button class="sidebar-button" @click="navigateTo('/')">Home</button>
    <button class="sidebar-button" @click="navigateTo('/image')">Image</button>
    <button class="sidebar-button" @click="navigateTo('/image_convert')">
      Image Convert
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

<style scoped>
.sidebar {
  position: fixed; /* Set the position to fixed */
  top: 0; /* Lock it to the top of the viewport */
  left: 0; /* Lock it to the left side */
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100px;
  background-color: #262c27;
  align-items: center;
  margin: 0; /* Remove the margin around the sidebar */
}

.sidebar-button {
  width: 100px;
  height: 100px;
  padding-bottom: 100px; /* Maintain a 1:1 aspect ratio (height = width) */
  background-color: #e8f5e9;
  color: #4caf50;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  align-items: center;
  font-weight: bold;
  text-align: center;
  font-size: 1.5em;
  padding: 0;
}

.sidebar-button:hover {
  background-color: #c8e6c9;
}
</style>
