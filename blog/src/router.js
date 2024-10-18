import { createWebHistory, createRouter } from "vue-router";
import ListCom from './components/listComponent.vue';
import DetailComponent from './components/DetailComponent.vue';
import AuthorCom from './components/AuthorCom.vue';
import CommentCom from './components/CommentCom.vue';

const routes = [
    {
        path: "/detail/:id",
        component : DetailComponent,
        children:[
            {
              path: "author",
              component: AuthorCom,
            },
            {
              path: "comment",
              component: CommentCom,
              }
        ]
    },
  {
    path: "/list",
    component: ListCom,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 