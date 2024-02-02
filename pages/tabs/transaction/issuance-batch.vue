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
                for="customer"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Customer <span class="text-red-500">*</span></label
              >
              <select
                v-model="trans.shipperId"
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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="t in scope.truckersOptions" :value="t.value">
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
                for="transactiontype"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Transaction Type <span class="text-red-500">*</span></label
              >
              <select
                v-model="trans.transcode"
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
                          >Location</label
                        >

                        <select
                          v-model="scope.selectedlocation"
                          @change="onGetItembyLocation()"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option
                            v-for="t in scope.locationOptions"
                            :value="t.value"
                          >
                            {{ t.text }}
                          </option>
                        </select>
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
                    <!-- Modal footer -->
                    <div
                      class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
                    >
                      <button
                        type="button"
                        @click="onAddSelectedPallet()"
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
                v-for="pallet in trans.invty_transdtl"
              >
                <div>
                  <label for="destination"
                    >Location: {{ pallet.destination }}</label
                  >
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
                    class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
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

/*search item*/
const onSearchItem = () => {
  showModal.value = true;
};

const hideModal = () => {
  showModal.value = false;
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
        trans.warehouseId = JSON.parse(localStorage.getItem("_102")).sitecode;
        trans.created_by = JSON.parse(localStorage.getItem("_214")).fullname;
        trans.status = p;
        trans.transtype = "O";

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
          if (!response.hasError) {
            Toast.fire({
              title: "Success!",
              text: "Inbound Transaction Save Complete.",
              icon: "success",
            });
          } else {
            Toast.fire({
              title: "Error:",
              text: response.errorMessage,
              icon: "error",
            });
          }
          trans.invty_transdtl = [];
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
        AvailableQty: item.AvailableQty,
        destination: scope.selectedlocation,
      };

      trans.invty_transdtl.push(newItem);

      item.isSelected = false;
    }
  });
  console.log(trans.invty_transdtl);
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
        Token: JSON.parse(localStorage.getItem("_214")).token,
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

async function getIncomingTransTyps() {
  try {
    var sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;

    // initialize module add/edit
    if (scope.trnscde === "" || scope.trnscde === undefined) {
      scope.iconform = "glyphicons glyphicons-circle_plus";
      scope.titleform = "New Issuance";
    } else {
      scope.iconform = "glyphicon glyphicon-edit";
      scope.titleform = "Update Issuance";
      scope.isEdit = true;
      await onGetItemUpdate(scope.trnscde);
    }

    // get trans type
    const transTypeResponse = await serviceApi().get(
      `pallet/get-trans-type/?code=outgoing`,
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
      `pallet/get-pallet-shipper-type/${sitecode},O`,
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
  if (trans.shipperId === "" || trans.shipperId === undefined) {
    hasError = true;
  }

  if (trans.trucker === "" || trans.trucker === undefined) {
    hasError = true;
  }

  if (trans.referenceno === "" || trans.referenceno === undefined) {
    hasError = true;
  }

  if (trans.transcode === "" || trans.transcode === undefined) {
    hasError = true;
  }

  if (trans.referencedate === "" || trans.referencedate === undefined) {
    hasError = true;
  }

  if (trans.orderdate === "" || trans.orderdate === undefined) {
    hasError = true;
  }

  if (trans.deliverydate === "" || trans.deliverydate === undefined) {
    hasError = true;
  }

  if (hasError) {
    Toast.fire({
      title: "Please fill all required required fields!",
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

  return hasError;
}

onMounted(() => {
  getIncomingTransTyps();
});
</script>
