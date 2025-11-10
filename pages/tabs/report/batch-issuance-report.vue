<template>
  <IonPage>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div>
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
                Issuance Batch Report
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
        <!-- <div class="border-b-2 items-center justify-center flex p-2">
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900"
          >
            Issuance Batch Report
          </label>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            @click="showModal = true"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Filter
          </button>
        </div> -->

        <!-- Tables -->
        <div class="mx-auto px-4 py-8">
          <!-- WEB -->
          <div class="hidden md:block">
            <!-- The context menu that will appear when right-clicking -->
            <div
              v-if="showMenu"
              :style="{
                position: 'fixed',
                top: `${menuPosition.y}px`,
                left: `${menuPosition.x}px`,
              }"
              class="bg-white rounded-xl shadow-2xl border border-gray-200/50 backdrop-blur-sm z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200"
            >
              <ul class="py-2">
                <li
                  @click="exportToExcel"
                  class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-150 group"
                >
                  <div
                    class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 48 48"
                      class="text-green-600"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="2"
                      >
                        <path
                          stroke-linejoin="round"
                          d="M8 15V6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-9"
                        />
                        <path d="M31 15h3m-6 8h6m-6 8h6" />
                        <path
                          stroke-linejoin="round"
                          d="M4 15h18v18H4zm6 6l6 6m0-6l-6 6"
                        />
                      </g>
                    </svg>
                  </div>
                  <span class="font-medium">Export to Excel</span>
                </li>
                <li
                  @click="printSelection"
                  class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-150 group"
                >
                  <div
                    class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      class="text-blue-600"
                    >
                      <path
                        fill="currentColor"
                        d="M16 8V5H8v3H6V3h12v5zM4 10h16zm14 2.5q.425 0 .713-.288T19 11.5t-.288-.712T18 10.5t-.712.288T17 11.5t.288.713t.712.287M16 19v-4H8v4zm2 2H6v-4H2v-6q0-1.275.875-2.137T5 8h14q1.275 0 2.138.863T22 11v6h-4zm2-6v-4q0-.425-.288-.712T19 10H5q-.425 0-.712.288T4 11v4h2v-2h12v2z"
                      />
                    </svg>
                  </div>
                  <span class="font-medium">Print</span>
                </li>
              </ul>
            </div>
            <div
              class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-auto"
            >
              <table
                class="w-full text-sm"
                @contextmenu.prevent="handleRightClick"
              >
                <thead
                  class="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm"
                >
                  <tr class="border-b border-gray-200/50">
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      <div class="flex items-center gap-2">
                        <svg
                          class="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                        Action
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Trans #
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Shipper
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Document#
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Ref#
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Invoice#
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Order
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Order Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Ref Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Delivery Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Remarks
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Total Item
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200/50">
                  <tr
                    class="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 group"
                    v-for="trans in scope.transactionList"
                  >
                    <td class="px-6 py-4">
                      <button
                        class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg group-hover:shadow-xl"
                        @click="onViewReport(trans.transhdrId)"
                      >
                        <svg
                          class="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                        Preview
                      </button>
                    </td>
                    <td
                      class="px-6 py-4 font-mono text-sm text-gray-900 font-semibold"
                    >
                      {{ trans.transhdrId }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ trans.shippername }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ trans.documentno }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ trans.referenceno }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ trans.invoiceno }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">{{ trans.orderno }}</td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ trans.orderdate }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ trans.referencedate }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ trans.deliverydate }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ trans.remarks }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ totalItemServe(trans.invty_transdtl) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- mobile -->
          <div
            class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
          >
            <div
              v-for="trans in scope.transactionList"
              class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-3"
            >
              <div>
                <label for="transactionNumber"
                  >Trans #: {{ trans.transhdrId }}</label
                >
              </div>
              <div>
                <label for="orderNumber"
                  >Shipper: {{ trans.shippername }}</label
                >
              </div>
              <div>
                <label for="transactionNumber"
                  >Document#: {{ trans.documentno }}</label
                >
              </div>
              <div>
                <label for="orderNumber">Ref#: {{ trans.referenceno }}</label>
              </div>

              <div>
                <label for="transactionNumber"
                  >Invoice#: {{ trans.invoiceno }}</label
                >
              </div>
              <div>
                <label for="orderNumber"> Order: {{ trans.orderno }}</label>
              </div>
              <div>
                <label for="orderNumber">
                  Order Date: {{ trans.orderdate }}</label
                >
              </div>
              <div>
                <label for="orderNumber">
                  Ref Date: {{ trans.referencedate }}</label
                >
              </div>
              <div>
                <label for="orderNumber">
                  Delivery Date: {{ trans.deliverydate }}</label
                >
              </div>
              <div>
                <label for="orderNumber"> Remarks: {{ trans.remarks }}</label>
              </div>
              <div>
                <label for="orderNumber">
                  Total Item: {{ totalItemServe(trans.invty_transdtl) }}</label
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
import { sidebarOpen } from "~/dashboard/store";
import * as XLSX from "xlsx";

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

const showMenu = ref(false);
const menuPosition = ref({ x: 0, y: 0 });

// Handle right-click event
const handleRightClick = (event) => {
  // Prevent the default right-click menu from showing up
  event.preventDefault();

  // Set the menu's position based on the mouse coordinates
  const x = event.clientX;
  const y = event.clientY;

  // Offset the position slightly if you want some space around the context menu
  const yoffset = -100;
  const xoffset = !sidebarOpen.value ? -100 : -225;

  menuPosition.value = { x: x + xoffset, y: y + yoffset };

  // Show the custom context menu
  showMenu.value = true;
};

// Export to Excel functionality
const exportToExcel = () => {
  console.log("Exporting to Excel...");
  const ws = XLSX.utils.json_to_sheet(scope.transactionList);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "tableData.xlsx");
  showMenu.value = false; // Close the context menu after action
};

// Close the context menu if clicked outside
window.addEventListener("click", () => {
  showMenu.value = false;
});

const printSelection = () => {
  showMenu.value = false; // Close the context menu after action
  window.print();
};

const handleLoading = async () => {
  document.querySelector("#loadingindicator").classList.toggle("hidden");
};

const hideModal = () => {
  showModal.value = false;
};

/*initialize first load*/
const onInit = async (ipage) => {
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "pallet/get-transaction-header/?sitecode=" +
      sitecode +
      "&transtype=O&dtefrom=" +
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
    scope.transactionList = response.data;
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

const onViewReport = (p) => {
  /*  ionRouter.push({
    name: "tabs-report-printing-report-transaction-report",
    query: { transid: 12345 },
  }); */
  const router = useRouter();
  // Manually construct the URL
  const queryParams = new URLSearchParams({
    transid: p,
    title: "Issuance Batch Report",
  }).toString();
  // const url = `/tabs/report/printing-report/trans-preview?${queryParams}`;
  const url = `/pison/tabs/report/printing-report/trans-preview?${queryParams}`;

  // Open the URL in a new tab
  window.open(url, "_blank");
};

onMounted(() => {});
</script>

<style scoped>
.context-menu {
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.context-menu ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.context-menu li {
  padding: 10px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #f0f0f0;
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
