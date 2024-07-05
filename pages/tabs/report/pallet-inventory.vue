<template>
  <IonPage>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div>
        <div class="border-b-2 items-center justify-center flex p-2">
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900 dark:text-white"
          >
            Pallet Inventory
          </label>
        </div>
        <div class="flex justify-end m-4">
          <button
            type="submit"
            @click="showModal = true"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Filter
          </button>
        </div>

        <!-- WEB -->
        <div class="hidden md:block">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <!-- <th scope="col" class="px-6 py-3">Action</th> -->
                <th scope="col" class="px-6 py-3">Pallet Code</th>
                <th scope="col" class="px-6 py-3">Pallet Name</th>
                <th scope="col" class="px-6 py-3">QtyOnHand</th>
                <th scope="col" class="px-6 py-3">Total Contracted</th>
                <th scope="col" class="px-6 py-3">Unposted Receipt</th>
                <th scope="col" class="px-6 py-3">Unposted Issuance</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="trans in scope.transactionList"
              >
                <!-- <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div>
            <button
              class="bg-blue-500 rounded-lg p-1"
              v-show="scope.canEdit"
              @click="onEdit(posting.transhdrId)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button
              class="bg-red-500 rounded-lg p-1 ml-3"
              v-show="scope.canDelete && posting.transcode !== 'IN03'"
              @click="onDelete(posting.transhdrId)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>

            <button
              class="bg-green-500 rounded-lg p-1 ml-3"
              @click="onPost(posting.transhdrId)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </th> -->
                <td class="px-6 py-4">{{ trans.PalletId }}</td>
                <td class="px-6 py-4">{{ trans.PalletDesc }}</td>
                <td class="px-6 py-4">{{ trans.QuantityOnHand }}</td>
                <td class="px-6 py-4">
                  {{ trans.TotalContracted }}
                </td>
                <td class="px-6 py-4">
                  {{ trans.UnpostedReceipt }}
                </td>
                <td class="px-6 py-4">
                  {{ trans.UnpostedIssuance }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="mt-4 flex justify-end items-center">
            <button :disabled="scope.currentPage == 0"  @click="onInit(scope.currentPage - 1)">
              <svg
                class="w-6 h-6"
                :class="{'text-gray-400' : scope.currentPage == 0}"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
            <label class="mx-2">{{ scope.currentPage + 1 }}</label>
            <button @click="onInit(scope.currentPage + 1)">
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </div> -->
        </div>

        <!-- MOBILE -->

        <div
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div
            v-for="trans in scope.transactionList"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
          >
            <div>
              <label for="transactionNumber"
                >Pallet Code: {{ trans.PalletId }}</label
              >
            </div>
            <div>
              <label for="orderNumber"
                >Pallet Name: {{ trans.PalletDesc }}</label
              >
            </div>
            <div>
              <label for="transactionNumber"
                >QtyOnHand: {{ trans.QuantityOnHand }}</label
              >
            </div>
            <div>
              <label for="orderNumber"
                >Total Contracted: {{ trans.TotalContracted }}</label
              >
            </div>

            <div>
              <label for="transactionNumber"
                >Unposted Receipt: {{ trans.UnpostedReceipt }}</label
              >
            </div>
            <div>
              <label for="orderNumber">
                Unposted Issuance: {{ trans.UnpostedIssuance }}</label
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

const handleLoading = async () => {
  document.querySelector("#loadingindicator").classList.toggle("hidden");
};

const pageChangeHandlerPalletInventoryReport = function (num) {
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
  onInit(0);
});
</script>
