
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/sign-up',
    component: () => import('layouts/MyLayout.vue'), 
    children: [
      { path: '', component: () => import('pages/SignUp.vue') }
    ]
  },
  {
    path: '/sign-in',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SignIn.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') }
    ],
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/lists',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Lists.vue') }
    ],
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/list/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/List.vue') }
    ],
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/quiz/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Quiz.vue') }
    ],
    meta: {
      requiresAuth: true,
    }
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
