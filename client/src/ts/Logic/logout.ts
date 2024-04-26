import { createAlert, setupUi, scrollTop, getRequest } from "../index.ts";
import {  currentPage, url } from "../storeData.ts";
import { AlertType } from "../interface.ts";
import axios, { AxiosError } from "axios";


/**
 * handle the logout
 */
async function handleLogout() {
  const token = localStorage.getItem("token");
  const headers: any = {
    authorization: `bearer_${token}`,
  }
  getRequest(true, currentPage.value)
  await axios.patch(`${url}/auth/signout`, { headers: headers }).then(() =>  {
    console.log("logout successful")
  }).catch((e) => {
    console.log(e)
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
