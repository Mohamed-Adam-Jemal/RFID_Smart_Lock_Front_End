/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/access-log', // the url
    icon: 'ModalsIcon', // the component being exported from icons/index.js
    name: 'Access Log', // name that appear in Sidebar
  },
  {
    path: '/app/users',
    icon: 'TablesIcon',
    name: 'Users',
  },
  {
    path: '/app/add-user',
    icon: 'FormsIcon',
    name: 'Add User',
  },
]

export default routes
