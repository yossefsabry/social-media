import { createAlert, setupUi, scrollTop, getRequest } from "../index.ts";
import { currentPage, url } from "../storeData.ts";
import { AlertType } from "../interface.ts";
import axios, { AxiosError } from "axios";


/**
 * handle the logout
 */
async function handleLogout(): Promise<void> {
  const token: string = localStorage.getItem("token") || "";
  const headers: { authorization: string } = {
    authorization: `bearer_${token}`,
  }
  getRequest(true, currentPage.value)
  await axios.patch(`${url}/auth/signout`, { headers: headers }).then(() => {
    console.log("logout successful")
  }).catch((e: AxiosError<{ message: string }>) => {
    console.log(e.response?.data?.message)
  });

  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  createAlert("Logout successful! Goodbye, and have a great day!", AlertType.info);
  scrollTop();
  setupUi();
  window.location.reload();
}

export default handleLogout;
