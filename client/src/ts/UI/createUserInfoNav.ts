import { User } from "../interface.ts";

/**
 * Create user component to add the info to nav for login
 * @param {Object} user - The user object containing information like name and image_profile.
 */
const createUserLoginInfoNavBar = (user: User) => {
  const infoUserNav = `
        <img src=${user.profile_image} alt="avatar" />
        <strong class="text-white">${user.name}</strong
    `;

  const userInfo = `
        <img src="images/icons8-user-48.png" alt="avatar" />
        <strong class="text-white">${user.name}</strong>
    `;

  // Assuming you have an HTML element with the id "info-user-nav"
  if (typeof user.profile_image == "string") {
    (document.querySelector(".info-user-nav") as HTMLElement ).innerHTML = infoUserNav;
  } else {
    (document.querySelector(".info-user-nav") as HTMLElement ).innerHTML = userInfo;
  }
};

export default createUserLoginInfoNavBar;
