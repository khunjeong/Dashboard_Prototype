import Vue from "vue";
import App from "~/App.vue";

import "~/plugins/modal";

// services
import "~/services/api.service";

// scss
import "~/scss/reset.scss";
import "~/scss/grid.scss";
import "~/scss/scroll.scss";
import "~/scss/main.scss";
import "~/scss/card.scss";
import "~/scss/count.scss";
import "~/scss/environment-item.scss";

new Vue({
  el: "#app",
  render: (h) => h(App),
});
