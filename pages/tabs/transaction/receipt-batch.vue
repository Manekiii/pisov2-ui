<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card class="p-4">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="supplier"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Supplier</label
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
              >Trucker</label
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
              >Reference 1</label
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
              >Transaction Type</label
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
              >Ref Date</label
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
import Swal from "sweetalert2";

const scope = reactive({});

const supplierOptions = []; // Your options data here

const trans = reactive({});

const ChangeSupplier = () => {
  // Your change handler logic here
};

async function getIncomingTransTyps() {
  try {
    var sitecode = JSON.parse(localStorage.getItem("_102")).sitecode;

    // initialize module add/edit
    if (scope.trnscde === "") {
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
      console.log("Error: " + supplierResponse.data.errorMessage);
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

    if (scope.trnscde !== "") {
      scope.trans.trucker = scope.trans.trucker;
    }
  } catch (error) {
    console.error("Error:", error.message);
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
    scope.trans = response.data;
    scope.trans.referencedate = $filter("date")(
      new Date(scope.trans.referencedate),
      "MM/dd/yyyy"
    );
    scope.trans.orderdate = $filter("date")(
      new Date(scope.trans.orderdate),
      "MM/dd/yyyy"
    );
    scope.trans.deliverydate = $filter("date")(
      new Date(scope.trans.deliverydate),
      "MM/dd/yyyy"
    );

    // Additional logic if needed
  } catch (error) {
    console.error("Error:", error.message);
    //HttpErrorService.getStatus(error.response.status, error.response.data);
    // Handle errors or show a message as needed
  }
}

const onSave = async (p) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Confirm!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        trans.warehouseId = JSON.parse(localStorage.getItem("_102")).sitecode;
        trans.created_by = JSON.parse(localStorage.getItem("_214")).fullname;
        trans.status = p;
        trans.transtype = "I";

        // Save to API using Axios
        const response = await serviceApi().post(
          `/api/Pallet/post-multi-trans`,
          trans,
          {
            headers: {
              Token: JSON.parse(localStorage.getItem("_214")).token,
            },
          }
        );

        if (response.status == 200) {
          if (p === "P") {
            Swal.fire(
              "Success!",
              "Your data has been saved and posted.",
              "success"
            );
          } else {
            Swal.fire("Success!", "Your data has been saved.", "success");
          }
          clearTransFields();
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

onMounted(() => {
  getIncomingTransTyps();
});
</script>
