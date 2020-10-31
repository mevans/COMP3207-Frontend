import {createRouter, createWebHistory} from 'vue-router'
import Users from "@/features/users/Users";
import Venues from "@/features/venues/Venues";
import Checkins from "@/features/checkins/Checkins";
import Reports from "@/features/reports/Reports";

const routes = [
    {
        path: '/',
        redirect: '/users',
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
    {
        path: '/reports',
        component: Reports,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
