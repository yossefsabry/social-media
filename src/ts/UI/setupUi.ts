import { User } from "../interface.ts";
import createUserLoginInfoNavBar from "./createUserInfoNav.ts";

/**
 * for setup the ui fo the website
 */
const setupUi = () => {
  const token: string | null = localStorage.getItem("token");
  const userJSON: string | null = localStorage.getItem("user"); // Use the non-null assertion operator to assert that userJSON is not null
  const user: User = JSON.parse(userJSON!); // Now you can use the user object
  const login: HTMLElement = (document.getElementById("login-wrapper") as HTMLElement);
  const logout: HTMLElement = (document.getElementById("logout-wrapper") as HTMLElement);
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
