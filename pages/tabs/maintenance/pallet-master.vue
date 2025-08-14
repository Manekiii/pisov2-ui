<template>
  <IonPage>
    <div>
      <div class="border-b-2 items-center justify-center flex p-2">
        <label
          for="title"
          class="font-semibold text-3xl block mb-2 text-gray-900"
        >
          Pallet Master
        </label>
      </div>
      <div
        class="m-4 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0"
      >
        <div class="relative flex-1">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500"
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
            class="block w-full sm:w-[350px] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter"
            required
            v-model="searchQuery"
            @change=""
          />
        </div>
        <button
          v-show="scope.canAdd"
          @click="onNewItem()"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          New
        </button>
      </div>

      <!-- WEB -->
      <div class="hidden md:block h-[75vh] overflow-auto">
        <table class="w-full text-sm text-left rtl:text-right rounded-lg">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
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
              class="bg-white border-b"
              v-if="filteredLocations"
              v-for="(item, index) in filteredLocations"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <div>
                  <!-- Edit Button and Tooltip -->
                  <div class="relative inline-block">
                    <!-- Edit Button and Tooltip -->
                    <button
                      @mouseover="tooltips[index].showEdit = true"
                      @mouseleave="tooltips[index].showEdit = false"
                      class="bg-blue-500 rounded-lg p-1 text-white"
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
                    <div
                      v-if="tooltips[index].showEdit"
                      class="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg"
                      :style="{ left: '50%', transform: 'translateX(-50%)' }"
                    >
                      Edit
                    </div>
                  </div>

                  <!-- Delete Button and Tooltip -->
                  <div class="relative inline-block">
                    <button
                      @mouseover="tooltips[index].showDelete = true"
                      @mouseleave="tooltips[index].showDelete = false"
                      class="bg-red-500 rounded-lg p-1 ml-3 text-white hover:bg-red-300"
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
                    <div
                      v-if="tooltips[index].showDelete"
                      class="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg"
                      :style="{ left: '50%', transform: 'translateX(-50%)' }"
                    >
                      Delete
                    </div>
                  </div>
                  <!-- <button
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
                  </button> -->
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
            <tr v-else>
              <div class="flex justify-center items-center">
                No Pallet found.
              </div>
            </tr>
          </tbody>
        </table>
        <!-- <div class="mt-4 flex justify-end">
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
          </div> -->
      </div>

      <!-- MOBILE -->
      <div
        class="w-screen p-4 mt-3 grid grid-cols-1 gap-4 md:hidden bg-gray-100 overflow-y-auto max-h-[75vh]"
      >
        <div
          v-if="filteredLocations"
          v-for="item in filteredLocations"
          class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
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
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Edit
            </button>
            <button
              v-show="scope.canDelete"
              @click="onDeleteItem(item.PalletCode)"
              class="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Delete
            </button>
          </div>
        </div>

        <div v-else class="flex justify-center items-center">
          No Pallet found.
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
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t">
            <h3 class="text-xl font-semibold text-gray-900">Item Master</h3>
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
          <div class="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
            <!-- Presets Dropdown Search -->
            <!-- <div class="mb-6">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Presets</label
              >
              <div class="relative">
                <button
                  @click.stop="toggleDropdown"
                  class="flex items-center justify-between w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  type="button"
                >
                  <span>{{
                    selectedPreset
                      ? `${selectedPreset.itemid} - ${selectedPreset.itemdesc}`
                      : "Select an item..."
                  }}</span>
                  <svg
                    class="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                <div
                  v-if="isDropdownOpen"
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                  <div class="p-2 sticky top-0 bg-white">
                    <input
                      type="text"
                      v-model="searchTerm"
                      class="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search items..."
                      @click.stop
                    />
                  </div>

                  <ul>
                    <li
                      v-for="item in filteredItems"
                      :key="item.id"
                      @click="selectPreset(item)"
                      class="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                      :class="{ 'bg-blue-50': selectedPreset?.id === item.id }"
                    >
                      {{ item.itemid }} - {{ item.itemdesc }}
                    </li>
                    <li
                      v-if="filteredItems.length === 0"
                      class="p-2 text-sm text-gray-500"
                    >
                      No items found
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->

            <!-- Form Fields -->
            <div class="grid gap-6 mb-6 md:grid-cols-2" @click="toggleDropdown">
              <div>
                <label
                  for="storageid"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Item ID</label
                >
                <input
                  type="text"
                  id="storageid"
                  v-model="setup.itemid"
                  @input="toUpperCase('itemid')"
                  :disabled="scope.isEdit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Item ID"
                  required
                />
              </div>
              <div>
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Item Description</label
                >
                <input
                  type="text"
                  id="description"
                  v-model="setup.itemdesc"
                  @input="toUpperCase('itemdesc')"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Description"
                  required
                />
              </div>
              <div>
                <label
                  for="uom"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Unit of Measure</label
                >
                <input
                  type="text"
                  id="uom"
                  v-model="setup.uom"
                  @input="toUpperCase('uom')"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter UOM (e.g., KG, L)"
                  required
                />
              </div>
              <div>
                <label
                  for="shelflife"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Shelf Life (days)</label
                >
                <input
                  type="number"
                  id="shelflife"
                  v-model="setup.shelflife"
                  min="0"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter shelf life in days"
                  required
                />
              </div>
              <div>
                <label
                  for="totalcontracted"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Total Contracted Quantity</label
                >
                <input
                  type="number"
                  id="totalcontracted"
                  v-model="setup.totalcontracted"
                  min="0"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter contracted quantity"
                  required
                />
              </div>
              <div class="flex items-center">
                <div class="flex items-center h-5">
                  <input
                    id="status"
                    type="checkbox"
                    v-model="setup.status"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  />
                </div>
                <label
                  for="status"
                  class="ml-2 text-sm font-medium text-gray-900"
                >
                  Active
                </label>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div
            class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b"
          >
            <button
              @click="onSaveItem()"
              type="button"
              class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
            <button
              @click="hideModal()"
              type="button"
              class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
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

const scope = reactive({});
const setup = reactive({});
const showModal = ref(false);
const sitecode = JSON.parse(
  localStorage.getItem("_102")
).sitecode; /*set sidecode*/
const userFullname = JSON.parse(
  decrypt(localStorage.getItem("_214"))
).fullname; /*set userfullname*/
scope.itemsPerPage = 20;
scope.currentPage = 0;
scope.menuId = "pallet-master";
const searchQuery = ref("");
const filteredLocations = computed(() => {
  if (!searchQuery.value.trim()) return scope.itemList;
  {
    return scope.itemList.filter((item) => {
      return (
        item.PalletCode.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        item.PalletDescription.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        item.CreatedBy.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  }
});

const searchTerm = ref();

const filteredItems = computed(() => {
  return scope.presetitemList;
  /* if (!searchQuery.value.trim()) return scope.itemList;
  
  {
    return scope.itemList.filter((item) => {
      return (
        item.PalletCode.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        item.PalletDescription.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        item.CreatedBy.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  } */
});
const tooltips = ref([]);

// Initialize tooltips array with states for each item
const initializeTooltips = (length) => {
  tooltips.value = Array.from({ length }, () => ({
    showEdit: false,
    showDelete: false,
    showPost: false,
  }));
};

// Initialize tooltips when data is loaded
watch(filteredLocations, (newVal) => {
  if (newVal) {
    initializeTooltips(newVal.length);
  }
});

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
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response.status === 200) {
    scope.itemList = response.data.data.data;
    scope.total_count = response.data.data.total_count;
  }

  const response1 = await serviceApi().get(
    "pallet/get-preset-pallet-item-master/?" +
      "&status=1&take=" +
      scope.itemsPerPage +
      "&page=" +
      ipage,
    {
      headers: {
        Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
      },
    }
  );

  if (response1.status === 200) {
    scope.presetitemList = response1.data.data.data;
  }

  onInitMenu();
};

const onInitMenu = async () => {
  const userId = JSON.parse(decrypt(localStorage.getItem("_214"))).userid;
  const params = scope.menuId + "," + userId;

  try {
    const response = await serviceApi().get(
      `user/get-user-menu-list/${params}`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
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
          "pallet/remove-pallet-item-master/" +
            scope.menuid +
            "?warehouseId=" +
            sitecode,
          {
            headers: {
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
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
        setup.itemid = setup.itemid.toUpperCase();
        setup.itemdesc = setup.itemdesc.toUpperCase();
        setup.uom = setup.uom.toUpperCase();

        const response = await serviceApi().post(
          "pallet/post-pallet-item-master/",
          setup,
          {
            headers: {
              Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
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

// Function to convert the input field to uppercase
const toUpperCase = (field) => {
  setup[field] = setup[field].toUpperCase();
};

const isDropdownOpen = ref(false);
const selectedPreset = ref(null);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    searchTerm.value = "";
  }
}
function selectPreset(item) {
  selectedPreset.value = item;
  setup.value = { ...item }; // Copy all properties to your form
  isDropdownOpen.value = false;
}

// Handle click outside
function handleClickOutside(event) {
  isDropdownOpen.value = false;
}

onMounted(() => {
  onInit(1);
});
</script>
