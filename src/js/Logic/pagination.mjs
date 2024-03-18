import { isFetching,  postInfo, currentPage, lastPage } from "../../../script.mjs";
import { createAlert, getRequest } from "../index.mjs";
function handlePagination() {
if (
    !isFetching.value &&
    window.pageYOffset + 3000 >= document.body.offsetHeight &&
    currentPage.value < lastPage.value &&
    postInfo.value.length == 0
  ) {
    isFetching.value = true; // Set flag to true when a request is initiated
    currentPage.value = currentPage.value + 1;
    getRequest(false, currentPage.value)
      .then(() => {
        isFetching.value = false;
      })
      .catch(() => {
        createAlert("error happend pagination", "danger");
        console.log("error happend pagination");
      });
  }
}

export default handlePagination;