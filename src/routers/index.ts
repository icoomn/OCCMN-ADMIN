import { createRouter, createWebHistory  } from 'vue-router'
import Home from '../pages/home/home.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
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
    }
]
export default createRouter({
    history: createWebHistory(),
    routes
})