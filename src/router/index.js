import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome.vue'
import BoardList from '@/views/board/BoardList.vue'
import BoardDetail from '@/views/board/BoardDetail.vue'
import BoardWrite from '@/views/board/BoardWrite.vue'
import MainList from '@/views/main/MainList.vue'
import MainDetail from '@/views/main/MainDetail.vue'
import MainWrite from '@/views/main/MainWrite.vue'
import PageLogin from "@/views/common/PageLogin.vue"
import FileUp from "@/views/file/FileUp.vue"

const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/login',
    name: 'PageLogin',
    component: PageLogin  //로그인 컴포넌트 추가
  },
  {
    path: '/test',
    name: 'FileUp',
    component: FileUp  //로그인 컴포넌트 추가
  },
  {
    path: '/signin',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/PageAbout.vue')
  },
  {
    path: '/board/detail',
    name: 'BoardDetail',
    component: BoardDetail
  },
  {
    path: '/board/write',
    name: 'BoardWrite',
    component: BoardWrite
  },
  {
    path: '/board/list',
    name: 'BoardList',
    component: BoardList
  },
  {
    path: '/main/detail',
    name: 'MainDetail',
    component: MainDetail
  },
  {
    path: '/main/write',
    name: 'MainWrite',
    component: MainWrite
  },
  {
    path: '/main/list',
    name: 'MainList',
    component: MainList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router