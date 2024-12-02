import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const AccessLog = lazy(() => import('../pages/AccessLog'))
const AddUser = lazy(() => import('../pages/AddUser'))
const Users = lazy(() => import('../pages/Users'))
const Page404 = lazy(() => import('../pages/404'))

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
    component: AddUser,
  },
  {
    path: '/404',
    component: Page404,
  },
]

export default routes
