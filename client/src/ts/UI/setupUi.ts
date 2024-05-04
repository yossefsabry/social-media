/**
 * for setup the ui fo the website
 */
const setupUi = (): void => {
  const token: string  = localStorage.getItem("token") || "";
  const login: HTMLElement = (document.getElementById("login-wrapper") as HTMLElement);
  const logout: HTMLElement = (document.getElementById("logout-wrapper") as HTMLElement);

  if (token == "") {
    login.style.cssText = "display:flex !important";
    logout.style.cssText = "display:none !important";
    // icon.style.cssText = "display: none !important";
  } else {
    login.style.cssText = "display:none !important";
    logout.style.cssText = "display:flex !important";
    // icon.style.cssText = "display: block !important";
  }
};


export default setupUi;
