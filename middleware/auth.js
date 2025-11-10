export default defineNuxtRouteMiddleware((to, from) => {
  const route = useIonRouter();
  const userDetails = localStorage.getItem("_214")
    ? JSON.parse(decrypt(localStorage.getItem("_214")))
    : null;

  console.log("userDetails");
  const token = ref();
  if (userDetails) {
    token.value = userDetails.token; // Assuming you're storing the token in a cookie
    console.log(token);
  }

  if (!token.value) {
    // If no token, redirect to the login page with the intended URL as a query parameter
    return navigateTo(`/?redirect=${to.fullPath}`);
  }
});
