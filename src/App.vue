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

<style lang="scss">
@import "@/assets/styles/pallet.scss";

#app {
  //background: linear-gradient(
  //  to bottom,
  //  var(--hunter-green),
  //  var(--dark-green)
  //);
  background: var(--dark-primary);
  font-family: "Roboto", sans-serif;
  color: var(--text-color);
  height: 100vh;
  width: 100vw;
  overflow: auto;
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
