import {createRouter, createWebHistory} from 'vue-router'
import Home from "../features/home/Home";
import Users from "@/features/users/Users";
import Venues from "@/features/venues/Venues";
import Checkins from "@/features/checkins/Checkins";

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
        component: Users,
    },
    {
        path: '/venues',
        component: Venues,
    },
    {
        path: '/checkins',
        component: Checkins,
        name: 'Checkins', // This route is named so it can be navigated to with query params
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
