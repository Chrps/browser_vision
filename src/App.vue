<template>
  <div id="app" class="app-container">
    <Sidebar></Sidebar>
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
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
body,
html {
  background: linear-gradient(
    to bottom,
    #00c71e,
    #00c71e5b
  ); /* Soft green gradient background */
  margin: 0;
  padding: 0;
  height: 100%;
}

.app-container {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 100px;
}
</style>
