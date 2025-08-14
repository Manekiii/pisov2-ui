<script setup>
import { sidebarOpen } from "../store";
import SidebarItems from "./SidebarItems.vue";
import SidebarHeader from "./SidebarHeader.vue";

defineProps({
  mobileOrientation: {
    type: String,
    default: "end",
  },
});

const style = {
  mobileOrientation: {
    start: "left-0",
    end: "right-0 lg:left-0",
  },
};
</script>

<template>
  <!-- <aside
    class="scrollbar top-0 h-screen overflow-y-auto bg-blue-950 lg:relative"
    :class="[
      style.mobileOrientation[mobileOrientation],
      sidebarOpen
        ? 'absolute z-40 w-8/12 sm:w-5/12 lg:hidden'
        : 'hidden lg:z-auto lg:block lg:w-64',
    ]"
  >
    <div class="pb-32 lg:pb-6">
      <SidebarHeader />
      <SidebarItems />
    </div>
  </aside> -->
  <aside
    class="scrollbar top-0 h-screen overflow-auto bg-gray-900 text-white lg:relative lg:z-40 lg:block"
    :class="[
      style.mobileOrientation[mobileOrientation],
      sidebarOpen
        ? 'absolute z-40 w-8/12 sm:w-5/12 md:w-64 transition-all duration-500 ease-in'
        : 'hidden transition-all duration-700 ease-out lg:z-auto lg:block lg:w-24',
    ]"
  >
    <div class="pb-32 lg:pb-12">
      <SidebarHeader />
      <SidebarItems />
    </div>
  </aside>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 0;
  background: transparent; /* hide sidebar scrollbar on Chrome, Opera and other webkit Browsers*/
}
.scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none; /* hide sidebar scrollbar on Firefox, IE and Edge*/
}
</style>
