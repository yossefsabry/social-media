import axios, { AxiosError } from "axios";
import { loaderHandler, createAlert, closeModal, setupUi } from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";

/**
 * handle register for the user
 * catch the data from the form and send it to the server
 * @throws {error} - throw an error for request for the clicked card
 */
function handleRegister() {
  console.log("welcome");
  const name: string = (document.getElementById("name-register") as HTMLInputElement).value;
  const age: string = (document.getElementById("age-register") as HTMLInputElement).value;
  const email: string = (document.getElementById("email-register") as HTMLInputElement).value;
  const password: string | number = (document.getElementById("password-register") as HTMLInputElement).value;
  const confirmPassword: string | number = (document.getElementById("confirmPassword-register") as HTMLInputElement).value;
  const phone: string = (document.getElementById("phone-register") as HTMLInputElement).value;

  const data: { name: string, email: string, password: string, confirmPassword: string, age: string, phone: string }
    = {
    name,
    email,
    password,
    confirmPassword,
    age,
    phone,
  }

  let headers: any = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
    "Connection": "keep-alive",
    "Accept": "*/*",
    "Host": "localhost:5000",
    "Accept-Encoding": "gzip, deflate, br",
  }

  loaderHandler(true);
  axios.post(`${url}/auth/signup`, data, { headers: headers })
    .then(() => {
      createAlert("Registration successful! you can login.", AlertType.info);
      closeModal("register-modal");
      setupUi();
      loaderHandler(false);
    })
    .catch((e: AxiosError<{ message: Array<string>}>) => {
      console.log(e);
      loaderHandler(false);
      createAlert(`error: ${e?.response?.data.message}`, AlertType.danger);
    });
}
export default handleRegister;
