<template>
  <IonPage>
    <ion-content>
      <section
        class="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center"
      >
        <div
          class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Sign in to your account
            </h1>
            <div class="space-y-4 md:space-y-6">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email..."
                  v-model="email"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password..."
                  v-model="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      :value="isremember"
                      v-model="isremember"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                      >Remember me</label
                    >
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Forgot password?</a
                >
              </div>
              <button
                type="submit"
                @click="onLogin"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>
    </ion-content>
  </IonPage>
</template>

<script setup>
import { serviceApi } from "../services/piso-serviceapi";

const ionRouter = useIonRouter();

const email = ref();
const password = ref();
const isremember = ref(false);

async function onLogin() {
  try {
    if (isremember) {
      const logindetails = {
        email: email.value,
        password: password.value,
        isremember: isremember.value,
      };
      localStorage.setItem("rememberme", JSON.stringify(logindetails));
    }

    const requestBody = {
      loginname: email.value,
      password: password.value,
    };
    const response = await serviceApi().post("Access/LoginUser", requestBody);

    if (response.status === "FAILURE") {
      alert(response.message);
    } else {
      console.log(response);
      const response2 = await serviceApi().get("Authenticate/Start", {
        headers: {
          Authorization: `Basic ${response.data.stringParam1}`,
        },
      });

      if (response2.data === "Authorized") {
        // Assuming response is the axios response object
        const userData = response.data.objParam1;

        // Construct the user object
        const userObject = {
          userid: userData.userId,
          email: userData.username,
          fullname: userData.firstname + " " + userData.lastname,
          fname: userData.firstname,
          userHascode: response.data.stringParam2,
          empId: userData.emplId,
          userrole: userData.userrole,
          token: response2.headers["token"],
        };

        // Convert the user object to a JSON string
        const userObjectString = JSON.stringify(userObject);

        // Store the user object string in localStorage
        localStorage.setItem("_214", userObjectString);

        ionRouter.replace("/tabs");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  if (localStorage.getItem("rememberme")) {
    email.value = JSON.parse(localStorage.getItem("rememberme")).email;

    password.value = JSON.parse(localStorage.getItem("rememberme")).password;

    isremember.value = JSON.parse(
      localStorage.getItem("rememberme")
    ).isremember;
    localStorage.clear();
  }
  localStorage.clear();
});
</script>

<style scoped></style>
