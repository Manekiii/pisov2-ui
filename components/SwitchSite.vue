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
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Switch Site
          </h3>
          <button
            @click="$emit('close-modal')"
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
        <div class="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          <div v-for="site in userSiteList" :key="site.branname">
            <div
              @click="getBranchCode(site)"
              class="relative w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
            >
              <div class="flex items-center">
                <div class="mr-2">
                  <!-- Checkbox -->
                  <input
                    type="radio"
                    :value="site"
                    v-model="branchSeleted"
                    class="w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <div>
                    <label for="item">{{ site.branname }}</label>
                  </div>
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
            @click="onSelectSite().then($emit('close-modal'))"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Go
          </button>
          <button
            @click="$emit('close-modal')"
            type="button"
            class="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
// Function to switch user site
const onSwitchSite = async () => {
  const userId = JSON.parse(localStorage.getItem("_214")).userid;

  try {
    const response = await serviceApi().get(
      `user/get-user-sites/?userId=${userId}&sysId=17`,
      {
        headers: {
          Token: JSON.parse(localStorage.getItem("_214")).token,
        },
      }
    );

    if (response.status === 200) {
      userSiteList.value = response.data;
      console.log(response);
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
