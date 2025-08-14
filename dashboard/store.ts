import { ref } from "vue";

const sidebarOpen = ref(true);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const openModal = ref(false);

const showSwitchSiteModal = ref(false);

const isClick = ref(false);

export { sidebarOpen, toggleSidebar, closeSidebar, showSwitchSiteModal, openModal, isClick };
