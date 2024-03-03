<script>
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "App",
  components: {
    TopBar,
    SideBar,
  },
  mounted() {
    const debounce = (callback, delay) => {
      let tid;
      return function (...args) {
        const ctx = this;
        tid && clearTimeout(tid);
        tid = setTimeout(() => {
          callback.apply(ctx, args);
        }, delay);
      };
    };

    const _ = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends _ {
      constructor(callback) {
        callback = debounce(callback, 20);
        super(callback);
      }
    };
  },
};
</script>

<template>
  <v-app>
    <side-bar />
    <top-bar />
    <v-main>
      <div class="outer">
        <div class="p-2">
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap");

body {
  font-family: "JetBrains Mono", monospace;
}
.outer {
  background: linear-gradient(
    180deg,
    rgba(211, 211, 211, 0.3528) 0%,
    rgba(236, 15, 127, 0) 100%
  );
}
</style>
