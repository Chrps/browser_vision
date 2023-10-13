<template>
  <div id="app" class="app-container">
    <Sidebar></Sidebar>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Sidebar from "@/components/SideBar.vue";

export default defineComponent({
  components: {
    Sidebar,
  },
});
</script>

<style scoped>
.app-container {
  display: flex;
  align-items: flex-start; /* Adjust vertical alignment as needed */
}

.main-content {
  flex: 1; /* Take up remaining available space */
  padding: 20px; /* Add padding to the content area */
}
</style>
