<template>
  <IonPage>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div class="">
        <!-- Header Section -->
        <div
          id="print-title"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                Transfer From Report
              </h1>
            </div>

            <div id="filter-button" class="hidden md:flex gap-3">
              <button
                type="button"
                @click="showModal = true"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>

              <!-- <button
                type="button"
                @click="printPage"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-gray-300"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print
              </button> -->
            </div>
          </div>
        </div>
        <!-- <div
          id="print-title"
          class="border-b-2 items-center justify-center flex p-2"
        >
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900"
          >
            Transfer From Report
          </label>
        </div>
        <div id="filter-button" class="flex justify-end">
          <button
            type="submit"
            @click="showModal = true"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Filter
          </button>

          <button
            type="submit"
            @click="printPage"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Print
          </button>
        </div> -->

        <div class="mx-auto px-4 py-8">
          <!-- WEB -->
          <div id="web-view" class="hidden md:block">
            <div
              class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-auto"
            >
              <table class="w-full text-sm">
                <thead
                  class="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm"
                >
                  <tr class="border-b border-gray-200/50">
                    <!-- <th id="theader" scope="col" class="py-2">Action</th> -->
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Trans #
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Transfer From
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Ref #
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Doc #
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Item Code
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Qty
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Destination Storage
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Remarks
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Created By
                    </th>
                    <th
                      id="theader"
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Created Date
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200/50">
                  <tr
                    class="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 group"
                    v-for="trans in scope.transactionList"
                  >
                    <td
                      id="tdetail"
                      class="px-6 py-4 font-mono text-sm text-gray-900 font-semibold"
                    >
                      {{ trans.TransactionID }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900">
                      {{ trans.TransferFrom }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900">
                      {{ trans.referenceno }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900">
                      {{ trans.documentno }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900">
                      {{ trans.ItemCode }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900">
                      {{ trans.ItemDescription }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-green-600 font-medium">
                      {{ trans.QtyTransferred }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900">
                      {{ trans.DestinationStorage }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900">
                      {{ trans.remarks }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900">
                      {{ trans.CreatedBy }}
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900">
                      {{
                        format(
                          new Date(trans.CreatedDate),
                          "MM/dd/yyyy hh:mm:ss a"
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- mobile -->
          <div
            id="mobile-view"
            class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
          >
            <div
              v-for="trans in scope.transactionList"
              class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-3"
            >
              <div>
                <label for="transactionNumber"
                  >Trans #: {{ trans.TransactionID }}</label
                >
              </div>
              <div>
                <label for="orderNumber"
                  >Transfer From: {{ trans.TransferFrom }}</label
                >
              </div>
              <div>
                <label for="transactionNumber"
                  >Ref #: {{ trans.referenceno }}</label
                >
              </div>
              <div>
                <label for="orderNumber">Doc #: {{ trans.documentno }}</label>
              </div>

              <div>
                <label for="transactionNumber"
                  >Item Code: {{ trans.ItemCode }}</label
                >
              </div>
              <div>
                <label for="orderNumber">
                  Description: {{ trans.ItemDescription }}</label
                >
              </div>
              <div>
                <label for="orderNumber">
                  Qty: {{ trans.QtyTransferred }}</label
                >
              </div>
              <div>
                <label for="orderNumber">
                  Destination Storage: {{ trans.DestinationStorage }}</label
                >
              </div>
              <div>
                <label for="orderNumber"> Remarks: {{ trans.remarks }}</label>
              </div>
              <div>
                <label for="orderNumber">
                  Created By: {{ trans.CreatedBy }}</label
                >
              </div>
              <div>
                <label for="orderNumber">
                  Created Date: {{ trans.CreatedDate }}</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
    <!-- Main modal DateFilter-->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <div>
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
          @click="hideModal()"
        ></div>

        <!-- Modal content -->
        <div
          class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-scale-in"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">Filter Options</h3>
            </div>
            <button
              @click="hideModal()"
              type="button"
              class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 overflow-y-auto max-h-[60vh]">
            <div class="space-y-5">
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <label class="block mb-2 text-sm font-semibold text-gray-700">
                    Date From
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10"
                    >
                      <svg
                        class="w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                        />
                      </svg>
                    </div>
                    <VueDatePicker
                      v-model="scope.dtefrom"
                      :auto-position="false"
                      :teleport="true"
                      :enable-time-picker="false"
                      auto-apply
                      class="date-picker-custom"
                    ></VueDatePicker>
                  </div>
                </div>

                <div>
                  <label class="block mb-2 text-sm font-semibold text-gray-700">
                    Date To
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10"
                    >
                      <svg
                        class="w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                        />
                      </svg>
                    </div>
                    <VueDatePicker
                      v-model="scope.dteto"
                      :auto-position="false"
                      :teleport="true"
                      :enable-time-picker="false"
                      auto-apply
                      class="date-picker-custom"
                    ></VueDatePicker>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex justify-end items-center p-2 space-x-2 border-gray-200 rounded-b"
          >
            <button
              @click="onPreview()"
              type="button"
              class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

var sitecode = JSON.parse(
  localStorage.getItem("_102")
).sitecode; /*set sidecode*/
const showModal = ref(true);
const scope = reactive({});
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.dtefrom = new Date();
scope.dteto = new Date();

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  /* didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }, */
});

// const handleLoading = async () => {
//   document.querySelector("#loadingindicator").classList.toggle("hidden");
// };

const hideModal = () => {
  showModal.value = false;
};

/*initialize first load*/
const onInit = async (ipage) => {
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "pallet/get-transfer-from-report/?sitecode=" +
      sitecode +
      "&dtefrom=" +
      format(scope.dtefrom, "MM/dd/yyyy") +
      "&dteto=" +
      format(scope.dteto, "MM/dd/yyyy"),
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response.status === 200) {
    scope.transactionList = response.data.data.data;
    console.log(scope.transactionList);
  }
};

const totalItemServe = (param) => {
  var itotal = 0;
  for (var i in param) {
    itotal = itotal + param[i].qtyserved;
  }

  return itotal;
};

const onPreview = () => {
  if (
    scope.dtefrom == "" ||
    scope.dtefrom == undefined ||
    scope.dteto == "" ||
    scope.dteto == undefined
  ) {
    scope.requiredPrompt = "Please fill up required fields.";
    Toast.fire({
      title: "Please fill up required fields",
      icon: "warning",
    });
  } else {
    onInit(1);
    showModal.value = false;
  }
};

const printPage = () => {
  window.print();
};

onMounted(() => {});
</script>

<style scoped>
#web-view {
  overflow-x: auto;
}

@media screen and (max-width: 768px), print {
  #mobile-view,
  #filter-button {
    display: none;
  }

  #web-view {
    display: block;
    width: 100%;
    border: 0;
    font-size: xx-small;
  }

  #theader,
  #tdetail {
    font-size: xx-small;
    padding-left: 3px;
    padding-right: 3px;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
