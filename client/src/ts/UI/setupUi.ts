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
  const imageUserNav: HTMLImageElement = (document.querySelector("#user__image__profile__navbar .image_nav")as HTMLImageElement);

  if (token == ""){
    login.style.cssText = "display:flex !important";
    logout.style.cssText = "display:none !important";
    // icon.style.cssText = "display: none !important";
  } else {
    login.style.cssText = "display:none !important";
    logout.style.cssText = "display:flex !important";
    imageUserNav.src = `${user!.images?.profile?.url}`;
    // icon.style.cssText = "display: block !important";
  }
  let modalBackdrop: HTMLElement | null = (document.querySelector('.modal-backdrop') as HTMLElement);
  modalBackdrop?.parentNode!.removeChild(modalBackdrop!);
  modalBackdrop?.classList.remove('show');
};


export default setupUi;
