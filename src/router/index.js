import pageHome from "@/pages/pageHome.vue";
import ThreadPageShow from "@/pages/ThreadPageShow";
import CreateNewThread from "@/pages/CreateNewThread";
import ThreadEdit from "@/pages/ThreadEdit";
import NotFound from "@/pages/NotFound.vue";
import ForumPage from "@/pages/ForumPage";
import categoryPage from "@/pages/CategoryPage";
import ProfilePage from "@/pages/ProfilePage";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: pageHome,
    name: "Home",
  },
  {
    path: "/profile",
    component: ProfilePage,
    name: "Profile",
    meta: { toTop: true, smoothScroll: true }
  },
  {
    path: "/profile/edit",
    component: ProfilePage,
    name: "ProfileEdit",
    props: { edit: true },
  },
  {
    path: "/thread/:id",
    component: ThreadPageShow,
    name: "thread",
    props: true,
  },
  {
    path: "/forum/:forumId/thread/create",
    component: CreateNewThread,
    name: "CreateNewThread",
    props: true,
  },
  {
    path: "/thread/:id/edit",
    component: ThreadEdit,
    name: "ThreadEdit",
    props: true,
  },
  {
    path: "/category/:id",
    component: categoryPage,
    name: "category",
    props: true,
  },
  {
    path: "/forum/:id",
    component: ForumPage,
    name: "forum",
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = 'smooth';
    return scroll;
  }
});
