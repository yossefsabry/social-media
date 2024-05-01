import { Modal } from "bootstrap";
import axios, { AxiosError } from "axios";
import { loaderHandler, setupUi, createAlert } from "../index.ts";
import { url } from "../storeData.ts";
import { AlertType } from "../interface.ts";
import * as bootstrap from "bootstrap";

/**
 * handle register for the user
 * catch the data from the form and send it to the server
 * @throws {error} - throw an error for request for the clicked card
 */
function handleRegister() {
  const name: string = (document.getElementById("name-register") as HTMLInputElement ).value;
  const age: string = (document.getElementById("age-register") as HTMLInputElement ).value;
  const email: string = (document.getElementById("email-register") as HTMLInputElement ).value;
  const password: string | number = (document.getElementById("password-register") as HTMLInputElement ).value;
  const confirmPassword: string | number = (document.getElementById("confirmPassword-register") as HTMLInputElement ).value;
  const phone: string = (document.getElementById("phone-register") as HTMLInputElement ).value;
  // const imageElement: HTMLInputElement | null = (document.getElementById("image-register")as HTMLInputElement);

  // let image: File |  string = ""; // check for the image

  // if (imageElement !== null && imageElement.files !== null && imageElement.files.length > 0) 
  //   image = imageElement.files[0];


  // const dataForm: FormData = new FormData();
  // dataForm.append("name", user);
  // dataForm.append("username", username);
  // dataForm.append("email", email);
  // dataForm.append("password", password);
  // dataForm.append("image", image);

  const data: 
  {
      name: string, email: string, password: string,
      confirmPassword: string, age: string, phone: string  
  } = {
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
    .then((res) => {
      console.log(res)
      createAlert("Registration successful! you can login.", AlertType.info);
      const modal: HTMLElement = (document.getElementById("register-modal") as HTMLElement);
      const modalInstance: Modal | null = bootstrap.Modal.getInstance(modal);
      if (modalInstance !== null) 
        modalInstance.hide();

      // setupUi();
      loaderHandler(false);
    })
    .catch((e: AxiosError) => {
      console.log(e);
      createAlert(`error: ${e?.response?.data}`, AlertType.danger);
      loaderHandler(false);
    });
}
export default handleRegister;