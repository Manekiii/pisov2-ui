<template>
  <IonPage>
    <ion-content>
      <section class="bg-gray-50 h-screen flex items-center justify-center">
        <div
          class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
            >
              Sign in to your account
            </h1>
            <div class="space-y-4 md:space-y-6">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Your email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter email..."
                  v-model="email"
                  required=""
                  @keydown.enter="onLogin"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password..."
                  v-model="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  @keydown.enter="onLogin"
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
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500"
                      >Remember me</label
                    >
                  </div>
                </div>
                <a
                  href="https://apps.fastlogistics.com.ph/admin/Account/RequestForgotPassword/"
                  target="_blank"
                  class="text-sm font-medium text-primary-600 hover:underline"
                  >Forgot password?</a
                >
              </div>
              <button
                type="submit"
                @click="onLogin"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {{ isLoading ? "Signing In..." : "Sign in" }}
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
const isLoading = ref(false);
const isremember = ref(false);

async function onLogin() {
  try {
    isLoading.value = true;
    if (isremember) {
      const logindetails = {
        email: email.value,
        password: password.value,
        isremember: isremember.value,
      };
      localStorage.setItem("rememberme", encrypt(JSON.stringify(logindetails)));
    }

    const requestBody = {
      loginname: email.value,
      password: password.value,
    };
    const response = await serviceApi().post("Access/LoginUser", requestBody);

    if (response.status === "FAILURE") {
      alert(response.message);
      isLoading.value = false;
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
        localStorage.setItem("_214", encrypt(userObjectString));
        const redirect =
          new URLSearchParams(window.location.search).get("redirect") ||
          "/tabs";

        // Redirect to the desired page
        ionRouter.replace(redirect);
      }
    }
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
}

onMounted(() => {
  if (localStorage.getItem("rememberme")) {
    email.value = JSON.parse(decrypt(localStorage.getItem("rememberme"))).email;

    password.value = JSON.parse(
      decrypt(localStorage.getItem("rememberme"))
    ).password;

    isremember.value = JSON.parse(
      decrypt(localStorage.getItem("rememberme"))
    ).isremember;
    localStorage.clear();
  }
  localStorage.clear();
});
</script>

<style scoped></style>
