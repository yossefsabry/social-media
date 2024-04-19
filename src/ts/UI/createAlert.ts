
/**
 * @param {string} message - the message that show for the user
 * @param {string} type - the type for the massage (danger - info - success)
 */

import { AlertType } from "../interface.ts";


const createAlert = (message: string, type: AlertType) => {
  const alertPlaceholder = (document.getElementById("liveAlertPlaceholder") as HTMLElement);
  const appendAlert = (message: string, type: AlertType) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      "   <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>",
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);

    // Hide the alert after 2 seconds
    setTimeout(() => {
      wrapper.remove();
    }, 3500);
  };
  appendAlert(message, type );
};

export default createAlert;
