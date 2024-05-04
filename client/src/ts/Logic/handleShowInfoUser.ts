import { createAlert, loaderHandler, scrollTop, templateCard, userProfilePage } from "../index.ts";
import { url, isFetching, idPost } from "../storeData.ts";
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
  let user: User | undefined = localStorage.getItem("user") == null ? undefined : JSON.parse(localStorage.getItem("user")!);
  let userProfile: User;
  let condition: boolean = false;
  let postUser: any; // FIX any

  loaderHandler(true);

  if (user == null) {
    createAlert("no user sign in ..", AlertType.danger);
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
    .catch((e: AxiosError) => {
      console.log("error happend", e);
    });
  }

  // check if the user is the same user
  if (id == null) {
    //http://localhost:5000/user/profile
    await axios.get(`${url}/user/profile`, {headers: headers }).then((response: AxiosResponse) => {
      userProfile = response.data.user
      // console.log(userProfile);
      condition = true;
      console.log("welcome");
    }).then(() => getPost())
      .catch((e: AxiosError) => console.log(e));
  } else {
    //http://localhost:5000/user/662b14cf730705c353d0b430/profile
    await axios.get(`${url}/user/${id}/profile`, { headers: headers })
    .then((response: AxiosResponse) => {
      userProfile = response.data.user
      // console.log(userProfile);
    }).then(() => getPost())
    .catch((e: AxiosError) => console.log(e));
  }


  loaderHandler(false);
  const allPostUser: HTMLElement = postUser.results.results.map((item: PostInfo) => {
    const id: number = item._id;
    idPost.value = id;

    const userTemplate: string = templateCard(item, condition, idPost.value!, item.title, userProfile, true);
    return userTemplate;
  });

  const content: HTMLElement = (document.querySelector(".container__posts") as HTMLElement);
  const userInfo: string = await userProfilePage(userProfile!, allPostUser, condition);
  if (content !== null)
    content.innerHTML = userInfo;
  scrollTop();
  loaderHandler(false);
};

export default showUserInfo;
