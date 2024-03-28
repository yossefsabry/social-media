import { loaderHandler, setupUi, createAlert } from "../index.mjs";
import { url } from "../../../script.mjs";

/**
 * handle register for the user
 */
  function handleRegister() {
  const user = document.getElementById("user-register").value;
  const username = document.getElementById("username-register").value;
  const email = document.getElementById("email-register").value;
  const password = document.getElementById("password-register").value;
  const image = document.getElementById("image-register").files[0];

  const dataForm = new FormData();
  dataForm.append("name", user);
  dataForm.append("username", username);
  dataForm.append("email", email);
  dataForm.append("password", password);
  dataForm.append("image", image);

  loaderHandler(true);
  axios
    .post(`${url}/register`, dataForm)
    .then((response) => {
      // console.log(response);
      createAlert("Registration successful! now login.", "info");
      const modal = document.getElementById("register-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      setupUi();
      loaderHandler(false);
    })
    .catch((e) => {
      createAlert(`error: ${e?.response?.data?.message}`, "danger");
      loaderHandler(false);
    });
}
export default handleRegister;