// import bootstrap, { Modal } from "bootstrap"
import { Modal } from "bootstrap";
import axios, { AxiosResponse, AxiosError } from "axios";
import { createAlert, setLocalStorageInfo, setupUi, loaderHandler } from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";
import * as bootstrap from "bootstrap";
import { setUserLocalStorageInfo } from "./localStorage.ts";
import handleUserProfile from "./handleGetUserProfileInfo.ts";

// const bootstrap = require("bootstrap"); # problem in bootstrap

/**
 * description: for loginBtn handler and send the data
 */
function handleLogin() {
  const email: string = (document.querySelector("#email-input-login") as HTMLInputElement ).value;
  const password: string | number = (document.querySelector("#password-input-login") as HTMLInputElement ).value;

  interface data {
    email: string;
    password: string | number;
  }

  const data = {
    email,
    password
  };

  loaderHandler(true);

  axios.post(`${url}/auth/signin`, data)
    .then((response: AxiosResponse) => {
      // hide modal
      console.log(response)
      const modal: HTMLElement = (document.getElementById("login-modal") as HTMLElement);
      const modalInstance: Modal | null = bootstrap.Modal.getInstance(modal);
      if (modalInstance !== null) {
        modalInstance.hide();
      }

      setLocalStorageInfo(
        response.data.refreshToken,
        response.data.token
      );

      // set the user for localstorage by call the show user profile
      handleUserProfile(response.data.refreshToken);

      createAlert("Login successful! Welcome back!", AlertType.success);
      setupUi();
      loaderHandler(false);

    }).catch((e: AxiosError) => {
      console.log(e)
      createAlert(`error happend: ${e}`, AlertType.danger);
      loaderHandler(false);
    });
}

export default handleLogin;
