import { createAlert, loaderHandler, scrollTop, templateCard, userProfilePage } from "../index.ts";
import { url, isFetching, idPost, user } from "../storeData.ts";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AlertType, PostInfo, User } from "../interface.ts";

/**
 * Fetches user information and posts from the server and displays them on the page.
 * 
 * @param id - The ID of the user to fetch information for. If null, fetches information for the currently signed-in user.
 * @returns A Promise that resolves when the user information and posts are fetched and displayed.
 */
const showUserInfo = async (id: number | null): Promise<void> => {
  // to stop fetching data for pagination
  isFetching.value = true;
  let userProfile: User;
  let condition: boolean = false;
  let postUser: any; // FIX any

  loaderHandler(true);

  if (user.value == null) {
    createAlert("no user sign in ..", AlertType.danger);
    loaderHandler(false);
    return
  }

  const headers: { authorization: string } = {
    authorization: `bearer_${localStorage.getItem("token")}`,
  }


  // for geting the post and call when finsh form the user
  const getPost = async () => {
    //http://localhost:5000/post/socialuser/6426e14325fb796e7b40268c
    await axios.get(`${url}/post/socialuser/${userProfile._id}`, { headers: headers })
    .then((response: AxiosResponse) => {
      postUser = response.data
    })
    .catch((e: AxiosError<{ message: string }>) => {
      console.log("error happend", e.response?.data?.message);
      loaderHandler(false);
    });
  }

  // check if the user is the same user
  if (id === null) {
    //http://localhost:5000/user/profile
    await axios.get(`${url}/user/profile`, { headers: headers }).then((response: AxiosResponse) => {
      userProfile = response.data.user
      user.value = response.data.user
      condition = true;
    }).then(() => getPost())
    .catch((e: AxiosError<{ message: string}>) => {
      createAlert("error happend: " + e.response?.data?.message, AlertType.danger)
      loaderHandler(false);
    });
  } else {
    //http://localhost:5000/user/662b14cf730705c353d0b430/profile
    await axios.get(`${url}/user/${id}/profile`, { headers: headers })
    .then((response: AxiosResponse) => {
      userProfile = response.data.user
      // console.log(userProfile)
    }).then(() => getPost())
    .catch((e: AxiosError<{ message: string}>) => {
      console.log(e);
      loaderHandler(false); 
      createAlert("error happend: " + e.response?.data?.message, AlertType.danger)
    });

  }


  loaderHandler(false);

  const allPostUser: HTMLElement = postUser.results.results.map((item: PostInfo) => {
    const id: number = item._id;
    idPost.value = id;

    // FIX condition
    const userTemplate: string = templateCard(item, condition, idPost.value!, item.title, userProfile, true);
    return userTemplate;
  }).join("");

  const content: HTMLElement = (document.querySelector(".container__posts") as HTMLElement);
  const userInfo: string = await userProfilePage(userProfile!, allPostUser, condition);
  if (content !== null)
  (document.querySelector(".container")as HTMLElement).style.cssText = ` display: block !important`;
  content.innerHTML = userInfo;

  scrollTop();
  loaderHandler(false);
};

export default showUserInfo;


