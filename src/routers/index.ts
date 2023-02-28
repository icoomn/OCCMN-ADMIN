import { createRouter, createWebHistory  } from 'vue-router'
import Home from '../pages/home/home.vue'
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login/login.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/',
                redirect: { path: '/dashboard' }
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('../pages/dashboard/dashboard.vue')
            },
			{
                path: '/role/list',
                name: 'roleList',
                component: () => import('../pages/role/list.vue')
            },
			{
                path: '/permission/list',
                name: 'permissionList',
                component: () => import('../pages/permission/list.vue')
            },
            {
                path: '/account/list',
                name: 'accountList',
                component: () => import('../pages/account/list.vue')
            },
            {
                path: '/article/list',
                name: 'articleList',
                component: () => import('../pages/article/list.vue')
            },
            {
                path: '/article/comment',
                name: 'articleComment',
                component: () => import('../pages/article/comment.vue')
            },
            {
                path: '/article/add',
                name: 'articleAdd',
                component: () => import('../pages/article/add.vue')
            },
            {
                path: '/product/list',
                name: 'productList',
                component: () => import('../pages/product/list.vue')
            },
            {
                path: '/category/list',
                name: 'categoryList',
                component: () => import('../pages/category/list.vue')
            },
			{
                path: '/reward/list',
                name: 'rewardList',
                component: () => import('../pages/reward/list.vue')
            },
            {
                path: '/404',
                name: 'none',
                component: () => import('../pages/none/none.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)',
        redirect: { path: '/404' }
    }
]
export default createRouter({
    history: createWebHistory(),
    routes
})