import { onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: "/inscription", component: () => import("../components/Register.vue"), meta: { requiresAuth: false } },
        { path: "/login", component: () => import("../components/LoginComponent.vue"), meta: { requiresAuth: false } },
        { path: "/livechat", component: () => import("../components/LiveChat.vue"), meta: { requiresAuth: true } }
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user)=>{
                removeListener();
                resolve(user);
            },
            reject
        )
    });
};

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = await getCurrentUser();

    if (requiresAuth && !currentUser) {
        alert("Vous n'avez pas accès !");
        next("/login");
    } else if (!requiresAuth && currentUser) {
        console.log("here");
        next("/livechat"); 
    } else {
        next();
    }
});

export default router;
