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
            class="font-semibold text-3xl block mb-2 text-gray-900"
          >
            Interplant Batch Report
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
        </div>
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
                <th scope="col" class="px-6 py-3">Action</th>
                <th scope="col" class="px-6 py-3">Trans #</th>
                <th scope="col" class="px-6 py-3">Shipper</th>
                <th scope="col" class="px-6 py-3">Document#</th>
                <th scope="col" class="px-6 py-3">Ref#</th>
                <th scope="col" class="px-6 py-3">Invoice#</th>
                <th scope="col" class="px-6 py-3">Order</th>
                <th scope="col" class="px-6 py-3">Order Date</th>
                <th scope="col" class="px-6 py-3">Ref Date</th>
                <th scope="col" class="px-6 py-3">Delivery Date</th>
                <th scope="col" class="px-6 py-3">Remarks</th>
                <th scope="col" class="px-6 py-3">Total Item</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b"
                v-for="trans in scope.transactionList"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <div>
                    <button
                      class="bg-blue-500 rounded-lg p-2 text-white"
                      @click="onViewReport(trans.transhdrId)"
                    >
                      Preview
                    </button>
                  </div>
                </th>
                <td class="px-6 py-4">{{ trans.transhdrId }}</td>
                <td class="px-6 py-4">{{ trans.shippername }}</td>
                <td class="px-6 py-4">{{ trans.documentno }}</td>
                <td class="px-6 py-4">{{ trans.referenceno }}</td>
                <td class="px-6 py-4">{{ trans.invoiceno }}</td>
                <td class="px-6 py-4">{{ trans.orderno }}</td>
                <td class="px-6 py-4">{{ trans.orderdate }}</td>
                <td class="px-6 py-4">{{ trans.referencedate }}</td>
                <td class="px-6 py-4">{{ trans.deliverydate }}</td>
                <td class="px-6 py-4">
                  {{ trans.remarks }}
                </td>
                <td class="px-6 py-4">
                  {{ totalItemServe(trans.invty_transdtl) }}
                </td>
              </tr>
            </tbody>
          </table>
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
              <label for="orderNumber">Shipper: {{ trans.shippername }}</label>
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
    </ion-content>
    <!-- Main modal DateFilter-->
    <div
      v-if="showModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 w-full h-full p-4 flex items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-900 opacity-50"></div>
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t">
            <h3 class="text-xl font-semibold text-gray-900">Filter</h3>
            <button
              @click="hideModal()"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-2 overflow-y-auto max-h-[60vh]">
            <div class="grid gap-6 md:grid-cols-1">
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Data From</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                      />
                    </svg>
                  </div>
                  <!-- <input
                    name="start"
                    type="date"
                    v-model="scope.dtefrom"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   "
                    placeholder="Select date start"
                  /> -->
                  <VueDatePicker
                    v-model="scope.dtefrom"
                    :auto-position="false"
                    :teleport="true"
                    :enable-time-picker="false"
                    auto-apply
                  ></VueDatePicker>
                </div>
              </div>

              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Data To</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                      />
                    </svg>
                  </div>
                  <!-- <input
                    name="end"
                    type="date"
                    v-model="scope.dteto"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   "
                    placeholder="Select date end"
                  /> -->
                  <VueDatePicker
                    v-model="scope.dteto"
                    :auto-position="false"
                    :teleport="true"
                    :enable-time-picker="false"
                    auto-apply
                  ></VueDatePicker>
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
              class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
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
    "pallet/get-transaction-header-interplant/?sitecode=" +
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
    title: "Interplant Batch Report",
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
</style>
