<template>
  <IonPage>
    <!-- <nav
    ></nav> -->
    <ion-content>
      <nav
        class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div>
              <button @click="toggleSidebar" class="flex ml-3 mt-3">
                <label>PISO</label>
                <span class="sr-only">Toggle sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    :class="{ hidden: isSidebarOpen, block: !isSidebarOpen }"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                  <path
                    :class="{ hidden: !isSidebarOpen, block: isSidebarOpen }"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M4.75 2a.75.75 0 00-.75.75v14.5a.75.75 0 001.5 0V2.75A.75.75 0 004.75 2zM14.75 2a.75.75 0 01.75.75v14.5a.75.75 0 01-1.5 0V2.75a.75.75 0 01.75-.75z"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <aside
                :class="{
                  'translate-x-0': isSidebarOpen,
                  '-translate-x-full': !isSidebarOpen,
                }"
                class="fixed top-0 left-0 z-40 w-80 h-screen p-4 transition-transform bg-gray-50 dark:bg-gray-800"
                aria-label="Sidebar"
              >
                <div>
                  <div>
                    <h5
                      id="drawer-navigation-label"
                      class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
                    >
                      MENU
                    </h5>
                    <button
                      type="button"
                      @click="isSidebarOpen = false"
                      aria-controls="drawer-navigation"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="sr-only">Close menu</span>
                    </button>
                  </div>

                  <ul class="space-y-2 font-medium">
                    <li>
                      <button
                        @click="navigatePage('dashboard')"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <svg
                          class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 21"
                        >
                          <path
                            d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
                          />
                          <path
                            d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
                          />
                        </svg>
                        <span class="ms-3">Dashboard</span>
                      </button>
                    </li>
                    <li v-for="menu in userMenu" :key="menu.name">
                      <button
                        type="button"
                        @click="toggleDropdown(menu)"
                        class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        aria-controls="dropdown-example"
                      >
                        <svg
                          aria-hidden="true"
                          class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">{{
                          menu.name
                        }}</span>
                        <svg
                          :class="{
                            'transform rotate-180': menu.isDropdownOpen,
                          }"
                          class="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <ul
                        id="dropdown-example"
                        :class="{ hidden: !menu.isDropdownOpen }"
                        class="py-2 space-y-2"
                      >
                        <li v-for="subMenu in menu.pages" :key="subMenu.name">
                          <button
                            @click="navigatePage(subMenu.stage)"
                            class="flex text-sm items-start justify-start w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          >
                            {{ subMenu.name }}
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {{ userInfo.fullname }}
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {{ userInfo.email }}
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <button
                        class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        @click="showSwitchSiteModal = true"
                      >
                        Switch Site
                      </button>
                    </li>
                    <li>
                      <button
                        @click="logout"
                        class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ion-router-outlet @click="isSidebarOpen = false" />

      <div class="items-center">
        <SwitchSite
          v-show="showSwitchSiteModal"
          @close-modal="showSwitchSiteModal = false"
        />
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { initFlowbite } from "flowbite";
import Swal from 'sweetalert2'
import { serviceApi } from "../services/piso-serviceapi";

// Sidebar state
const isSidebarOpen = ref(false);
const userInfo = reactive({});
Object.assign(userInfo, JSON.parse(localStorage.getItem("_214")));
// Dropdown state
const isDropdownOpen = ref(false);
const ionRouter = useIonRouter();
const showSwitchSiteModal = ref(false);
const userMenu = ref();
const initUserMenu = async () => {
  try {
    const userid = JSON.parse(localStorage.getItem("_214")).userid;
    const usersite = localStorage.getItem("_102");
    const response = await serviceApi().get(
      "account/get-app-menu-v2/?sysid=17&userid=" + userid,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
        },
      }
    );

    if (response.status === 200) {
      userMenu.value = response.data;

      if (!usersite) {
        showSwitchSiteModal.value = true;
      }
    }
  } catch (error) {}
};

//Navigations
function navigatePage(stage) {
  if (stage == "dashboard") {
    ionRouter.replace("/tabs/");
  } else if (stage == "location") {
    ionRouter.replace("/tabs/maintenance/storage-classification");
  } else if (stage == "pallet-supplier") {
    // Pallet Supplier
  } else if (stage == "pallet-customer") {
    ionRouter.replace("/tabs/maintenance/shipper");
  } else if (stage == "pallet-supplier") {
  } else if (stage == "636981708567232993") {
    ionRouter.replace("/tabs/maintenance/trucker");
  } else if (stage == "pallet-master") {
    ionRouter.replace("/tabs/maintenance/pallet-master");
  } else if (stage == "inbound") {
  } else if (stage == "inbound-posting") {
  } else if (stage == "out-bound") {
  } else if (stage == "outbound-posting") {
  } else if (stage == "transfer") {
    ionRouter.replace("/tabs/transaction/inventory-transfer");
  } else if (stage == "transaction-ledger") {
    ionRouter.replace("/tabs/report/transaction-ledger");
  } else if (stage == "transaction-report") {
  } else if (stage == "150500000011") {
  } else if (stage == "150500000013") {
  } else if (stage == "150500000012") {
    ionRouter.replace("/tabs/report/transfer-from");
  } else if (stage == "150500000014") {
    ionRouter.replace("/tabs/report/transfer-to");
  } else if (stage == "pallet-inventory") {
    ionRouter.replace("/tabs/report/pallet-inventory");
  } else if (stage == "637050505963662951") {
    ionRouter.replace("/tabs/report/pallet-overall-transaction");
  } else if (stage == "637068285247872831") {
    ionRouter.replace("/tabs/report/pallet-inventory-with-location");
  } else if (stage == "150600000011") {
    ionRouter.replace("/tabs/report/storage-ledger");
  } else if (stage == "636795987832500587") {
    // useRouter().push('/transaction/receipt-batch')
    ionRouter.replace("/tabs/transaction/receipt-batch");
  } else if (stage == "636808269730236079") {
    //Receipt Batch Posting
    // useRouter().push('/transaction/receipt-batch-posting')
    ionRouter.replace("/tabs/transaction/receipt-batch-posting");
  } else if (stage == "636795988608256349") {
    //Issuance Batch
    // useRouter().push('/transaction/issuance-batch')
    ionRouter.replace("/tabs/transaction/issuance-batch");
  } else if (stage == "636808272376317312") {
    //Issuance Batch Posting
    // useRouter().push('/transaction/issuance-batch-posting')
    ionRouter.replace("/tabs/transaction/issuance-batch-posting");
  } else if (stage == "636795990881664647") {
  } else if (stage == "636809470736329205") {
  } else if (stage == "636823563179782717") {
    ionRouter.replace("/tabs/report/batch-receiving-report");
  } else if (stage == "636823563461797560") {
    ionRouter.replace("/tabs/report/batch-issuance-report");
  } else if (stage == "636823563756531976") {
    ionRouter.replace("/tabs/report/batch-inter-plant-report");
  } else if (stage == "receive-preview") {
  }

  isSidebarOpen.value = false;
}

// Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Toggle dropdown
const toggleDropdown = (menu) => {
  menu.isDropdownOpen = !menu.isDropdownOpen;
  closeOtherMenus(menu);
};

const closeOtherMenus = (currentMenu) => {
  userMenu.value.forEach((menu) => {
    if (menu !== currentMenu) {
      menu.isDropdownOpen = false;
    }
  });
};

const toggleShowProfileItem = () => {
  showProfileItem.value = !showProfileItem.value;
};

const toggleSwitchSiteModal = () => {
  showSwitchSiteModal.value = true;
  showProfileItem.value = false;
};

const logout = () => {
  Swal.fire({
    title: "Are you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    heightAuto: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        ionRouter.replace("/");
      } catch (error) {
        console.error(error);
      }
    }
  });
};

onMounted(() => {
  initFlowbite();
  initUserMenu();
});
</script>

<style scoped></style>
