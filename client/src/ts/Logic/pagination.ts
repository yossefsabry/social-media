import { isFetching, currentPage, lastPage, postInfo } from "../storeData.ts";
import { createAlert, getRequest } from "../index.ts";
import { AlertType } from "../interface.ts";
import { AxiosError } from "axios";

/**
 * for making another request when scroll to the bottom
 * @throws {error} - error hanppend when making another request
 */
function handlePagination(): void {
  // is fetching to check if in home or profile page and postInfo.value for check if in clickPost page or home
  if (
    !isFetching.value &&
    window.pageYOffset + 2000 >= document.body.offsetHeight &&
    currentPage.value < lastPage.value && postInfo.value == undefined &&
    lastPage.value !== currentPage.value
  ) {
    isFetching.value = true; // Set flag to true when a request is initiated
    currentPage.value = currentPage.value + 1;
    getRequest(false, currentPage.value)
      .then(() => {
        isFetching.value = false;
      })
      .catch((e: AxiosError) => {
        createAlert("error happend pagination", AlertType.danger)
        console.log("error happend pagination", e);
      });
  } else {
    let pagination__bottom: HTMLElement = (document.querySelector(".pagination__bottom") as HTMLElement);
    pagination__bottom?.classList.add("d-none");
  }
}

export default handlePagination;
