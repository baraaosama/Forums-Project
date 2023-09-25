import { createApp } from "vue";
import App from "./App.vue";
import BaseDate from "@/components/BaseDate";
import router from "@/router";
import store from "@/store/index";

createApp(App)
  .component("BaseDate", BaseDate)
  .use(router)
  .use(store)
  .mount("#app");
