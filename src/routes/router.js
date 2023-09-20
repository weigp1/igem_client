import { createRouter, createWebHistory } from "vue-router";

let routes = [
    { path: "/", component: () => import("../views/home.vue") },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router, routes }
