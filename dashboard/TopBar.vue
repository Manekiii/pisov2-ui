<script setup>
import { toggleSidebar, showSwitchSiteModal } from "./store";

const userInfo = reactive({});
Object.assign(userInfo, JSON.parse(localStorage.getItem("_214")));

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};
</script>

<template>
  <header
    class="relative z-10 h-16 py-9 w-full items-center bg-blue-950 shadow md:h-20 lg:rounded-br-2xl"
  >
    <div class="relative mx-auto flex h-full flex-col justify-center px-3">
      <div class="relative flex w-full justify-between items-center pl-1 sm:ml-0 sm:pr-2">
        <div class="relative left-0 flex h-full w-3/4">
          <div class="group relative flex h-full w-12 items-center">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Toggle sidenav"
              class="text-4xl text-white focus:outline-none"
              @click="toggleSidebar"
            >
              &#8801;
            </button>
          </div>
          <!-- <div class="group relative flex h-full w-36 items-center lg:w-64">
            <div
              class="absolute flex h-10 w-auto cursor-pointer items-center justify-center p-3 pr-2 text-sm uppercase text-gray-500 sm:hidden"
            >
            
              <svg
                fill="none"
                class="relative h-5 w-5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <svg
              class="pointer-events-none absolute left-0 ml-4 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
              />
            </svg>
            <input
              type="text"
              class="block w-full rounded-2xl bg-gray-100 py-1.5 pl-10 pr-4 leading-normal text-gray-400 opacity-90 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
            />
            <div
              class="absolute right-0 mr-2 hidden h-auto rounded-2xl border border-gray-300 px-2 py-1 text-xs text-gray-400 md:block"
            >
              +
            </div>
          </div> -->
        </div>
        <div class="relative ml-3">
          <button
            type="button"
            class="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button-2"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-2"
            @click="toggleDropdown"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-10 h-10 rounded-full"
              src="../assets/images/person-png.jpg"
              alt="user photo"
            />
          </button>
          <!-- Dropdown menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded shadow z-50"
            @click.away="closeDropdown"
          >
            <div class="px-4 py-3" role="none" style="cursor: auto">
              <!-- Replace the placeholder text with actual dropdown content -->
              <p class="text-sm text-gray-900 mb-2" role="none">
                {{ userInfo.fullname }}
              </p>
              <p class="text-sm font-medium text-gray-900 truncate" role="none">
                {{ userInfo.email }}
              </p>
            </div>
            <ul class="py-1" role="none">
              <li>
                <button
                  class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dropdown-item"
                  role="menuitem"
                  style="cursor: pointer"
                  @click="showSwitchSiteModal = true"
                  >Switch Site</button
                >
              </li>
              <li>
                <button
                  class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dropdown-item"
                  role="menuitem"
                  style="cursor: pointer"
                  @click="$router.push('/')"
                  >Sign out</button
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!--   

  <div
          class="absolute min-w-[160px] z- bg-[#f9f9f9]"
        >
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div> -->
</template>
