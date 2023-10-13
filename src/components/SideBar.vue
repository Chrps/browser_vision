<template>
  <div class="sidebar">
    <button @click="navigateTo('/')">Home</button>
    <button @click="navigateTo('/image')">Image</button>
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
  display: flex;
  flex-direction: column;
  height: 100vh; /* Fill the entire viewport height */
  width: 200px;
  background-color: #f0f0f0;
  align-items: center; /* Center content horizontally */
}

button {
  width: 100%;
  margin: 10px 0; /* Adjust vertical spacing */
}
</style>
