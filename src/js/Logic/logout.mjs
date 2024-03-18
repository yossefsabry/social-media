import { createAlert, setupUi, scrollTop, getRequest } from "../index.mjs";
import {  currentPage } from "../../../script.mjs";

/**
 * handle the logout
 */
function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setupUi();
  getRequest(true, currentPage.value)
  createAlert("Logout successful! Goodbye, and have a great day!", "info");
  scrollTop();
}

export default handleLogout;