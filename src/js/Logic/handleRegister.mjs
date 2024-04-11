import { loaderHandler, setupUi, createAlert } from "../index.mjs";
import { url } from "../../../script.mjs";

/**
 * handle register for the user
 * catch the data from the form and send it to the server
 * @throws {error} - throw an error for request for the clicked card
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
    .then(() => {
      // console.log(response);
      createAlert("Registration successful! you can login.", "info");
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
