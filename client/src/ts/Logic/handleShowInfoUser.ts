import { createAlert, loaderHandler, scrollTop, userInfoPostTemplate, userProfilePage } from "../index.ts";
import { url, isFetching, idPost } from "../storeData.ts";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AlertType, User } from "../interface.ts";

/**
 * for show the user info
 * @param {object} element - the object for the user info
 * @returns {HTMLDivElement} - return the user template for profile and html tree
 * @throws {AxiosError} e - when making request for the user info
 */
const showUserInfo = async (element?:string | null ): Promise<void> => {
  // to stop fetching data for pagination
  isFetching.value = true;
  const content = (document.querySelector(".container__posts") as HTMLElement);
  let user: User| undefined ; 
  let userProfile: boolean;

  loaderHandler(true);

  if (element == null) {
    const userJSON: string | null = localStorage.getItem("user"); // Use the non-null assertion operator to assert that userJSON is not null
    user = JSON.parse(userJSON!); // Now you can use the user object

    userProfile = true;
  } else {
    user = JSON.parse(decodeURIComponent(element));
    let user_id: number = -1;

    if (user !== undefined) {
      user_id =  user.author.id;
    }
    userProfile = false;

    await axios.get(`${url}/users/${user_id}`)
    .then((response: AxiosResponse) => {
      user = response.data.data;
    }).catch((e: AxiosError) => console.log(e));
  }

  if (user == null) {
    createAlert("no user sign in ..", AlertType.danger);
  } else {
    loaderHandler(true);

    // FIX any
    let postUser: any;
    await axios.get(`${url}/users/${user.id}/posts`)
      .then((response: AxiosResponse) => {
        postUser = response.data.data;
      })
      .catch((e: AxiosError) => {
        console.log("error happend", e);
      });

    loaderHandler(false);

    const allPostUser: HTMLElement = postUser.map((item: any) => {
      const tags = item.tags.map((tg: any) => {
        return `<div> ${tg}</div>`;
      });
      const title = item.title == null ? "" : item.title;
      const id = item.id;
      idPost.value = id;
      const userTemplate = userInfoPostTemplate(item, idPost.value!, id, title, tags, userProfile);
      return userTemplate;
    });

    const userInfo = userProfilePage(user, allPostUser);
    if (content !== null) 
      content.innerHTML = userInfo;

    scrollTop();
    loaderHandler(false);
  }
};

export default showUserInfo;
