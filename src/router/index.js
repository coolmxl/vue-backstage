import Vue from 'vue'
import VueRouter from'vue-router'
import Login from '../components/Login'
import Regintser from '../components/Regintser'
import UserList from '@/pages/adminList'
import RootList from '@/pages/rootList'
import CarList from '@/pages/carList'
import AddCar from '@/pages/addCar'
import RootSet from '@/pages/rootSet'
import Manage from '@/pages/Manage'
import Explain from '@/pages/explain'


import Home from '../pages/home/Home'
// const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');





Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {path:'/login',component:Login},
        {path:'/regintser',component:Regintser},
        {path:'/home',component:Home,
            children: [
                {
                path: 'userlist',
                component: UserList,
                meta: ['数据管理', '用户列表'],
                },
                {
                path: 'carlist',
                component: CarList,
                meta: ['数据管理', '用户列表'],
                },
                {
                    path: 'addcar',
                    component: AddCar,
                    meta: ['添加数据', '添加用户'],
                },
                {
                    path: 'rootlist',
                    component: RootList,
                    meta: ['数据管理', '管理员列表'],
                },
                {
                    path: 'rootset',
                    component: RootSet,
                    meta: ['设置', '管理员设置'],
                },
                {
                    path: 'manage',
                    component: Manage,
                    meta: ['首页'],
                },
                {
                    path: 'explain',
                    component: Explain,
                    meta: ['说明','说明'],
                }
            ]
        },
        {path:'/',redirect:'/Login'}
    ]
})