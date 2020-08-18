import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';

Vue.use(VueRouter);

const createRoute = (path, name, layout, auth) => {
  const newRoute = {
    path,
    name,
    meta: { layout },
    component: () => import(`../views/${name}.vue`),
  };

  auth && (newRoute.meta.auth = true);

  return newRoute;
};
const routes = [
  createRoute('/', 'Home', 'main', true),
  createRoute('/categories', 'Categories', 'main', true),
  createRoute('/details', 'Detail', 'main', true),
  createRoute('/history', 'History', 'main', true),
  createRoute('/planning', 'Planning', 'main', true),
  createRoute('/profile', 'Profile', 'main', true),
  createRoute('/record', 'Record', 'main', true),
  createRoute('/detail/:id', 'Detail', 'main', true),
  createRoute('/login', 'Login', 'empty'),
  createRoute('/register', 'Register', 'empty'),

  ,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const reqAuth = to.matched.some((record) => record.meta.auth);
  if (reqAuth && !currentUser) {
    next('/login?message=login');
    return null;
  }
  next();
});

export default router;
