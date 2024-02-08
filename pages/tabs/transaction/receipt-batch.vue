<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card class="p-4">
        <ion-card-title>{{ scope.titleform }}</ion-card-title>
        <div class="p-4 h-[80vh] overflow-y-auto">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="supplier"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Supplier <span class="text-red-500">*</span></label
              >
              <select
                v-model="trans.shipperId"
                @change="ChangeSupplier"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="s in scope.supplierOptions" :value="s.value">
                  {{ s.text }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="trucker"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Trucker <span class="text-red-500">*</span></label
              >
              <select
                v-model="trans.trucker"
                @change="ChangeTrucker"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="t in scope.truckersOptions" :value="t.value">
                  {{ t.text }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="transactiontype"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Transaction Type <span class="text-red-500">*</span></label
              >
              <select
                v-model="trans.transcode"
                @change="ChangeTransactionType"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option
                  v-for="t in scope.transactiontypeOptions"
                  :value="t.value"
                >
                  {{ t.text }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="reference1"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Reference 1 <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                id="reference1"
                v-model="trans.referenceno"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                for="reference2"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Reference 2</label
              >
              <input
                type="text"
                id="reference2"
                v-model="trans.orderno"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                for="reference3"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reference 3
              </label>
              <input
                id="reference3"
                type="text"
                v-model="trans.documentno"
                class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="reference4"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reference 4
              </label>
              <input
                id="reference4"
                type="text"
                v-model="trans.invoiceno"
                class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="refdate"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Ref Date <span class="text-red-500">*</span></label
              >
              <input
                type="date"
                id="refdate"
                v-model="trans.referencedate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                for="orderDate"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Order Date <span class="text-red-500">*</span>
              </label>
              <input
                id="orderDate"
                type="date"
                v-model="trans.orderdate"
                class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="deliveryDate"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Delivery Date <span class="text-red-500">*</span>
              </label>
              <input
                id="deliveryDate"
                type="date"
                v-model="trans.deliverydate"
                class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="remarks"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Remarks
              </label>
              <textarea
                id="renarks"
                rows="4"
                v-model="trans.remarks"
                class="max-w-md block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your remarks here..."
              ></textarea>
            </div>
          </div>
          <div class="mt-5 overflow-auto rounded-lg shadow">
            <label
              for="Pallet"
              class="p-3 block mb-2 font-medium text-lg text-gray-900 dark:text-white"
            >
              PALLET
            </label>

            <div class="p-4">
              <button
                type="button"
                @click="onSearchItem()"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  <div
                    class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <!-- Modal header -->
                    <div
                      class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
                    >
                      <h3
                        class="text-xl font-semibold text-gray-900 dark:text-white"
                      >
                        Choose Pallets
                      </h3>
                      <button
                        @click="hideModal()"
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                      <div>
                        <label
                          for="default-search"
                          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                          >Search</label
                        >
                        <div class="relative">
                          <div
                            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                          >
                            <svg
                              class="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            v-model="pltSearch"
                            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..."
                            required
                          />
                          <button
                            type="submit"
                            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                      <div
                        v-for="itm in scope.itemMasterList"
                        :key="itm.PalletCode"
                        @click="onItemSelect(itm)"
                        v-show="!alreadyExist(itm.PalletCode)"
                        class="relative w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
                      >
                        <div class="flex items-center">
                          <div class="mr-2">
                            <!-- Checkbox -->
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              :checked="itm.isSelected"
                              v-model="itm.isSelected"
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                                >Description: {{ itm.PalletDescription }}</label
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
                    <!-- Modal footer -->
                    <div
                      class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
                    >
                      <button
                        type="button"
                        @click="onAddSelectedPallet"
                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Add
                      </button>
                      <button
                        @click="hideModal()"
                        type="button"
                        class="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
              <table class="w-full">
                <thead class="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th
                      class="w-20 p-3 text-sm font-semibold tracking-wide text-left"
                    >
                      Pallet Code
                    </th>
                    <th
                      class="p-3 text-sm font-semibold tracking-wide text-left"
                    >
                      Pallet Description
                    </th>
                    <th
                      class="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                    >
                      UOM
                    </th>
                    <th
                      class="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                    >
                      Qty Served
                    </th>
                    <th
                      class="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                    >
                      Location
                    </th>
                    <th
                      class="w-24 p-3 text-sm font-semibold tracking-wide text-left"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr class="bg-white">
                    <td class="p-3 text-sm text-gray-700"></td>
                    <td class="p-3 text-sm text-gray-700"></td>
                    <td class="p-3 text-sm text-gray-700"></td>
                    <td class="p-3 text-sm text-gray-700"></td>
                    <td class="p-3 text-sm text-gray-700"></td>
                    <td class="p-3 text-sm text-gray-700"></td>
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
                  <div>Code: {{ pallet.itemId }}</div>
                  <button @click="onDelete(index)">
                    <svg
                      class="w-6 h-6 text-red-500 dark:text-red-500"
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
                <div>
                  <label for="description"
                    >Description: {{ pallet.itemdesc }}</label
                  >
                </div>
                <!-- Qty -->
                <div>
                  Qty Served: <span class="text-red-500">*</span>
                  <input
                    type="number"
                    id="QtyServed"
                    v-model="pallet.qtyserved"
                    class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
                <!-- Location is a dropdown with search -->
                <div>
                  Location: <span class="text-red-500">*</span>
                  <select
                    id="dropdown"
                    v-model="pallet.destination"
                    class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="--Select Supplier--"
                    required="true"
                  >
                    <option value="" disabled selected>
                      --Select Location--
                    </option>
                    <option
                      v-for="loc in scope.locationOptions"
                      :key="loc.value"
                      :value="loc.value"
                    >
                      {{ loc.text }}
                    </option>
                  </select>
                </div>
                <div>
                  Remarks:
                  <input
                    type="tel"
                    id="remarks"
                    v-model="pallet.remarks"
                    class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
              </div>
            </div>
            *
          </div>
        </div>

        <div class="mt-3 flex justify-end">
          <button
            type="submit"
            v-if="scope.isEdit"
            @click="onBack"
            class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Back
          </button>
          <button
            type="submit"
            @click="onSave('P')"
            class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save And Post
          </button>
          <button
            type="submit"
            @click="onSave('O')"
            class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </ion-card>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../../../services/piso-serviceapi";
import { format } from "date-fns";
import Swal from "sweetalert2";

const scope = reactive({});
const pltSearch = ref();
const supplierOptions = []; // Your options data here
const trans = reactive({});
const ionRouter = useIonRouter();
const showModal = ref(false);

scope.trnscde = getCookie("transid");

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

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const hideModal = () => {
  showModal.value = false;
};

const onBack = () => {
  ionRouter.replace("/tabs/transaction/receipt-batch-posting");
};

async function getIncomingTransTyps() {
  try {
    var sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;

    // initialize module add/edit
    if (scope.trnscde === "" || scope.trnscde === undefined) {
      scope.iconform = "glyphicons glyphicons-circle_plus";
      scope.titleform = "New Receipt";
    } else {
      scope.iconform = "glyphicon glyphicon-edit";
      scope.titleform = "Update Receipt";
      scope.isEdit = true;
      await onGetItemUpdate(scope.trnscde);
    }

    // get trans type
    const transTypeResponse = await serviceApi().get(
      `pallet/get-trans-type/?code=incoming`,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
        },
      }
    );
    scope.transcodeList = transTypeResponse.data;
    scope.transactiontypeOptions = scope.transcodeList.map((item) => ({
      value: item.master_key,
      text: item.description,
    }));

    // get location
    const locationResponse = await serviceApi().get(
      `pallet/get-pallet-location/?sitecode=${sitecode}`,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
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
      `pallet/get-pallet-shipper-type/${sitecode},I`,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
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
          Token: JSON.parse(localStorage.getItem("_214")).token,
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
    // HttpErrorService.getStatus(error.response.status, error.response.data);
    // $rootScope.ShowPrompt(
    //   "#modal-panel-prompt-error",
    //   "onInit: " + JSON.stringify(error.message)
    // );
  }
}

async function onGetItemUpdate(id) {
  try {
    const response = await serviceApi().get(
      `pallet/get-trans-details/?transId=${id}`,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
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

const onSave = async (p) => {
  const haserror = onValidation();

  if (haserror) {
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    heightAuto: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        trans.warehouseId = JSON.parse(localStorage.getItem("_102")).sitecode;
        trans.created_by = JSON.parse(localStorage.getItem("_214")).fullname;
        trans.status = p;
        trans.transtype = "I";

        // Save to API using Axios
        const response = await serviceApi().post(
          `Pallet/post-multi-trans`,
          trans,
          {
            headers: {
              "Content-Type": "application/json", // Specify the content type
              Token: JSON.parse(localStorage.getItem("_214")).token,
            },
          }
        );

        if (response.status == 200) {
          if (p === "P") {
            Toast.fire({
              title: "Success!",
              text: "Your data has been saved and posted.",
              icon: "success",
            });
          } else {
            Toast.fire({
              title: "Success!",
              text: "Your data has been saved.",
              icon: "success",
            });
          }

          if (scope.isEdit) {
            ionRouter.replace("/tabs/transaction/receipt-batch-posting");
          }

          for (const key in trans) {
            trans[key] = null;
          }
        } else {
          Swal.fire("Error Encounter!", `${response.data}`, "error");
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
};

const ChangeSupplier = () => {
  for (var i in scope.supplier) {
    if (scope.supplier[i].Id === trans.shipperId) {
      trans.shipperId = scope.supplier[i].Id;
      break;
    }
  }
};

const ChangeTrucker = () => {
  for (var i in scope.trucker) {
    if (scope.trucker[i].fleetownerId === trans.trucker) {
      trans.trucker = scope.trucker[i].fleetownerId;
      break;
    }
  }
};

const ChangeTransactionType = () => {
  for (var i in scope.transcodeList) {
    if (scope.transcodeList[i].master_key === trans.transcode) {
      trans.transcode = scope.transcodeList[i].master_key;
      break;
    }
  }
};

const onSearchItem = async () => {
  scope.itemMasterList = [];
  try {
    const response = await serviceApi().get(
      "pallet/get-pallet-item-master/?sitecode=" +
        JSON.parse(localStorage.getItem("_102")).sitecode +
        "&status=A&take=50&page=1",
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
        },
      }
    );

    if (!response.hasError) {
      console.log(response);
      var resData = response.data.data.data;
      for (var i in resData) {
        scope.itemMasterList.push({
          isSelected: false,
          CreateDate: resData[i].CreateDate,
          CreatedBy: resData[i].CreatedBy,
          PalletCode: resData[i].PalletCode,
          PalletDescription: resData[i].PalletDescription,
          PalletType: resData[i].PalletType,
          Status: resData[i].Status,
          UnitOfMeasure: resData[i].UnitOfMeasure,
        });
      }

      showModal.value = true;
    } else {
      console.log("Error: " + response.errorMessage);
    }
  } catch (error) {
    Toast.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }

  // .success(function (response, status, headers, config) {

  // })
  // .error(function (data, status, headers, config) {
  //   HttpErrorService.getStatus(status, data);
  // });
};

//Add selected Pallet
const onAddSelectedPallet = () => {
  if (trans.invty_transdtl === undefined) {
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
      };

      trans.invty_transdtl.push(newItem);

      item.isSelected = false;
    }
  });
  console.log(trans.invty_transdtl);
  showModal.value = false;
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

const onCreateNew = () => {
  scope.isError = false;
  scope.isSuccess = false;

  scope.itemMasterList = [];
  scope.trans = {};
  scope.trans.invty_transdtl = [];
};

function onValidation() {
  var hasError = false;
  const name = ref();
  if (trans.shipperId === "" || trans.shipperId === undefined) {
    hasError = true;
    name.value = "Supplier";
  } else if (trans.trucker === "" || trans.trucker === undefined) {
    hasError = true;
    name.value = "Trucker";
  } else if (trans.referenceno === "" || trans.referenceno === undefined) {
    hasError = true;
    name.value = "Reference 1";
  } else if (trans.transcode === "" || trans.transcode === undefined) {
    hasError = true;
    name.value = "Transcode";
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
  }

  if (trans.invty_transdtl.length === 0) {
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

  for (var j = 0; j < trans.invty_transdtl.length; j++) {
    if (
      trans.invty_transdtl[j].destination === "" ||
      trans.invty_transdtl[j].destination === undefined
    ) {
      Toast.fire({
        title: "Please Select Location",
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
