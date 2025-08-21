import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import BoardsPage from '@/views/BoardsPage.vue'
import KanbanBoard from '@/views/KanbanBoard.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/boards',
  },
  {
    path: '/boards',
    name: 'boards',
    component: BoardsPage,
    meta: {
      title: 'Boards',
      requiresAuth: false,
    },
  },
  {
    path: '/board/:id',
    name: 'board',
    component: KanbanBoard,
    props: true,
    meta: {
      title: 'Kanban Board',
      requiresAuth: false,
    },
  },
  {
    path: '/board/:id/settings',
    name: 'board-settings',
    component: () => import('@/views/BoardSettingsView.vue'),
    props: true,
    meta: {
      title: 'Board Settings',
      requiresAuth: true,
    },
  },
  {
    path: '/members',
    name: 'members',
    component: () => import('@/views/MembersPage.vue'),
    meta: {
      title: 'Members',
      requiresAuth: false,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsPage.vue'),
    meta: {
      title: 'Settings',
      requiresAuth: false,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: {
      title: 'Profile',
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Page Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue Kanban`
  }

  // Check authentication (for future implementation)
  if (to.meta.requiresAuth) {
    // TODO: Implement authentication check
    // const isAuthenticated = checkAuth()
    // if (!isAuthenticated) {
    //   next({ name: 'login' })
    //   return
    // }
  }

  next()
})

export default router
