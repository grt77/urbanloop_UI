/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

const customRoutes = [
  {
    path: '/active-ride',
    name: 'active-ride',
    component: () => import('../components/MapView.vue'),  // Adjust path as necessary
    meta: { title: 'Active Ride' }
  },
  {
    path: '/driver',
    name: 'driver',
    component: () => import('../components/DriverView.vue'),  // Adjust path as necessary
    meta: { title: 'Driver view' }
  },
  {
    path: '/rider',
    name: 'rider',
    component: () => import('../components/user/RideDetails.vue'),  // Adjust path as necessary
    meta: { title: 'Rider view' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),  // Automatically generated routes
    ...customRoutes          // Your manually defined routes
  ],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
