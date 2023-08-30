import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "cron",
    redirect: "/task",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "../layout/index.vue"),
    children: [
      {
        path: "/task",
        name: "task",
        component: () =>
          import(/* webpackChunkName: "vm" */ "../views/task.vue"),
      },
      {
        path: "/create",
        name: "create",
        component: () =>
          import(/* webpackChunkName: "vm" */ "../views/create.vue"),
      },
      {
        path: "/update/:id?/:method?",
        name: "update",
        component: () =>
          import(/* webpackChunkName: "vm" */ "../views/create.vue"),
      },
      {
        path: "/log/:id?",
        name: "Log",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/log.vue"),
      },
      {
        path: "/appList",
        name: "appList",
        component: () =>
          import(/* webpackChunkName: "vm" */ "../views/apply.vue"),
      },
      {
        path: "/system",
        name: "System",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/system.vue"),
      },
      {
        path: "/codeEdit/:id?/:method?",
        name: "codeEdit",
        component: () =>
          import(/* webpackChunkName: "vm" */ "../views/codeEdit.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
