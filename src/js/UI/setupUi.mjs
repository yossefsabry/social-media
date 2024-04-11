import createUserLoginInfoNavBar from "./createUserInfoNav.mjs";

/**
 * for setup the ui fo the website
 */
const setupUi = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const login = document.getElementById("login-wrapper");
  const logout = document.getElementById("logout-wrapper");
  // const icon = document.getElementById("icon__adding");

  if (token == null) {
    login.style.cssText = "display:flex !important";
    logout.style.cssText = "display:none !important";
    // icon.style.cssText = "display: none !important";
  } else {
    createUserLoginInfoNavBar(user);
    login.style.cssText = "display:none !important";
    logout.style.cssText = "display:flex !important";
    // icon.style.cssText = "display: block !important";
  }
};


export default setupUi;
