// plugins/accessModule.js

import { serviceApi } from "../services/piso-serviceapi";

export default ({ app }, inject) => {
  // Function to initialize access module
  const onInitMenu = async (p) => {
    const userId = JSON.parse(localStorage.getItem("_214")).userId;
    const params = p + "," + userId;

    try {
      const response = await serviceApi().get(
        `user/get-user-menu-list/${params}`
      );
      app.$root.canAdd = response.data.canadd;
      app.$root.canEdit = response.data.canedit;
      app.$root.canDelete = response.data.candelete;
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
    }
  };

  // Function to switch user site
  const onSwitchSite = async () => {
    const userId = JSON.parse(localStorage.getItem("_214")).userId;

    const response = await serviceApi()
      .get(`user/get-user-sites/?userId=${userId}&sysId=17`)
      .then((response) => {
        response.data;
      })
      .catch((error) => {
        // Handle errors if needed
        console.error("Error calling $onSwitchSite:", error);
      });
    return response.data;
  };

  inject("onInitMenu", onInitMenu);
  inject("onSwitchSite", onSwitchSite);
};
