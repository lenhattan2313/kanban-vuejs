import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/boards',
  },
  {
    path: '/boards',
    name: 'boards',
    component: () => import('@/views/boards/BoardsView.vue'),
    meta: {
      title: 'Boards',
      requiresAuth: false,
    },
  },
  {
    path: '/board/:id',
    name: 'board',
    component: () => import('@/views/boards/KanbanBoard.vue'),
    props: true,
    meta: {
      title: 'Kanban Board',
      requiresAuth: false,
    },
  },
  {
    path: '/members',
    name: 'members',
    component: () => import('@/views/members/MembersView.vue'),
    meta: {
      title: 'Members',
      requiresAuth: false,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/settings/SettingsView.vue'),
    meta: {
      title: 'Settings',
      requiresAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundView.vue'),
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
