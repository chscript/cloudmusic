import { createRouter, createWebHashHistory } from 'vue-router';

const mineView = () => import('../views/mine.vue');
const followView = () => import('../views/follow.vue');
const homeView = () => import('../views/home.vue');
const detailView = () => import('../views/detail.vue');
const searchView = () => import('../views/search.vue');

const routes = [
    {
        path: '/',
        name: 'home',
        component: homeView,
    },
    {
        path: '/detail',
        name: 'detail',
        component: detailView,
    },
    {
        path: '/mine',
        name: 'mine',
        component: mineView,
    },
    {
        path: '/follow',
        name: 'follow',
        component: followView,
    },
    {
        path: '/search',
        name: 'search',
        component: searchView,
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;