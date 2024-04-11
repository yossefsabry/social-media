import { loaderHandler, createAlert, showUserInfo , getRequest} from "../index.mjs";
import { currentPostClick,  url } from "../../../script.mjs";

/**
 * for handle the deleting button for the post that user made
 * @param {number} e - the id for the post that gone delete
 * @param {boolean} refresh - for refresh the page userInfo (profile)
 * @throws {error} - error when making reqeust for deleting the post
 */
const handleClickDeleteButton = (e, refresh) => {
  loaderHandler(true);
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  axios
    .delete(`${url}/posts/${e}`, { headers: headers })
    .then((response) => { // console.log(response);
      createAlert("deleting the post successfuly ", "success");
      // FIX handle the fix click
      if (refresh) {
        showUserInfo();
      }
      getRequest(true);
      loaderHandler(false);
    })
    .catch((e) => {
    //   console.log(e);
      createAlert("error happend in deleting: " + e, "danger");
      loaderHandler(false);
    });
};

export default handleClickDeleteButton;
