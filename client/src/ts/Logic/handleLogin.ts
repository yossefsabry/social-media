import axios, { AxiosResponse, AxiosError } from "axios";
import { createAlert, setLocalStorageInfo, setupUi, loaderHandler , closeModal} from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";
import handleUserProfile from "./handleGetUserProfileInfo.ts";


/**
 * description: for loginBtn handler and send the data
 */
function handleLogin(): void {
  const email: string = (document.querySelector("#email-input-login") as HTMLInputElement ).value;
  const password: string | number = (document.querySelector("#password-input-login") as HTMLInputElement ).value;

  interface data {
    email: string;
    password: string | number;
  }

  const data: { email: string, password: string | number } = { email, password };

  loaderHandler(true);

  axios.post(`${url}/auth/signin`, data)
    .then((response: AxiosResponse) => {
      closeModal("login-modal");

      setLocalStorageInfo(
        response.data.refreshToken,
        response.data.token
      );

      // set the user for localstorage by call the show user profile
      handleUserProfile(response.data.refreshToken);

      createAlert("Login successful! Welcome back!", AlertType.success);
      setupUi();
      loaderHandler(false);

    }).catch((e: AxiosError<{ message: string }>) => {
      console.log(e)
      createAlert(`error happend: ${e?.response?.data?.message}`, AlertType.danger);
      loaderHandler(false);
    });
}

export default handleLogin;
