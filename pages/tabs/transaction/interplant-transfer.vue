<template>
  <IonPage>
    <ion-content>
      <div class="p-4">
        <ion-card-title>{{ scope.titleform }}</ion-card-title>
        <div class="p-4 h-[80vh] overflow-y-auto">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="customer"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Customer <span class="text-red-500">*</span></label
              >
              <select
                v-model="trans.shipperId"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option v-for="s in scope.supplierOptions" :value="s.value">
                  {{ s.text }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="trucker"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Trucker <span class="text-red-500">*</span></label
              >
              <select
                v-model="trans.trucker"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option v-for="t in scope.truckersOptions" :value="t.value">
                  {{ t.text }}
                </option>
              </select>
            </div>

            <!-- <div>
              <label
                for="transactiontype"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Transaction Type <span class="text-red-500">*</span></label
              >
              <select
                v-model="trans.transcode"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option
                  v-for="t in scope.transactiontypeOptions"
                  :value="t.value"
                >
                  {{ t.text }}
                </option>
              </select>
            </div> -->
            <div>
              <label
                for="reference1"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Ref # <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                id="reference1"
                v-model="trans.referenceno"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="reference2"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Order # <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                id="reference2"
                v-model="trans.orderno"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>

            <div>
              <label
                for="reference3"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Doc #
              </label>
              <input
                id="reference3"
                type="text"
                v-model="trans.documentno"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="reference4"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Invoice #
              </label>
              <input
                id="reference4"
                type="text"
                v-model="trans.invoiceno"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="refdate"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Ref Date <span class="text-red-500">*</span></label
              >
              <!-- <input
                type="date"
                id="refdate"
                v-model="trans.referencedate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                placeholder="Flowbite"
                required
              /> -->
              <VueDatePicker
                v-model="trans.referencedate"
                :auto-position="false"
                :teleport="true"
                :enable-time-picker="false"
                auto-apply
              ></VueDatePicker>
            </div>

            <div>
              <label
                for="orderDate"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Order Date <span class="text-red-500">*</span>
              </label>
              <!-- <input
                id="orderDate"
                type="date"
                v-model="trans.orderdate"
                class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                placeholder=""
                required
              /> -->
              <VueDatePicker
                v-model="trans.orderdate"
                :auto-position="false"
                :teleport="true"
                :enable-time-picker="false"
                auto-apply
              ></VueDatePicker>
            </div>
            <div>
              <label
                for="deliveryDate"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Delivery Date <span class="text-red-500">*</span>
              </label>
              <!--  <input
                id="deliveryDate"
                type="date"
                v-model="trans.deliverydate"
                class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                placeholder=""
                required
              /> -->
              <VueDatePicker
                v-model="trans.deliverydate"
                :auto-position="false"
                :teleport="true"
                :enable-time-picker="false"
                auto-apply
              ></VueDatePicker>
            </div>
            <div>
              <label
                for="remarks"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Remarks
              </label>
              <textarea
                id="renarks"
                rows="4"
                v-model="trans.remarks"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your remarks here..."
              ></textarea>
            </div>
          </div>
          <div class="mt-5 overflow-auto rounded-lg shadow">
            <label
              for="Pallet"
              class="p-3 block mb-2 font-medium text-lg text-gray-900"
            >
              ITEM
            </label>

            <div class="p-4">
              <button
                type="button"
                @click="onSearchItem()"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Add Pallet
              </button>
              <!-- Main modal -->
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
                    <div
                      class="flex items-start justify-between p-4 border-b rounded-t"
                    >
                      <h3 class="text-xl font-semibold text-gray-900">
                        Add Pallets
                      </h3>
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
                    <div class="p-6 space-y-6 overflow-y-auto">
                      <div class="flex items-center gap-10 mb-4">
                        <label
                          for="default-search"
                          class="mb-2 text-gray-900 font-medium text-lg"
                          >Location:</label
                        >

                        <select
                          v-model="scope.selectedlocation"
                          @change="onGetItembyLocation()"
                          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                          <option selected disabled value="">
                            Select a location to view items.
                          </option>
                          <option
                            v-for="t in scope.locationOptions"
                            :value="t.value"
                          >
                            {{ t.text }}
                          </option>
                        </select>
                      </div>
                      <span class="font-medium text-lg">Select Item: </span>
                      <div
                        v-if="
                          scope.itemMasterList &&
                          scope.itemMasterList.length > 0
                        "
                      >
                        <div
                          v-for="itm in scope.itemMasterList"
                          :key="itm.PalletCode"
                          @click="onItemSelect(itm)"
                          v-show="!alreadyExist(itm.PalletCode)"
                          class="relative w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-3"
                        >
                          <div class="flex items-center">
                            <div class="mr-2">
                              <!-- Checkbox -->
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                :checked="itm.isSelected"
                                v-model="itm.isSelected"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                              />
                            </div>
                            <div id="default-checkbox">
                              <div>
                                <label for="temp"
                                  >Pallet Code: {{ itm.PalletCode }}</label
                                >
                              </div>
                              <div>
                                <label for="temp"
                                  >Description:
                                  {{ itm.PalletDescription }}</label
                                >
                              </div>
                              <div>
                                <label for="temp"
                                  >Available Qty: {{ itm.AvailableQty }}</label
                                >
                              </div>
                              <div>
                                <label for="temp"
                                  >UOM: {{ itm.UnitOfMeasure }}</label
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else-if="
                          scope.itemMasterList === undefined ||
                          (scope.itemMasterList &&
                            scope.itemMasterList.length === 0)
                        "
                        class="flex justify-center items-center"
                      >
                        <span class="font-medium text-lg"
                          >No available item.</span
                        >
                      </div>
                    </div>
                    <!-- Modal footer -->
                    <div
                      class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b"
                    >
                      <button
                        type="button"
                        @click="onAddSelectedPallet()"
                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      >
                        Add
                      </button>
                      <button
                        @click="hideModal()"
                        type="button"
                        class="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- if the screen is wide or desktop view -->
            <div class="mt-3 overflow-auto rounded-lg shadow hidden md:block">
              <table class="w-full text-sm text-left rtl:text-right rounded-lg">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Action</th>
                    <th scope="col" class="px-6 py-3">Location</th>
                    <th scope="col" class="px-6 py-3">Pallet Code</th>
                    <th scope="col" class="px-6 py-3">Pallet Description</th>
                    <th scope="col" class="px-6 py-3">UOM</th>
                    <th scope="col" class="px-6 py-3">Available Qty</th>
                    <th scope="col" class="px-6 py-3">Qty Served</th>
                    <th scope="col" class="px-6 py-3">Remarks</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    class="bg-white"
                    v-for="(pallet, index) in trans.invty_transdtl"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <!-- Delete Button and Tooltip -->
                      <div class="relative inline-block">
                        <button
                          @mouseover="tooltips = true"
                          @mouseleave="tooltips = false"
                          class="bg-red-500 rounded-lg p-1 ml-3 text-white hover:bg-red-300"
                          @click="onDelete(index)"
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
                        <div
                          v-if="tooltips"
                          class="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg"
                          :style="{
                            left: '50%',
                            transform: 'translateX(-50%)',
                          }"
                        >
                          Delete
                        </div>
                      </div>
                      <!--   <button
                        @click="onDelete(index)"
                        class="bg-red-500 rounded-lg p-1 ml-3"
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
                      </button> -->
                    </th>

                    <td class="p-3 text-sm text-gray-700">
                      {{ pallet.destination }}
                    </td>
                    <td class="p-3 text-sm text-gray-700">
                      {{ pallet.itemId }}
                    </td>
                    <td class="p-3 text-sm text-gray-700">
                      {{ pallet.itemdesc }}
                    </td>
                    <td class="p-3 text-sm text-gray-700">
                      {{ pallet.uom }}
                    </td>
                    <td class="p-3 text-sm text-gray-700">
                      {{ pallet.AvailableQty }}
                    </td>
                    <td class="p-3 text-sm text-gray-700">
                      <input
                        type="number"
                        id="QtyServed"
                        v-model="pallet.qtyserved"
                        @change="onCheckQtyTrans(pallet)"
                        class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder=""
                        required
                      />
                    </td>
                    <td class="p-3 text-sm text-gray-700">
                      <input
                        type="text"
                        id="remarks"
                        v-model="pallet.remarks"
                        class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder=""
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- This when app is mobile view -->
            <div class="p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100">
              <div
                class="bg-white p-4 rounded-lg shadow"
                v-for="(pallet, index) in trans.invty_transdtl"
                :key="index"
              >
                <div class="flex justify-between">
                  <label for="destination"
                    >Location: {{ pallet.destination }}</label
                  >
                  <button @click="onDelete(index)">
                    <svg
                      class="w-6 h-6 text-red-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div>Code: {{ pallet.itemId }}</div>
                <div>
                  <label for="description"
                    >Description: {{ pallet.itemdesc }}</label
                  >
                </div>
                <div>
                  <label for="uom">UOM: {{ pallet.uom }}</label>
                </div>
                <div>
                  <label for="availableqty"
                    >Available Qty: {{ pallet.AvailableQty }}</label
                  >
                </div>
                <!-- Qty -->
                <div>
                  Qty Served: <span class="text-red-500">*</span>
                  <input
                    type="number"
                    id="QtyServed"
                    v-model="pallet.qtyserved"
                    @change="onCheckQtyTrans(pallet)"
                    class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  Remarks:
                  <input
                    type="text"
                    id="remarks"
                    v-model="pallet.remarks"
                    class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder=""
                    required
                  />
                </div>
              </div>
            </div>
            *
          </div>

          <div class="mt-3 flex justify-end">
            <button
              type="submit"
              v-if="scope.isEdit"
              @click="onBack"
              class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Back
            </button>
            <button
              type="submit"
              :disabled="isClick"
              @click="onSave('P')"
              class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              {{ isClick ? "Please wait..." : "Save And Post" }}
            </button>
            <button
              type="submit"
              :disabled="isClick"
              @click="onSave('O')"
              class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              {{ isClick ? "Please wait..." : "Save" }}
            </button>
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { isClick } from "~/dashboard/store";

const scope = reactive({});
scope.selectedlocation = "";

const pltSearch = ref();
const supplierOptions = []; // Your options data here
const trans = reactive({});
const ionRouter = useIonRouter();
const showModal = ref(false);

trans.deliverydate = new Date();
trans.orderdate = new Date();
trans.referencedate = new Date();
scope.trnscde = getCookie("transid");
const tooltips = ref(false);
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

/*search item*/
const onSearchItem = () => {
  showModal.value = true;
};

const hideModal = () => {
  showModal.value = false;
};

const onBack = () => {
  ionRouter.replace("/tabs/transaction/interplant-transfer-posting");
};

const onSave = async (p) => {
  const haserror = onValidation();

  if (haserror) {
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Confirm!",
    heightAuto: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        isClick.value = true;

        trans.warehouseId = JSON.parse(localStorage.getItem("_102")).sitecode;
        trans.created_by = JSON.parse(
          decrypt(localStorage.getItem("_214"))
        ).fullname;
        trans.status = p;
        trans.transtype = "O";
        trans.transcode = "OUT03";

        // Save to API using Axios
        const response = await serviceApi().post(
          `Pallet/post-multi-trans`,
          trans,
          {
            headers: {
              "Content-Type": "application/json", // Specify the content type
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
            },
          }
        );

        if (response.status == 200) {
          if (!response.hasError) {
            if (p === "P") {
              Toast.fire({
                title: "Success!",
                text: "Successfully saved and posted.",
                icon: "success",
              });
            } else {
              Toast.fire({
                title: "Success!",
                text: "Successfully saved.",
                icon: "success",
              });
            }

            isClick.value = false;
          } else {
            Toast.fire({
              title: "Error:",
              text: response.errorMessage,
              icon: "error",
            });
            isClick.value = false;
          }
          if (scope.isEdit) {
            ionRouter.replace("/tabs/transaction/interplant-transfer-posting");
          }
          for (const key in trans) {
            trans[key] = null;
          }

          trans.deliverydate = new Date();
          trans.orderdate = new Date();
          trans.referencedate = new Date();
          isClick.value = false;
        } else {
          Swal.fire("Error Encounter!", `${response.data}`, "error");
          console.error(response.data);
          isClick.value = false;
        }
      } catch (error) {
        console.error(error);
        isClick.value = false;
      }
    }
  });
};

//Add selected Pallet
const onAddSelectedPallet = () => {
  if (trans.invty_transdtl === undefined || trans.invty_transdtl === null) {
    trans.invty_transdtl = [];
  }

  scope.itemMasterList.forEach((item) => {
    if (item.isSelected === true) {
      const newItem = {
        itemId: item.PalletCode,
        itemdesc: item.PalletDescription,
        uom: item.UnitOfMeasure,
        qtytrans: 0,
        qtyserved: 0,
        AvailableQty: item.AvailableQty,
        destination: scope.selectedlocation,
      };

      trans.invty_transdtl.push(newItem);

      item.isSelected = false;
    }
  });
  console.log(trans.invty_transdtl);
  showModal.value = false;
};

const onGetItembyLocation = async () => {
  scope.itemMasterList = [];
  const response = await serviceApi().get(
    "pallet/get-inbound-item/?location=" +
      scope.selectedlocation +
      "&sitecode=" +
      JSON.parse(localStorage.getItem("_102")).sitecode,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (!response.hasError) {
    var resData = response.data.data;
    for (var i in resData) {
      scope.itemMasterList.push({
        isSelected: false,
        PalletCode: resData[i].PalletCode,
        PalletDescription: resData[i].PalletDescription,
        AvailableQty: resData[i].qtyAvailable,
        UnitOfMeasure: resData[i].UnitOfMeasure,
        AvailableQty: resData[i].qtyAvailable,
      });
    }
  } else {
    Toast.fire({
      title: "Error",
      text: response.errorMessage,
      icon: "error",
    });
  }
};

const alreadyExist = (palletcode) => {
  return (
    trans.invty_transdtl &&
    Array.isArray(trans.invty_transdtl) &&
    trans.invty_transdtl.some((item) => item.itemId === palletcode)
  );
};

const onItemSelect = (p) => {
  if (p.isSelected) {
    trans.itemdesc = "";
    trans.itemid = "";
    p.isSelected = false;
  } else {
    trans.itemdesc = p.PalletDescription;
    trans.itemid = p.PalletCode;
    p.isSelected = true;
  }
};

const onDelete = (index) => {
  trans.invty_transdtl.splice(index, 1);
};

async function getIncomingTransTyps() {
  try {
    var sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;

    // initialize module add/edit
    if (!scope.trnscde) {
      scope.iconform = "glyphicons glyphicons-circle_plus";
      scope.titleform = "New Inter-Plant";
    } else {
      scope.iconform = "glyphicon glyphicon-edit";
      scope.titleform = "Update Inter-Plant";
      scope.isEdit = true;
      await onGetItemUpdate(scope.trnscde);
    }

    // get trans type
    // const transTypeResponse = await serviceApi().get(
    //   `pallet/get-pallet-location/`+sitecode+ ',100,1',
    //   {
    //     headers: {
    //       Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
    //     },
    //   }
    // );
    // console.log(transTypeResponse);
    // scope.location = transTypeResponse.data.data.data;
    // scope.transcodeList = transTypeResponse.data;
    // scope.transactiontypeOptions = scope.transcodeList.map((item) => ({
    //   value: item.master_key,
    //   text: item.description,
    // }));

    // get location
    const locationResponse = await serviceApi().get(
      `pallet/get-pallet-location/?sitecode=${sitecode}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );

    scope.location = locationResponse.data;
    scope.locationOptions = scope.location.map((item) => ({
      value: item.Location,
      text: item.LocationDescription,
    }));

    // get Supplier
    const supplierResponse = await serviceApi().get(
      `pallet/get-pallet-shipper-interplant/${sitecode}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    if (!supplierResponse.data.hasError) {
      scope.supplier = supplierResponse.data.data;
      scope.supplierOptions = scope.supplier.map((item) => ({
        value: item.Id,
        text: item.Name,
      }));
    } else {
      Toast.fire({
        title: "Error",
        text: supplierResponse.data.errorMessage,
        icon: "error",
      });
    }

    // get Trucker
    const truckerResponse = await serviceApi().get(
      `wfms/get-active-trucker/?appname=PISO&brancode=${sitecode}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    scope.truckers = truckerResponse.data;
    scope.truckersOptions = scope.truckers.map((item) => ({
      value: item.fleetownerId,
      text: item.ownername,
    }));

    // if (scope.trnscde !== "") {
    //   scope.trans.trucker = scope.trans.trucker;
    // }
  } catch (error) {
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }
}

async function onGetItemUpdate(id) {
  try {
    const response = await serviceApi().get(
      `pallet/get-trans-details/?transId=${id}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );
    //trans = response.data.data;
    if (response.status === 200) {
      Object.assign(trans, response.data.data);
      trans.referencedate = format(new Date(trans.referencedate), "yyyy-MM-dd");
      trans.orderdate = format(new Date(trans.orderdate), "yyyy-MM-dd");
      trans.deliverydate = format(new Date(trans.deliverydate), "yyyy-MM-dd");

      removeCookie("transid");
    }
    // Additional logic if needed
  } catch (error) {
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
    //HttpErrorService.getStatus(error.response.status, error.response.data);
    // Handle errors or show a message as needed
  }
}

const onCheckQtyTrans = (p) => {
  var p1 = p.AvailableQty;
  var p2 = p.qtyserved;
  if (p1 < p2) {
    Toast.fire({
      title: "The quantity you enter is greater than available quantity!",
      icon: "warning",
    });
    p.qtyserved = 0;
  }
};

function onValidation() {
  var hasError = false;
  const name = ref("");
  if (trans.shipperId === "" || trans.shipperId === undefined) {
    hasError = true;
    name.value = "Supplier";
  } else if (trans.trucker === "" || trans.trucker === undefined) {
    hasError = true;
    name.value = "Trucker";
  } else if (trans.referenceno === "" || trans.referenceno === undefined) {
    hasError = true;
    name.value = "Reference 1";
  } else if (trans.orderno === "" || trans.orderno === undefined) {
    hasError = true;
    name.value = "Order #";
  } else if (trans.referencedate === "" || trans.referencedate === undefined) {
    hasError = true;
    name.value = "Reference Date";
  } else if (trans.orderdate === "" || trans.orderdate === undefined) {
    hasError = true;
    name.value = "Order Date";
  } else if (trans.deliverydate === "" || trans.deliverydate === undefined) {
    hasError = true;
    name.value = "Delivery Date";
  }

  if (hasError) {
    Toast.fire({
      title: `${name.value} is required!`,
      icon: "warning",
    });
    return hasError;
  }

  if (
    trans.invty_transdtl === undefined ||
    trans.invty_transdtl === null ||
    trans.invty_transdtl.length === 0
  ) {
    Toast.fire({
      title: "Please add at least one pallet!",
      icon: "warning",
    });
    hasError = true;
  }

  for (var i = 0; i < trans.invty_transdtl.length; i++) {
    if (trans.invty_transdtl[i].qtyserved <= 0) {
      Toast.fire({
        title: "Please Check the Quantity",
        icon: "warning",
      });
      hasError = true;
      break;
    }
  }

  return hasError;
}

onMounted(() => {
  getIncomingTransTyps();
});
</script>
