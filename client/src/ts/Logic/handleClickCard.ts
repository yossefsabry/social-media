import { loaderHandler, postTemplate,  scrollTop , settingCurrentPost} from "../index.ts";
import {  PostInfo, User } from "../interface.ts";
import {isFetching} from "../storeData.ts"

/**
 * handle navgation an post page
 * @param {number} e - the item for the click card
 * @throws {AxiosError} e - throw an error from axios 
 */
const handleClickCard = async(e: string) => {
  isFetching.value = true;
  loaderHandler(true);
  settingCurrentPost(e);
  const element: PostInfo = JSON.parse(decodeURIComponent(e));
  let user: User;
  let authorIdPost: number = element.userId._id;
  let authorId: number = -1;

  const containerPost: HTMLElement = (document.querySelector(".container__posts") as HTMLElement);
  containerPost.innerHTML = "";


  const userData = localStorage.getItem("user");
  if (userData !== null) {
    user = JSON.parse(userData);
    authorId = user._id;
  }

  const conditionPostAuthor: boolean = authorIdPost == authorId;
  console.log(authorId, authorIdPost, conditionPostAuthor);
  const post = String(await postTemplate(element, conditionPostAuthor, user!)); // is for the adding comment the id
  containerPost.innerHTML = post;
  scrollTop();
  loaderHandler(false);
};

export default handleClickCard;
