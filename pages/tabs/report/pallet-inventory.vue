<template>
  <IonPage>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div class="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
        <!-- Header Section -->
        <div class="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
          <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <div>
                  <h1 id="title" class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Pallet Inventory
                  </h1>
                  <p class="text-sm text-gray-500 mt-1">Monitor and manage your pallet stock levels</p>
                </div>
              </div>
              
              <!-- <button
                id="filter-button"
                type="button"
                @click="showModal = true"
                class="print-button group relative inline-flex items-center px-6 py-3 overflow-hidden text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg class="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"></path>
                </svg>
                Filter
              </button> -->
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-8">
          <!-- WEB VIEW -->
          <div id="web-view" class="content-table hidden md:block">
            <!-- Enhanced Context Menu -->
            <div
              v-if="showMenu"
              :style="{
                position: 'fixed',
                top: `${menuPosition.y}px`,
                left: `${menuPosition.x}px`,
              }"
              class="context-menu bg-white rounded-xl shadow-2xl border border-gray-200/50 backdrop-blur-sm z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200"
            >
              <ul class="py-2">
                <li @click="exportToExcel" class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 cursor-pointer transition-all duration-150 group">
                  <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" class="text-green-600">
                      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                        <path stroke-linejoin="round" d="M8 15V6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-9"/>
                        <path d="M31 15h3m-6 8h6m-6 8h6"/>
                        <path stroke-linejoin="round" d="M4 15h18v18H4zm6 6l6 6m0-6l-6 6"/>
                      </g>
                    </svg>
                  </div>
                  <span class="font-medium">Export to Excel</span>
                </li>
                <li @click="printSelection" class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 cursor-pointer transition-all duration-150 group">
                  <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="text-emerald-600">
                      <path fill="currentColor" d="M16 8V5H8v3H6V3h12v5zM4 10h16zm14 2.5q.425 0 .713-.288T19 11.5t-.288-.712T18 10.5t-.712.288T17 11.5t.288.713t.712.287M16 19v-4H8v4zm2 2H6v-4H2v-6q0-1.275.875-2.137T5 8h14q1.275 0 2.138.863T22 11v6h-4zm2-6v-4q0-.425-.288-.712T19 10H5q-.425 0-.712.288T4 11v4h2v-2h12v2z"/>
                    </svg>
                  </div>
                  <span class="font-medium">Print</span>
                </li>
              </ul>
            </div>

            <!-- Enhanced Table -->
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <table
                class="w-full text-sm"
                @contextmenu.prevent="handleRightClick"
              >
                <thead class="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm">
                  <tr class="border-b border-gray-200/50">
                    <th id="theader" scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Pallet Code
                      </div>
                    </th>
                    <th id="theader" scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                        </svg>
                        Pallet Name
                      </div>
                    </th>
                    <th id="theader" scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                        QtyOnHand
                      </div>
                    </th>
                    <th id="theader" scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Total Contracted
                      </div>
                    </th>
                    <th id="theader" scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Unposted Receipt
                      </div>
                    </th>
                    <th id="theader" scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Unposted Issuance
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200/50">
                  <tr
                    class="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-all duration-200 group"
                    v-for="trans in scope.transactionList"
                    :key="trans.PalletId"
                  >
                    <td id="tdetail" class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                          <span class="text-xs font-bold text-emerald-700">{{ trans.PalletId.toString().slice(0, 2).toUpperCase() }}</span>
                        </div>
                        <span class="font-mono text-sm font-semibold text-gray-900">{{ trans.PalletId }}</span>
                      </div>
                    </td>
                    <td id="tdetail" class="px-6 py-4 text-gray-900 font-medium">{{ trans.PalletDesc }}</td>
                    <td id="tdetail" class="px-6 py-4">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                        {{ trans.QuantityOnHand }}
                      </span>
                    </td>
                    <td id="tdetail" class="px-6 py-4">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {{ trans.TotalContracted }}
                      </span>
                    </td>
                    <td id="tdetail" class="px-6 py-4">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                        {{ trans.UnpostedReceipt }}
                      </span>
                    </td>
                    <td id="tdetail" class="px-6 py-4">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        {{ trans.UnpostedIssuance }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- MOBILE VIEW -->
          <div
            id="mobile-view"
            class="block md:hidden space-y-4"
          >
            <div
              v-for="trans in scope.transactionList"
              :key="trans.PalletId"
              class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div class="p-6">
                <!-- Header -->
                <div class="flex items-start justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span class="text-white font-bold text-sm">{{ trans.PalletId.toString().slice(0, 2).toUpperCase() }}</span>
                    </div>
                    <div>
                      <p class="font-bold text-gray-900 text-lg">{{ trans.PalletId }}</p>
                      <p class="text-sm text-gray-600">{{ trans.PalletDesc }}</p>
                    </div>
                  </div>
                </div>

                <!-- Inventory Stats Grid -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200/50">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium text-emerald-700">On Hand</span>
                    </div>
                    <p class="text-2xl font-bold text-emerald-900">{{ trans.QuantityOnHand }}</p>
                  </div>

                  <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200/50">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium text-blue-700">Contracted</span>
                    </div>
                    <p class="text-2xl font-bold text-blue-900">{{ trans.TotalContracted }}</p>
                  </div>

                  <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200/50">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium text-amber-700">Pending Receipt</span>
                    </div>
                    <p class="text-2xl font-bold text-amber-900">{{ trans.UnpostedReceipt }}</p>
                  </div>

                  <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200/50">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium text-orange-700">Pending Issue</span>
                    </div>
                    <p class="text-2xl font-bold text-orange-900">{{ trans.UnpostedIssuance }}</p>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center justify-end gap-2">
                  <button
                    v-show="scope.canEdit"
                    @click="onEdit(shipper.Id)"
                    class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </button>
                  <button
                    v-show="scope.canDelete"
                    @click="onDelete(shipper.Id)"
                    class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </IonPage>
</template>
<script setup>
import * as XLSX from "xlsx";
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { sidebarOpen } from "~/dashboard/store";

const scope = reactive({});
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.dtefrom;
scope.dteto;

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

const pageChangeHandlerPalletInventoryReport = function (num) {
  scope.currentPage = num;
};
var sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;
var userFullname = JSON.parse(decrypt(localStorage.getItem("_214"))).fullname;

/*initialize first load*/
const onInit = async (ipage) => {
  scope.currentPage = ipage;

  const response = await serviceApi().get(
    "pallet/get-pallet-Inventory/?sitecode=" + sitecode,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
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

<style scoped>
/* Screen-specific styles */
#web-view {
  overflow-x: auto;
}

@media print {
  #mobile-view,
  #filter-button {
    display: none !important;
  }

  #web-view {
    display: block !important;
    width: 100% !important;
    overflow: visible !important;
    border: 0 !important;
    font-size: xx-small !important;
  }

  #theader,
  #tdetail {
    font-size: xx-small !important;
    padding-left: 3px !important;
    padding-right: 3px !important;
  }
}

/* Responsive for screen only */
@media screen and (max-width: 768px) {
  #mobile-view,
  #filter-button {
    display: none;
  }

  #web-view {
    display: block;
    width: 100%;
    overflow: visible;
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

/* @media print {
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
  }

  #title {
    text-align: left;
    justify-content: left;
    font-weight: normal;
    font-size: 26px;
    position: relative;
    margin-right: 15px;
    top: 0;
    border-width: 0;
  }

  .min-w-full {
    width: 100%;
  }

  table.min-w-full {
    width: 100%;
    margin: 0 auto; 
  }

  h2,
  .text-center {
    text-align: center;
    font-size: 16px;
  }

  td[colspan="2"] {
    width: 100%; 
  }

  table td {
    font-size: 12px;
  }

  .overflow-auto {
    overflow: visible;
    height: auto;
  }

  .p-2 {
    padding: 4px;
  }

  .p-4 {
    padding: 8px;
  }
} */

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
