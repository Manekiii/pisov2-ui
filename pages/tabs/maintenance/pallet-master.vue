<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div>
        <div class="border-2 items-center justify-center flex">
          <label
            for="title"
            class="font-semibold text-3xl block mb-2 text-gray-900 dark:text-white"
          >
            Pallet Master
          </label>
        </div>
        <div class="mt-4 mb-4 flex justify-end">
          <button
            v-show="scope.canAdd"
            @click="onNewItem()"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            New
          </button>
        </div>

        <div
          class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
        >
          <div
            v-for="item in scope.itemList"
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
          >
            <div>
              <label for="transactionNumber"
                >Pallet Code: {{ item.PalletCode }}</label
              >
            </div>
            <div>
              <label for="orderNumber"
                >Description: {{ item.PalletDescription }}</label
              >
            </div>

            <div>
              <label for="orderNumber">UOM: {{ item.UnitOfMeasure }}</label>
            </div>
            <div>
              <label for="orderNumber"
                >Total Contracted: {{ item.totalcontracted }}</label
              >
            </div>
            <div>
              <label for="createdBy">Created By: {{ item.CreatedBy }}</label>
            </div>
            <div>
              <label for="deliveryDate"
                >Created Date:
                {{
                  format(new Date(item.CreateDate), "yyyy-MM-dd hh:mm:ss")
                }}</label
              >
            </div>
            <div class="bg-black h-px"></div>
            <div>
              <label for="modifiedDate">Modified Date: </label>
            </div>

            <div class="flex items-center justify-end">
              <button
                v-show="scope.canEdit"
                @click="onEditItemMaster(item.PalletCode)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                v-show="scope.canDelete"
                @click="onDeleteItem(item.PalletCode)"
                class="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main modal Add/Edit-->
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
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Item Master
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
            <div class="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="storageid"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Item ID</label
                  >
                  <input
                    type="text"
                    id="storageid"
                    v-model="setup.itemid"
                    :disabled="scope.isEdit"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Storage Id"
                    required
                  />
                </div>
                <div>
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Item Desc.</label
                  >
                  <input
                    type="text"
                    id="description"
                    v-model="setup.itemdesc"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Description"
                    required
                  />
                </div>
                <div>
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Unit of Measure</label
                  >
                  <input
                    type="text"
                    id="description"
                    v-model="setup.uom"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Description"
                    required
                  />
                </div>
                <div>
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Shelf life</label
                  >
                  <input
                    type="number"
                    id="visitors"
                    v-model="setup.shelflife"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Total Contracted</label
                  >
                  <input
                    type="number"
                    id="visitors"
                    v-model="setup.totalcontracted"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    for="remember"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >IsActive
                  </label>
                </div>
              </div>
            </div>
            <!-- Modal footer -->
            <div
              class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <button
                @click="onSaveItem()"
                type="button"
                class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save
              </button>
              <button
                @click="hideModal()"
                type="button"
                class="text-white bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
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

const scope = reactive({});
const setup = reactive({});
const showModal = ref(false);
const sitecode = JSON.parse(
  localStorage.getItem("_102")
).sitecode; /*set sidecode*/
const userFullname = JSON.parse(
  localStorage.getItem("_214")
).fullname; /*set userfullname*/
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.menuId = "pallet-master";

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

const hideModal = () => {
  showModal.value = false;
};

const onInit = async (ipage) => {
  scope.currentPage = ipage;
  const response = await serviceApi().get(
    "pallet/get-pallet-item-master/?sitecode=" +
      sitecode +
      "&status=&take=" +
      scope.itemsPerPage +
      "&page=" +
      ipage,
    {
      headers: {
        Token: JSON.parse(localStorage.getItem("_214")).token,
      },
    }
  );

  if (response.status === 200) {
    scope.itemList = response.data.data.data;
    scope.total_count = response.data.data.total_count;
  }

  onInitMenu();
};

const onInitMenu = async () => {
  const userId = JSON.parse(localStorage.getItem("_214")).userid;
  const params = scope.menuId + "," + userId;

  try {
    const response = await serviceApi().get(
      `user/get-user-menu-list/${params}`,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
        },
      }
    );
    scope.canAdd = response.data.canadd;
    scope.canEdit = response.data.canedit;
    scope.canDelete = response.data.candelete;
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
  }
};

const onEditItemMaster = (p) => {
  var newItemLIst = scope.itemList;

  var itemDtl = newItemLIst.filter(function (item) {
    return item.PalletCode == p;
  })[0];
  scope.isEdit = true;
  scope.isError = false;
  scope.isSuccess = false;
  setup.itemid = itemDtl.PalletCode;
  setup.itemdesc = itemDtl.PalletDescription;
  setup.uom = itemDtl.UnitOfMeasure;
  setup.status = itemDtl.Status == "A" ? true : false;
  setup.totalcontracted = itemDtl.totalcontracted;

  showModal.value = true;
};

const onDeleteItem = (p) => {
  scope.isError2 = false;
  scope.isSuccess2 = false;
  Swal.fire({
    title: `Want to remove <strong>Pallet Code: ${p}</strong>?`,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    heightAuto: false,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        scope.menuid = p;
        const response = await serviceApi().get(
          "pallet/remove-pallet-item-master/" + scope.menuid,
          {
            headers: {
              Token: JSON.parse(localStorage.getItem("_214")).token,
            },
          }
        );
        if (response.status === 200) {
          scope.isError2 = false;
          scope.isSuccess2 = true;
          scope.successMessage2 = "Delete complete..";
          Toast.fire({
            title: "Success",
            text: scope.successMessage2,
            icon: "success",
          });
          onInit(scope.currentPage);
        } else {
          scope.isSuccess2 = false;
          scope.isError2 = true;
          scope.errorMessage2 = response.errorMsg;
        }
      } catch (error) {
        Toast.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    }
  });
};

const onNewItem = () => {
  Object.assign(setup, "");
  setup.itemcode = "";
  setup.shelflife = 0;
  scope.isError = false;
  scope.isSuccess = false;
  scope.isEdit = false;
  setup.totalcontracted = 0;

  showModal.value = true;
};

const onSaveItem = async () => {
  if (
    setup.itemid == null ||
    setup.itemid == undefined ||
    setup.itemdesc == null ||
    setup.itemdesc == undefined ||
    setup.uom == null ||
    setup.uom == undefined
  ) {
    scope.isError = true;
    scope.isSuccess = false;
    scope.errorMessage =
      "Item ID, Item Description & Unit of Measure is Required";
    Toast.fire({
      title: scope.errorMessage,
      icon: "warning",
    });
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
        setup.itemtype = "PALLET";
        setup.storageid = "PALLET";
        setup.created_by = userFullname;
        setup.status = setup.status ? "A" : "I";
        setup.warehouseId = sitecode;
        const response = await serviceApi().post(
          "pallet/post-pallet-item-master/",
          setup,
          {
            headers: {
              Token: JSON.parse(localStorage.getItem("_214")).token,
            },
          }
        );
        if (!response.hasError) {
          scope.isError = false;
          scope.isSuccess = true;
          scope.successMessage = "Item Master Save Complete";
          showModal.value = false;
          onInit(scope.currentPage);
        } else {
          scope.isError = true;
          scope.isSuccess = false;
          scope.errorMessage = response.errorMessage;
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
};

onMounted(() => {
  onInit(1);
});
</script>
