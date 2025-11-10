<template>
  <IonPage>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div
        class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      >
        <!-- Header Section -->
        <div
          class="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-40"
        >
          <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h1
                    class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                  >
                    Transaction Ledger
                  </h1>
                  <!-- <p class="text-sm text-gray-500 mt-1">
                    Manage and track all your transactions
                  </p> -->
                </div>
              </div>

              <button
                type="button"
                @click="showModal = true"
                class="group relative inline-flex items-center px-6 py-3 overflow-hidden text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg
                  class="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                  ></path>
                </svg>
                Filter
              </button>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-8">
          <!-- WEB VIEW -->
          <div class="hidden md:block">
            <!-- Enhanced Context Menu -->
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

            <!-- Enhanced Table -->
            <div
              class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
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
                      Reference
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Document
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Shipper No
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Created By
                    </th>
                    <th
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
                    :key="trans.transhdrId"
                  >
                    <td class="px-6 py-4">
                      <button
                        class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg group-hover:shadow-xl"
                        @click="OnPreview(trans.transhdrId)"
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
                      {{ trans.referenceno }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      {{ trans.documentno }}
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      <div class="flex flex-col">
                        <span class="font-medium">{{ trans.shippercode }}</span>
                        <span class="text-sm text-gray-500">{{
                          trans.shippername
                        }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-900">
                      <div class="flex items-center gap-2">
                        <div
                          class="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
                        >
                          <span class="text-xs font-semibold text-gray-600">{{
                            trans.created_by.charAt(0).toUpperCase()
                          }}</span>
                        </div>
                        <span>{{ trans.created_by }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-900 font-mono text-sm">
                      {{
                        format(
                          new Date(trans.create_date),
                          "yyyy-MM-dd hh:mm:ss"
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- MOBILE VIEW -->
          <div class="block md:hidden space-y-4">
            <div
              v-for="trans in scope.transactionList"
              :key="trans.transhdrId"
              class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div class="p-6">
                <!-- Header -->
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center"
                    >
                      <span class="text-white font-bold text-sm">{{
                        trans.transhdrId.toString().slice(-2)
                      }}</span>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">
                        Trans #{{ trans.transhdrId }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ trans.referenceno }}
                      </p>
                    </div>
                  </div>
                  <button
                    class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                    @click="OnPreview(trans.transhdrId)"
                  >
                    <svg
                      class="w-4 h-4 mr-1"
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
                </div>

                <!-- Details Grid -->
                <div class="space-y-3">
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <span class="text-sm font-medium text-gray-600"
                      >Document</span
                    >
                    <span class="text-sm text-gray-900 font-mono">{{
                      trans.documentno
                    }}</span>
                  </div>
                  <div
                    class="flex items-start justify-between py-2 border-b border-gray-100"
                  >
                    <span class="text-sm font-medium text-gray-600"
                      >Shipper</span
                    >
                    <div class="text-right">
                      <div class="text-sm text-gray-900 font-medium">
                        {{ trans.shippercode }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ trans.shippername }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <span class="text-sm font-medium text-gray-600"
                      >Created By</span
                    >
                    <div class="flex items-center gap-2">
                      <div
                        class="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
                      >
                        <span class="text-xs font-semibold text-gray-600">{{
                          trans.created_by.charAt(0).toUpperCase()
                        }}</span>
                      </div>
                      <span class="text-sm text-gray-900">{{
                        trans.created_by
                      }}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between py-2">
                    <span class="text-sm font-medium text-gray-600"
                      >Created Date</span
                    >
                    <span class="text-sm text-gray-900 font-mono">{{
                      trans.create_date
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <!-- Enhanced Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- Background overlay -->
        <div
          class="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity"
          @click="hideModal()"
        ></div>

        <!-- Modal panel -->
        <div
          class="relative inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <!-- Modal header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">
                Filter Transactions
              </h3>
            </div>
            <button
              @click="hideModal()"
              class="rounded-lg p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-150"
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
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3"
                >Date From</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <VueDatePicker
                  v-model="scope.dtefrom"
                  :auto-position="false"
                  :teleport="true"
                  :enable-time-picker="false"
                  auto-apply
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3"
                >Date To</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <VueDatePicker
                  v-model="scope.dteto"
                  :auto-position="false"
                  :teleport="true"
                  :enable-time-picker="false"
                  auto-apply
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                />
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="flex justify-end gap-3 mt-8">
            <button
              @click="hideModal()"
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              @click="onInit()"
              class="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg
                class="w-4 h-4 mr-2 inline"
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
          </div>
        </div>
      </div>
    </div>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Swal from "sweetalert2";
import { sidebarOpen } from "~/dashboard/store";
import * as XLSX from "xlsx";

var sitecode = JSON.parse(
  localStorage.getItem("_102")
).sitecode; /*set sidecode*/
const showModal = ref(true);
const ionRouter = useIonRouter();
const scope = reactive({});
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.dtefrom = new Date();
scope.dteto = new Date();

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
  //document.querySelector("#loadingindicator").classList.toggle("hidden");
};

const hideModal = () => {
  showModal.value = false;
};

const onInit = async (ipage) => {
  handleLoading();
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "TransactionLedgerperWarehouse/?warehouseId=" +
      sitecode +
      "&dateFrom=" +
      format(scope.dtefrom, "MM/dd/yyyy") +
      "&dateTo=" +
      format(scope.dteto, "MM/dd/yyyy"),
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response.status === 200) {
    scope.transactionList = response.data;
    handleLoading();
    showModal.value = false;
  }
};

/* const onPreview = function () {
  scope.dtefrom = $("#dtefrom").data().date;
  scope.dteto = $("#dteto").data().date;
  scope.requiredPrompt = "";

  if (
    dtefrom == "" ||
    dtefrom == undefined ||
    dteto == "" ||
    dteto == undefined
  ) {
    scope.requiredPrompt = "Please fill up required fields.";
  } else {
    //GlobalHelper.StartSpin();
    onInit(1);
    //$rootScope.closeModalForm();
  }
}; */

const OnPreview = (item) => {
  /*  ionRouter.push({
    name: "tabs-report-printing-report-transaction-report",
    query: { transid: 12345 },
  }); */
  const router = useRouter();
  // Manually construct the URL
  const queryParams = new URLSearchParams({ transid: item }).toString();
  // const url = `/tabs/report/printing-report/transaction-report?${queryParams}`;

  const url = `/pison/tabs/report/printing-report/transaction-report?${queryParams}`;

  // Open the URL in a new tab
  window.open(url, "_blank");
};

const getUniqueItems = (items, property) => {
  const seen = new Set();
  return items.filter((item) => {
    const value = item[property];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
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
</style>
