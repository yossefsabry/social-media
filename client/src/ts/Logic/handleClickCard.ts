import { loaderHandler, postTemplate,  scrollTop } from "../index.ts";
import {  PostInfo, User } from "../interface.ts";

/**
 * handle navgation an post page
 * @param {number} e - the item for the click card
 * @throws {AxiosError} e - throw an error from axios 
 */
const handleClickCard = async(e: string) => {
  loaderHandler(true);
  const element: PostInfo = JSON.parse(decodeURIComponent(e));
  console.log("element: ", element);
  let user: User;
  let authorIdPost: number = element.userId._id;
  let authorId: number = -1;

  const containerPost: HTMLElement = (document.querySelector(".container__posts") as HTMLElement);
  containerPost.innerHTML = "";


  const userData = localStorage.getItem("user");
  if (userData !== null) {
    user = JSON.parse(userData);
  }

  // check for the author

  const conditionPostAuthor: boolean = authorIdPost == authorId;
  const post = String(await postTemplate(element, conditionPostAuthor, user!)); // is for the adding comment the id
  containerPost.innerHTML = post;
  loaderHandler(false);
  scrollTop();
};

export default handleClickCard;
