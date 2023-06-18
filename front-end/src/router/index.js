import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: "/", component: () => import("../views/HomePage.vue")},
        { path: "/user", component: () => import("../views/UserPage.vue")},
        { path: "/item/:id", component: () => import("../views/ItemPage.vue")},
        { path: "/checkout", component: () => import("../views/Checkout.vue")},
        { path: "/aboutus", component: () => import("../views/AboutUs.vue")},
        { path: "/:pathMatch(.*)*", component: () => import("../views/PageNotFound.vue") },
    ]
})

export default router;
