<script setup>
import { toggleSidebar, showSwitchSiteModal } from "./store";
import { getKey, encryptData } from "../utils/encrypt";

const userInfo = reactive({});
if (localStorage.getItem("_214")) {
  Object.assign(userInfo, JSON.parse(decrypt(localStorage.getItem("_214"))));
}

console.log("this is userinfo: ", userInfo);

const show = ref(false);
const link = ref("");
async function storeEncryptedDataInCookie(iframeUrl) {
  const payload = {
    systemid: 17,
    userhashcode: userInfo.userHascode,
    token: userInfo.token,
    userid: userInfo.userid,
    employeename: userInfo.fullname,
    employeeid: userInfo.empId,
    position: "",
    emailadd: userInfo.email,
    department: "",
    sex: "",
  };

  const key = await getKey(); // You can share the password securely across systems
  const encrypted = await encryptData(payload, key);

  // Calculate expiration time (30 minutes from now)
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 30);

  // Set cookie (secure, strict, and expires in 30 minutes)
  document.cookie = `utility=${encrypted}; path=/; secure; samesite=strict; expires=${expirationDate.toUTCString()}`;
  link.value = iframeUrl;
  show.value = true;
}

const siteDetails = ref(JSON.parse(localStorage.getItem("_102")));

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
      <div
        class="relative flex w-full justify-between items-center pl-1 sm:ml-0 sm:pr-2"
      >
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

          <div class="flex items-center">
            <span class="ml-5 text-sm text-white">{{
              `Pallet Inventory System Online - ${
                siteDetails ? siteDetails.sitename : ""
              }`
            }}</span>
          </div>
        </div>
        <div class="relative ml-3">
          <button
            type="button"
            class="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300"
            id="user-menu-button-2"
            aria-expanded="false"
            @click="toggleDropdown"
          >
            <div class="flex items-center">
              <span class="mr-5 text-sm text-white">{{
                `Hi ${userInfo.fname}`
              }}</span>
            </div>
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
              <p class="text-sm text-gray-900 mb-2" role="none">
                {{ userInfo.fullname }}
              </p>
              <p class="text-sm font-medium text-gray-900 truncate" role="none">
                {{ userInfo.email }}
              </p>
            </div>
            <ul class="py-1" role="none">
              <li
                @click="
                  storeEncryptedDataInCookie(
                    'https://apps.fastlogistics.com.ph/utility/#/Setting/Account'
                  )
                "
                class="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 mr-3"
                  viewBox="0 0 48 48"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                  >
                    <path d="M18 31h20V5" />
                    <path d="M30 21H10v22m34-32l-6-6l-6 6" />
                    <path d="m16 37l-6 6l-6-6" />
                  </g>
                </svg>
                Account Settings
              </li>
              <li
                @click="showSwitchSiteModal = true"
                class="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="w-4 h-4 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="m12 5.15l-8 3.2V19h2v-6q0-.825.588-1.412T8 11h8q.825 0 1.413.588T18 13v6h2V8.35zM2 19V8.35q0-.625.338-1.125T3.25 6.5l8-3.2q.35-.15.75-.15t.75.15l8 3.2q.575.225.913.725T22 8.35V19q0 .825-.587 1.413T20 21h-4v-8H8v8H4q-.825 0-1.412-.587T2 19m7 2v-2h2v2zm2-3v-2h2v2zm2 3v-2h2v2zM8 11h8z"
                  />
                </svg>
                Switch Site
              </li>
              <li
                @click="$router.push('/')"
                class="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="w-4 h-4 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="M4 12a1 1 0 0 0 1 1h7.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H5a1 1 0 0 0-1 1M17 2H7a3 3 0 0 0-3 3v3a1 1 0 0 0 2 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3"
                  />
                </svg>
                Sign out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div>
    <!-- Modal -->
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-lg max-w-4xl w-full p-4 relative">
        <!-- Close Button -->
        <button
          @click="show = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <!-- Iframe -->
        <div class="aspect-video">
          <iframe
            class="w-full h-full"
            :src="link"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
  <!--   

  <div
          class="absolute min-w-[160px] z- bg-[#f9f9f9]"
        >
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div> -->
</template>
