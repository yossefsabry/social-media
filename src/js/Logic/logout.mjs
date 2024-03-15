import { createAlert, setupUi, reloadWindow } from "../index.mjs";

/**
 * handle the logout
 */
function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setupUi();
  reloadWindow();
  createAlert("Logout successful! Goodbye, and have a great day!", "info");
}

export default handleLogout;