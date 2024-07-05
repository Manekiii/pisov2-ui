<script setup>
import SidebarItem from "./SidebarItem.vue";
import DashboardIcon from "./icons/DashboardIcon.vue";
import ChecklistIcon from "./icons/ChecklistIcon.vue";
import FacilityIcon from "./icons/FacilityIcon.vue";
import AmbassadorIcon from "./icons/AmbassadorIcon.vue";
import CompanyIcon from "./icons/CompanyIcon.vue";
import { serviceApi } from "../../services/piso-serviceapi";
import { sidebarOpen, showSwitchSiteModal } from "../store";
import SettingsIcon from "./icons/SettingsIcon.vue";

// const menulist = ref([
//   {
//     title: "Title 1",
//     isopen: false,
//     submenu: [
//       {
//         title: "sub1",
//         isclick: false,
//       },
//       {
//         title: "sub2",
//         isclick: false,
//       },
//       {
//         title: "sub3",
//         isclick: false,
//       },
//     ],
//   },
//   {
//     title: "Title 2",
//     isopen: false,
//     submenu: [
//       {
//         title: "sub1",
//         isclick: false,
//       },
//       {
//         title: "sub2",
//         isclick: false,
//       },
//       {
//         title: "sub3",
//         isclick: false,
//       },
//     ],
//   },
// ]);

const menulist = ref();
const isDropdownOpen = ref(false);
const isclick = false;
const ionRouter = useIonRouter();

// Toggle dropdown
const toggleDropdown = (menu) => {
  menu.isDropdownOpen = !menu.isDropdownOpen;
  closeOtherMenus(menu);
};

const closeOtherMenus = (currentMenu) => {
  menulist.value.forEach((menu) => {
    if (menu !== currentMenu) {
      menu.isDropdownOpen = false;
    }
  });
};

const SubOnClick = (sub, menu) => {
  sub.isclick = true;
  closeOtherSubMenus(sub, menu);
  navigatePage(sub.stage);
};

const closeOtherSubMenus = (currentSubMenu, currentMenu) => {
  menulist.value.forEach((menu) => {
    if (menu === currentMenu) {
      menu.pages.forEach((sub) => {
        if (sub !== currentSubMenu) {
          sub.isclick = false;
        }
      });
    } else {
      menu.pages.forEach((sub) => {
        sub.isclick = false;
      });
    }
  });
};

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
      menulist.value = response.data;
      console.log(menulist);
      if (!usersite) {
        showSwitchSiteModal.value = true;
      }
    }
  } catch (error) {
    console.log(error);
  }
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
}

onMounted(() => {
  initUserMenu();
});
</script>

<template>
  <!-- Place nyo dito yung dynamic na menu -->
  <ul class="md:pl-3">
    <li>
      <button
        @click="navigatePage('dashboard')"
        class="my-2 flex w-full items-center text-blue-50 justify-start p-4 font-thin uppercase transition-colors duration-200 lg:hover:text-blue-500"
      >
        <span><DashboardIcon /></span>
        <label v-if="sidebarOpen" class="ml-2">Dashboard</label>
      </button>
    </li>
    <!-- Parent Menu -->
    <li v-for="(item, index) in menulist" :key="index" class="relative">
      <button
        @click="toggleDropdown(item)"
        class="my-2 flex w-full items-center text-blue-50 justify-between p-4 font-thin uppercase transition-colors duration-200 lg:hover:text-blue-500"
        :class="
          item.isopen &&
          ''
        "
      >
        <div class="flex justify-center items-center">
          <span v-if="item.name == 'Report'">
            <CompanyIcon />
          </span>
          <span v-else-if="item.name == 'Activity'">
            <ChecklistIcon />
          </span>
          <span v-else> <SettingsIcon /> </span>

          <label
            v-if="sidebarOpen"
            class="ml-2 text-start text-xs sm:text-sm md:text-base"
          >
            {{ item.name }}</label
          >
        </div>
        <span v-if="sidebarOpen"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            v-if="!item.isDropdownOpen"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            v-else
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
      </button>
      <ul
        v-if="sidebarOpen"
        class="ml-8"
        :class="{ hidden: !item.isDropdownOpen }, {'absolute w-52 -right-52 top-0 bg-blue-950': !sidebarOpen}"
      >
        <!-- Sub Menu -->
        <li v-for="(sub, index) in item.pages" :key="index">
          <button
            @click="SubOnClick(sub, item); toggleDropdown(item)"
            class="my-2 flex w-full items-center justify-start px-4 py-2 font-thin uppercase transition-colors duration-200 lg:hover:text-blue-500"
            :class="
              sub.isclick &&
              'border-4 border-[#d8f1f0] rounded-l-2xl bg-[#d8f1f0] text-black '
            "
          >
            •
            <label class="ml-2 text-start text-xs sm:text-sm md:text-base">
              {{ sub.name }}
            </label>
          </button>
        </li>
      </ul>
    </li>

    <!-- <SidebarItem title="Company" to="/main/maintenance/company">
      <CompanyIcon />
    </SidebarItem>

    <SidebarItem title="Checklist" to="/main/maintenance/checklist">
      <ChecklistIcon />
    </SidebarItem>

    <SidebarItem title="Facility" to="/main/maintenance/facility">
      <FacilityIcon />
    </SidebarItem>

    <SidebarItem title="Ambassador" to="/main/maintenance/ambassador">
      <AmbassadorIcon />
    </SidebarItem> -->
  </ul>
</template>
