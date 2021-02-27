import Store from '/pages/store.js';
import Part from '/pages/part.js';
import About from '/pages/about.js';
const routes = [
  { path: "/", component: Store, name: 'store'},
  { path: "/about", component: About, name: 'about' },
  { path: "/part", component: Part, name: 'part' },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

const app = new Vue({
  router,
  el: "#app"
});

export default app;
