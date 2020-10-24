import {createRouter, createWebHistory} from 'vue-router'
import Home from "../features/home/Home";

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/users',
        component: () => import('../features/users/Users'),
        name: 'UserList',
    },
    {
        path: '/users/:id',
        component: () => import('../features/users/CreateEditUser.vue'),
        props: true,
        name: 'EditUser'
    },
    {
        path: '/users/create',
        component: () => import('../features/users/CreateEditUser.vue'),
        props: true,
    },
    {
        path: '/venues',
        component: () => import('../features/venues/Venues'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
