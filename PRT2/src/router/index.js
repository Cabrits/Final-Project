import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: "/", component: () => import("../views/HomePage.vue")},
        { path: "/user", component: () => import("../views/UserPage.vue")},
        { path: '/:pathMatch(.*)*', component: () => import("../views/PageNotFound.vue") },
    ]
})
export default router;
/*

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: "/", component: () => import("../views/Home.vue")},
        { path: "/Register", component: () => import("../views/Register.vue")},
        { path: "/SignIn", component: () => import("../views/SignIn.vue")},
        { path: "/item", component: () => import("../views/item.vue")},
    ]
})
export default router;

*/