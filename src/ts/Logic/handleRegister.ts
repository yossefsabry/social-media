// import bootstrap, { Modal } from "bootstrap"
import axios, { AxiosError } from "axios";
import { loaderHandler, setupUi, createAlert } from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";

/**
 * handle register for the user
 * catch the data from the form and send it to the server
 * @throws {error} - throw an error for request for the clicked card
 */
function handleRegister() {
  const user: string = (document.getElementById("user-register") as HTMLInputElement ).value;
  const username: string = (document.getElementById("username-register") as HTMLInputElement ).value;
  const email: string = (document.getElementById("email-register") as HTMLInputElement ).value;
  const password: string | number = (document.getElementById("password-register") as HTMLInputElement ).value;
  const image: File  = (document.getElementById("image-register") as HTMLInputElement ).files[0];

  const dataForm: FormData = new FormData();
  dataForm.append("name", user);
  dataForm.append("username", username);
  dataForm.append("email", email);
  dataForm.append("password", password);
  dataForm.append("image", image);

  loaderHandler(true);
  axios.post(`${url}/register`, dataForm)
    .then(() => {
      createAlert("Registration successful! you can login.", AlertType.info);
      const modal: HTMLElement = (document.getElementById("register-modal") as HTMLElement);
      const modalInstance: Modal | null = bootstrap.Modal.getInstance(modal);
      if (modalInstance !== null) 
        modalInstance.hide();

      setupUi();
      loaderHandler(false);
    })
    .catch((e: AxiosError) => {
      createAlert(`error: ${e?.response?.data}`, AlertType.danger);
      loaderHandler(false);
    });
}
export default handleRegister;
