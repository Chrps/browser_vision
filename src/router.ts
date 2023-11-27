import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/HomePage.vue"),
  },
  {
    path: "/convert",
    name: "ImageConvert",
    component: () => import("./views/ConvertPage.vue"),
  },
  {
    path: "/resize",
    name: "ImageResize",
    component: () => import("./views/ResizePage.vue"),
  },
  {
    path: "/image_blur",
    name: "ImageBlur",
    component: () => import("./views/BlurPage.vue"),
  },
  {
    path: "/canny_edge_detection",
    name: "CannyEdgeDetection",
    component: () => import("./views/CannyEdgePage.vue"),
  },
  {
    path: "/thresholding",
    name: "Thresholding",
    component: () => import("./views/ThresholdingPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
