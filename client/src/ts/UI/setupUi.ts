import { User } from "../interface";

/**
 * for setup the ui fo the website
 */
const setupUi = (): void => {
  const token: string  = localStorage.getItem("token") || "";
  let user: User;
  const userData: string | null = localStorage.getItem("user");
  if (userData !== null) {
    user = JSON.parse(userData);
  };
  const login: HTMLElement = (document.getElementById("login-wrapper") as HTMLElement);
  const logout: HTMLElement = (document.getElementById("logout-wrapper") as HTMLElement);
  const imageUserNav: HTMLElement = (document.getElementById("user__image__profile__navbar")as HTMLElement);

  if (token == ""){
    login.style.cssText = "display:flex !important";
    logout.style.cssText = "display:none !important";
    if (user!?.images?.profile?.url) {
       imageUserNav.setAttribute("src", user.images.profile.url); 
    }
    // icon.style.cssText = "display: none !important";
  } else {
    login.style.cssText = "display:none !important";
    logout.style.cssText = "display:flex !important";
    // icon.style.cssText = "display: block !important";
  }
};


export default setupUi;
