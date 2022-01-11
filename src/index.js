import MintButton from "./MintButton.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("v-mintbutton", MintButton);
}

const plugin = {
  install,
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

MintButton.install = install;

export default MintButton;
