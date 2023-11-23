import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/HomePage.vue"),
  },
  {
    path: "/image_convert",
    name: "ImageConvert",
    component: () => import("./views/ImageConvertPage.vue"),
  },
  {
    path: "/image_resize",
    name: "ImageResize",
    component: () => import("./views/ImageResizePage.vue"),
  },
  {
    path: "/image_blur",
    name: "ImageBlur",
    component: () => import("./views/ImageBlurPage.vue"),
  },
  {
    path: "/canny_edge_detection",
    name: "CannyEdgeDetection",
    component: () => import("./views/ImageCannyEdgePage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
