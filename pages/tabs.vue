<template>
  <IonPage>
    <Layout id="layout">
      <ion-content>
        <ion-router-outlet />
          <LoadingIndicator/>
      </ion-content>
    </Layout>
  </IonPage>
</template>

<script setup>
import Layout from "~/dashboard/Layout.vue";
import { initFlowbite } from "flowbite";
import Swal from "sweetalert2";
import { serviceApi } from "../services/piso-serviceapi";

definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
});

// Sidebar state
const isSidebarOpen = ref(false);
const userInfo = reactive({});
// Dropdown state
const isDropdownOpen = ref(false);
const ionRouter = useIonRouter();
const showSwitchSiteModal = ref(false);
const userMenu = ref();
const initUserMenu = async () => {
  try {
    const userid = JSON.parse(decrypt(localStorage.getItem("_214"))).userid;
    const usersite = localStorage.getItem("_102");
    const response = await serviceApi().get(
      "account/get-app-menu-v2/?sysid=17&userid=" + userid,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
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
  Object.assign(userInfo, JSON.parse(decrypt(localStorage.getItem("_214"))));
});
</script>

<style scoped></style>
