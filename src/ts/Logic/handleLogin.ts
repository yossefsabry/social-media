// import bootstrap, { Modal } from "bootstrap"
import axios, { AxiosResponse, AxiosError } from "axios";
import { createAlert, setLocalStorageInfo, setupUi, loaderHandler } from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";
/**
 * for loginBtn handler and send the data
 */
function handleLogin() {
  let username: string = (document.querySelector("#username-input-login") as HTMLInputElement ).value;
  let password: string | number = (document.querySelector("#password-input-login") as HTMLInputElement ).value;

  interface data {
    username: string;
    password: string | number;
  }

  let data = {
    username: username,
    password: password,
  };

  loaderHandler(true);

  axios.post(`${url}/login`, data)
    .then((response: AxiosResponse) => {
      // hide modal
      const modal: HTMLElement = (document.getElementById("login-modal") as HTMLElement);
      let modalInstance: Modal | null = bootstrap.Modal.getInstance(modal);
      if (modalInstance !== null) {
        modalInstance.hide();
      }

      setLocalStorageInfo(
        response.data.token,
        JSON.stringify(response.data.user),
      );

      createAlert("Login successful! Welcome back!", AlertType.success);
      setupUi();
      loaderHandler(false);

    }).catch((e: AxiosError) => {
      createAlert(`error happend: ${e}`, AlertType.danger);
      loaderHandler(false);
    });
}

export default handleLogin;
