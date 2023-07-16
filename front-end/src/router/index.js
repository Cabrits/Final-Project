// Purpose: Handle routing for the application.
import { createRouter, createWebHistory } from "vue-router";

// Create a new router instance.
const router = createRouter({
    // Use HTML5 history mode for cleaner URLs.
    history: createWebHistory(),

    // Define routes.
    routes:[
        { path: "/", component: () => import("../views/HomePage.vue")},  
        { path: "/user", component: () => import("../views/UserPage.vue")},
        { path: "/item/undefined", component: () => import("../views/ProductNotFound.vue")},
        { path: "/item/:id", component: () => import("../views/ItemPage.vue")},
        { path: "/checkout", component: () => import("../views/Checkout.vue")},
        { path: "/aboutus", component: () => import("../views/AboutUs.vue")},
        { path: "/:pathMatch(.*)*", component: () => import("../views/PageNotFound.vue") },
    ]
})
export default router;
