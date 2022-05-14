import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as VueAos from "vue-aos";

import "animate.css";
import "@/themes/style.scss";
import "@/themes/responsive.scss";
import "./fonts/fontsheet.css";

Vue.use(VueAos);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
