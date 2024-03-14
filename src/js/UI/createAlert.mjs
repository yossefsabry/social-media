
// todo: alert fix hidden
const createAlert = (message, type) => {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
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
    }, 3000);
  };
  appendAlert(message, type);
};

export default createAlert;
