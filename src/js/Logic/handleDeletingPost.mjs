// import { loaderHandler, createAlert, showUserInfo  } from "../index.mjs";
// import { currentPostClick, getRequest } from "../../../script.mjs";

// /**
//  * for handle the deleting button for the post that user made
//  */
// const handleClickDeleteButton = (e, refresh) => {
//   loaderHandler(true);
//   const token = localStorage.getItem("token");
//   const headers = {
//     authorization: `Bearer ${token}`,
//   };
//   axios
//     .delete(`${url}/posts/${e}`, { headers: headers })
//     .then((response) => {
//       // console.log(response);
//       getRequest(true);
//       createAlert("deleting the post successfuly ", "success");
//       // FIX handle the fix click
//       if (refresh) {
//         showUserInfo(currentPostClick);
//       }
//       loaderHandler(false);
//     })
//     .catch((e) => {
//       console.log(e);
//       createAlert("error happend in deleting", "danger");
//       loaderHandler(false);
//     });
// };

// export default handleClickDeleteButton;