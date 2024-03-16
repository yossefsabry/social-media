import { createAlert, setLocalStorageInfo, setupUi, loaderHandler } from "../index.mjs";
import { url } from "../../../script.mjs";
/**
 * for loginBtn handler and send the data
 */
function handleLogin() {
  let username = document.querySelector("#username-input-login").value;
  let password = document.querySelector("#password-input-login").value;
  let data = {
    username: username,
    password: password,
  };
  loaderHandler(true);
  axios
    .post(`${url}/login`, data)
    .then((response) => {
      // hide modal
      const modal = document.getElementById("login-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      setLocalStorageInfo(
        response.data.token,
        JSON.stringify(response.data.user),
      );
      // createAlert();
      createAlert("Login successful! Welcome back!", "success");
      setupUi();
      loaderHandler(false);
    })
    .catch((e) => {
      createAlert(`error happend: ${e}`, "danger");
      loaderHandler(false);
    });
}

export default handleLogin;