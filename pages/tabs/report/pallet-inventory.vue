<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div>
        <div class="border-2 items-center justify-center flex">
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900 dark:text-white"
          >
            Pallet Inventory
          </label>
        </div>

        <div
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div
            v-for="trans in scope.transactionList"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
          >
            <div>
              <label for="transactionNumber">Pallet Code: {{ trans.PalletId }}</label>
            </div>
            <div>
              <label for="orderNumber">Pallet Name: {{ trans.PalletDesc }}</label>
            </div>
            <div>
              <label for="transactionNumber"
                >QtyOnHand: {{ trans.QuantityOnHand }}</label
              >
            </div>
            <div>
              <label for="orderNumber">Total Contracted: {{ trans.TotalContracted }}</label>
            </div>

            <div>
              <label for="transactionNumber"
                >Unposted Receipt: {{ trans.UnpostedReceipt }}</label
              >
            </div>
            <div>
              <label for="orderNumber"
                >	Unposted Issuance:
                {{ trans.UnpostedIssuance }}</label
              >
            </div>

            <div class="flex items-center justify-end">
              <button
                v-show="scope.canEdit"
                @click="onEdit(shipper.Id)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                v-show="scope.canDelete"
                @click="onDelete(shipper.Id)"
                class="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import Swal from "sweetalert2";

const scope = reactive({});
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.dtefrom;
scope.dteto;

scope.pageChangeHandlerPalletInventoryReport = function (num) {
  scope.currentPage = num;
};
var sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;
var userFullname = JSON.parse(localStorage.getItem("_214")).fullname;

/*initialize first load*/
const onInit = async (ipage) => {
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "pallet/get-pallet-Inventory/?sitecode=" + sitecode,
    {
      headers: {
        Token: JSON.parse(localStorage.getItem("_214")).token,
      },
    }
  );

  if (response.status === 200) {
    scope.transactionList = response.data.data.data;
    scope.total_count = response.data.data.total_count;
  }
};

onMounted(() => {
  onInit();
});
</script>
