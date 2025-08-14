<template>
  <IonPage>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div>
        <div class="border-b-2 items-center justify-center flex p-2">
          <label
            id="title"
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900"
          >
            Pallet Inventory
          </label>
        </div>
        <div class="print-button flex justify-end m-4">
          <button
            id="filter-button"
            type="submit"
            @click="showModal = true"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Filter
          </button>
        </div>

        <!-- WEB -->
        <div id="web-view" class="content-table hidden md:block">
          <!-- The context menu that will appear when right-clicking -->
          <div
            v-if="showMenu"
            :style="{
              position: 'fixed',
              top: `${menuPosition.y}px`,
              left: `${menuPosition.x}px`,
            }"
            class="context-menu"
          >
            <ul class="text-sm">
              <li @click="exportToExcel" class="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="4"
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
                Export to Excel
              </li>
              <li @click="printSelection" class="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M16 8V5H8v3H6V3h12v5zM4 10h16zm14 2.5q.425 0 .713-.288T19 11.5t-.288-.712T18 10.5t-.712.288T17 11.5t.288.713t.712.287M16 19v-4H8v4zm2 2H6v-4H2v-6q0-1.275.875-2.137T5 8h14q1.275 0 2.138.863T22 11v6h-4zm2-6v-4q0-.425-.288-.712T19 10H5q-.425 0-.712.288T4 11v4h2v-2h12v2z"
                  />
                </svg>
                Print
              </li>
            </ul>
          </div>
          <table
            class="w-full text-sm text-left rtl:text-right rounded-lg"
            @contextmenu.prevent="handleRightClick"
          >
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <!-- <th scope="col" class="px-6 py-3">Action</th> -->
                <th id="theader" scope="col" class="px-6 py-3">Pallet Code</th>
                <th id="theader" scope="col" class="px-6 py-3">Pallet Name</th>
                <th id="theader" scope="col" class="px-6 py-3">QtyOnHand</th>
                <th id="theader" scope="col" class="px-6 py-3">
                  Total Contracted
                </th>
                <th id="theader" scope="col" class="px-6 py-3">
                  Unposted Receipt
                </th>
                <th id="theader" scope="col" class="px-6 py-3">
                  Unposted Issuance
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b"
                v-for="trans in scope.transactionList"
              >
                <!-- <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
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
                <td id="tdetail" class="px-6 py-4">{{ trans.PalletId }}</td>
                <td id="tdetail" class="px-6 py-4">{{ trans.PalletDesc }}</td>
                <td id="tdetail" class="px-6 py-4">
                  {{ trans.QuantityOnHand }}
                </td>
                <td id="tdetail" class="px-6 py-4">
                  {{ trans.TotalContracted }}
                </td>
                <td id="tdetail" class="px-6 py-4">
                  {{ trans.UnpostedReceipt }}
                </td>
                <td id="tdetail" class="px-6 py-4">
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
          id="mobile-view"
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div
            v-for="trans in scope.transactionList"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-3"
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
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Edit
              </button>
              <button
                v-show="scope.canDelete"
                @click="onDelete(shipper.Id)"
                class="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
