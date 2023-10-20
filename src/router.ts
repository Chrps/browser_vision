import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/HomePage.vue"),
  },
  {
    path: "/image",
    name: "Image",
    component: () => import("./views/ImagePage.vue"),
  },
  {
    path: "/image_convert",
    name: "ImageConvert",
    component: () => import("./views/ImageConvertPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
