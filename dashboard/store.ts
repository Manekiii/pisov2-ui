import { ref } from "vue";

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const showSwitchSiteModal = ref(false);

export { sidebarOpen, toggleSidebar, closeSidebar, showSwitchSiteModal };
