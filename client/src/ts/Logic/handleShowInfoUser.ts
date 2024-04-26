import { createAlert, loaderHandler, scrollTop, templateCard, userInfoPostTemplate, userProfilePage } from "../index.ts";
import { url, isFetching, idPost } from "../storeData.ts";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AlertType, User } from "../interface.ts";

/**
 * for show the user info
 * @param {object} element - the object for the user info
 * @returns {HTMLDivElement} - return the user template for profile and html tree
 * @throws {AxiosError} e - when making request for the user info
 */
const showUserInfo = async (id: number | null): Promise<void> => {

  // to stop fetching data for pagination
  isFetching.value = true;
  let user: User | undefined = localStorage.getItem("user") == null ? undefined : JSON.parse(localStorage.getItem("user")!);
  let userProfile: any;
  let condition: boolean = false;

  loaderHandler(true);

  if (user == null) {
    createAlert("no user sign in ..", AlertType.danger);
    return
  }

  const headers: any = {
    authorization: `bearer_${localStorage.getItem("token")}`,
  }

  if (id === null) {
    //http://localhost:5000/user/profile
    await axios.get(`${url}/user/profile`, { headers: headers }).then((response: AxiosResponse) => {
      userProfile = response.data
      console.log(userProfile)
      condition = true;
    }).catch((e: AxiosError) => console.log(e));
  } else {
    //http://localhost:5000/user/662b14cf730705c353d0b430/profile
    await axios.get(`${url}/user/${id}/profile`, { headers: headers })
    .then((response: AxiosResponse) => {
      userProfile = response.data
      console.log(userProfile)
    }).catch((e: AxiosError) => console.log(e));
  }
  // FIX any
  let postUser: any;

  //http://localhost:5000/post/socialuser/6426e14325fb796e7b40268c
  await axios.get(`${url}/post/socialuser/${userProfile.user._id}`, { headers: headers })
    .then((response: AxiosResponse) => {
      postUser = response.data
      console.log(postUser)
    })
    .catch((e: AxiosError) => {
      console.log("error happend", e);
    });
  loaderHandler(false);

  const allPostUser: HTMLElement = postUser.results.results.map(async(item: any) => {
    // const tags = item.tags.map((tg: any) => {
    //   return `<div> ${tg}</div>`;
    // });
    console.log(item)
    const title = item.title == null ? "" : item.title;
    const id = item._id;
    idPost.value = id;


    // FIX 
    // const userTemplate = userInfoPostTemplate(item, idPost.value!, id, title,  userProfile);
    // const userTemplate = templateCard(item, condition, idPost.value!, id, title, userProfile); 
    // return userTemplate;
  });

  const content = (document.querySelector(".container__posts") as HTMLElement);
  const userInfo = userProfilePage(userProfile, allPostUser);
  if (content !== null) 
    content.innerHTML = userInfo;

  scrollTop();
  loaderHandler(false);
};

export default showUserInfo;
