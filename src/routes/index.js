import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const AccessLog = lazy(() => import('../pages/AccessLog'))
const Forms = lazy(() => import('../pages/AddUser'))
const Cards = lazy(() => import('../pages/Cards'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Users = lazy(() => import('../pages/Users'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/access-log', // the url
    component: AccessLog, // view rendered
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/add-user',
    component: Forms,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
