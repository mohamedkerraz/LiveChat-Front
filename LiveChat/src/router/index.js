import { onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path: "/inscription", component: () => import("../components/Register.vue")},

        {path: "/login", component: () => import("../components/LoginComponent.vue")},
        {
            path: "/livechat", 
            component: () => import("../components/LiveChat.vue"),
            meta: {
                requiresAuth: true,
            },
        },
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
    if(to.matched.some((record) => record.meta.requiresAuth)){
        if(await getCurrentUser()){
            next();
        }else{
            alert("you dont have access !");
            next("/login");
        }
    }else{
        next();
    }
});

export default router;