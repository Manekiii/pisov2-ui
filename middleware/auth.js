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

  /*   const fullPath = ref(to.fullPath);
  const ionRouter = useRouter();
  console.log(fullPath.value);

  // Check if menuList is loaded and filter the routes based on user access
  if (menuList.value && token) {
    // Get the path the user is trying to access

    const pathToAccess = ref(0);

    if (
      fullPath.value === "/main/maintenance/projects/" ||
      "/main/maintenance/projects"
    ) {
      pathToAccess.value = 3;
    } else if (
      fullPath.value ===
      ("/main/maintenance/projectassign/" || "/main/maintenance/projectassign")
    ) {
      pathToAccess.value = 4;
    } else if (
      fullPath.value ===
      ("/main/maintenance/userInfo" || "/main/maintenance/userInfo/")
    ) {
      pathToAccess.value = 6;
    } else if (
      fullPath.value ===
      ("/main/maintenance/userroleassigning/" ||
        "/main/maintenance/userroleassigning")
    ) {
      pathToAccess.value = 7;
    } else {
      return;
    }

    // Check if the user has access to the path
    const hasAccess = menuList.value.forEach(element => {
      console.log(element);
      return element.id === pathToAccess.value;
    });

    if (!hasAccess) {
      // Redirect to a forbidden page or handle unauthorized access
      return navigateTo("/main"); // Replace with your forbidden page route
    }
  } */
});
