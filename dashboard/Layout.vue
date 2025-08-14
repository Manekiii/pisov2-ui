<script setup>
import { useRoute } from "vue-router";
import { onMounted, watch } from "vue";

import TopBar from "./TopBar.vue";
import Overlay from "./Overlay.vue";
import Sidebar from "./sidebar/Sidebar.vue";
import { closeSidebar, sidebarOpen, showSwitchSiteModal } from "./store";

const route = useRoute();
const menulist = ref();

onMounted(() => {
  // set the html tag attribute overflow to hidden when component is mounted
  document.documentElement.style.overflow = "hidden";
});

watch(route, () => {
  // close sidebar on route changes when viewport is less than 1024px
  if (sidebarOpen && window.innerWidth < 1024) {
    closeSidebar();
  }
});
</script>

<!-- lg:w-[calc(100%-16rem)] class get the remained width of the main tag from lg:viewport by subtracting
(the total width by the width of the sidebar component which is w-64 = 16rem)-->
<template>
  <!-- <div class="relative h-screen overflow-hidden bg-[#F4F9FB]">
    <div class="flex items-start">
      <Overlay />
      <Sidebar mobile-orientation="end" />
      <div
        class="flex h-screen w-full flex-col pl-0 lg:space-y-4"
        :class="sidebarOpen ? 'lg:w-full' : 'lg:w-[calc(100%-16rem)]'"
      >
        <TopBar />
        <main
          class="h-screen overflow-auto px-2 pb-36 pt-8 md:pb-8 md:pt-4 lg:pt-0"
        >
          <slot />
        </main>
      </div>
    </div>
  </div> -->
  <!-- pang backup lang yung sa taas -->

  <div class="relative h-screen overflow-hidden bg-[#d8f1f0]">
    <div class="flex items-start">
      <Overlay />
      <Sidebar id="sidebar" mobile-orientation="start" />
      <div class="flex h-screen w-full flex-col pl-0 lg:space-y-4">
        <TopBar id="topbar" />
        <main class="h-screen overflow-auto lg:px-4">
          <slot />
        </main>
      </div>
      <div class="items-center">
        <SwitchSite
          v-show="showSwitchSiteModal"
          @close-modal="showSwitchSiteModal = false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  #sidebar,
  #topbar {
    display: none;
  }
}
</style>
