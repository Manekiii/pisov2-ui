<template>
  <div
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
          <h3 class="text-xl font-semibold text-gray-900">Switch Site</h3>
          <button
            @click="$emit('close-modal')"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
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
        <div class="p-6 space-y-6 overflow-y-auto h-[60vh]">
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
              class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter"
              required
              v-model="searchQuery"
              @change=""
            />
          </div>
          <div v-for="site in filteredSite" :key="site.branname">
            <div
              @click="getBranchCode(site)"
              class="relative w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
            >
              <div class="flex items-center">
                <div class="mr-2">
                  <!-- Checkbox -->
                  <input
                    type="radio"
                    :value="site"
                    v-model="branchSeleted"
                    class="w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <div>
                    <label for="item" class="text-black">{{
                      site.branname
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b "
        >
          <button
            type="button"
            @click="onSelectSite().then($emit('close-modal'))"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Go
          </button>
          <button
            @click="$emit('close-modal')"
            type="button"
            class="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { serviceApi } from "../services/piso-serviceapi";

const userSiteList = ref();
const selectedBranchCode = ref();
const branchSeleted = ref();

const searchQuery = ref("");
const filteredSite = computed(() => {
  if (!searchQuery.value.trim()) return userSiteList.value;
  {
    return userSiteList.value.filter((item) => {
      return (
        item.brancode.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.branname.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  }
});

// Function to switch user site
const onSwitchSite = async () => {
  const userId = JSON.parse(decrypt(localStorage.getItem("_214"))).userid;

  try {
    const response = await serviceApi().get(
      `user/get-user-sites/?userId=${userId}&sysId=17`,
      {
        headers: {
          Token: JSON.parse(decrypt(localStorage.getItem("_214"))).token,
        },
      }
    );

    if (response.status === 200) {
      userSiteList.value = response.data;
      console.log(userSiteList.value);
    }
  } catch (error) {
    console.error("Error calling $onSwitchSite:", error);
  }
};

const onSelectSite = async () => {
  try {
    console.log(branchSeleted);
    // Construct the user object
    const userObject = {
      sitecode: branchSeleted.value.brancode,
      sitename: branchSeleted.value.branname,
    };

    // Convert the user object to a JSON string
    const userObjectString = JSON.stringify(userObject);

    // Store the user object string in localStorage
    localStorage.setItem("_102", userObjectString);

    window.location.reload();
  } catch (error) {
    console.error("Error calling $onSelectSite:", error);
  }
};

async function getBranchCode(branch) {
  branchSeleted.value = branch;

  console.log(branchSeleted.value.brancode);
}

onMounted(async () => {
  await onSwitchSite();
});
</script>
