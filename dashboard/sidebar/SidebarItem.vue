<script setup>
import { useRoute } from "vue-router";
import { sidebarOpen } from "../store";

defineProps({
  to: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
const route = useRoute();
</script>

<template>
  <li>
    <router-link :to="to">
      <!-- Dito pag selected yung menu -->
      <span
        class="my-2 flex w-full items-center text-blue-50 justify-start p-4 font-thin uppercase transition-colors duration-200 lg:hover:text-blue-500"
        :class="
          route.path === to &&
          'bg-gradient-to-r border-r-4 border-blue-500 from-blue-800 to-blue-100'
        "
      >
        <span>
          <slot />
        </span>
        <span
          class="mx-4 text-sm font-normal whitespace-pre"
          v-show="sidebarOpen"
        >
          {{ title }}
        </span>
      </span>
    </router-link>
  </li>
</template>
