import { createAlert, setupUi, scrollTop, getRequest } from "../index.ts";
import {  currentPage } from "../storeData.ts";
import { AlertType } from "../interface.ts";

/**
 * handle the logout
 */
function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setupUi();
  window.location.reload();
  getRequest(true, currentPage.value)
  createAlert("Logout successful! Goodbye, and have a great day!", AlertType.info);
  scrollTop();
}

export default handleLogout;
