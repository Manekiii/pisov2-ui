<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- <div id="loadingindicator" class="hidden">
        <LoadingIndicator />
      </div> -->
      <div>
        <div class="border-2 items-center justify-center flex p-2">
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

        <!-- WEB -->
        <div class="hidden md:block">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Action</th>
                <th scope="col" class="px-6 py-3">Pallet Code</th>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3">UOM</th>
                <th scope="col" class="px-6 py-3">Total Contracted</th>
                <th scope="col" class="px-6 py-3">Created By</th>
                <th scope="col" class="px-6 py-3">Created Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="item in scope.itemList"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div>
                    <button
                      class="bg-blue-500 rounded-lg p-1 mr-3"
                      v-show="scope.canEdit"
                      @click="onEditItemMaster(item.PalletCode)"
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
                      class="bg-red-500 rounded-lg p-1"
                      v-show="scope.canDelete"
                      @click="onDeleteItem(item.PalletCode)"
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
                  </div>
                </th>
                <td class="px-6 py-4">{{ item.PalletCode }}</td>
                <td class="px-6 py-4">{{ item.PalletDescription }}</td>
                <td class="px-6 py-4">{{ item.UnitOfMeasure }}</td>
                <td class="px-6 py-4">{{ item.totalcontracted }}</td>
                <td class="px-6 py-4">{{ item.CreatedBy }}</td>
                <td class="px-6 py-4">
                  {{ format(new Date(item.CreateDate), "yyyy-MM-dd hh:mm:ss") }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-4 flex justify-end">
            <svg
              class="w-6 h-6 text-gray-400"
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
            <label class="mx-2">3 out of 3</label>
            <svg
              class="w-6 h-6 text-gray-400"
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
          </div>
        </div>

        <!-- MOBILE -->
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

const handleLoading = async () => {
  document.querySelector("#loadingindicator").classList.toggle("hidden");
};

const hideModal = () => {
  showModal.value = false;
};

const onInit = async (ipage) => {
  handleLoading();
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
  handleLoading();
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
