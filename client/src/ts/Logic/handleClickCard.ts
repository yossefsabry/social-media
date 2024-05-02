import axios, { AxiosResponse } from "axios"
import { loaderHandler, createAlert, postTemplate, templateComment, scrollTop } from "../index.ts";
import { url, postInfo, idPost } from "../storeData.ts";
import { AlertType, User } from "../interface.ts";

/**
 * handle navgation an post page
 * @param {number} e - the item for the click card
 * @throws {AxiosError} e - throw an error from axios 
 */
const handleClickCard = async(e: any) => {
  // loaderHandler(true);

  const element: any = JSON.parse(decodeURIComponent(e));
  console.log("element: ", element);
  let user: User | undefined;
  let authorIdPost: number = element.userId._id;
  let authorId: number = -1;

  const containerPost = (document.querySelector(".container__posts") as HTMLElement);
  containerPost.innerHTML = "";


  const userData = localStorage.getItem("user");
  if (userData !== null) {
    user = JSON.parse(userData);
  }

  // check for the author
  if (user !== undefined)
    authorId = user._id;

  const conditionPostAuthor: boolean = authorIdPost == authorId;
  const post = String(await postTemplate(element, conditionPostAuthor)); // is for the adding comment the id
  containerPost.innerHTML = post;
  loaderHandler(false);
  scrollTop();
};

export default handleClickCard;
