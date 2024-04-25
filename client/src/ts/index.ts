import reloadWindow from "./UI/reloadWindow.ts";
import loaderHandler from "./UI/loaderHandler.ts";
import setLocalStorageInfo from "./Logic/localStorage.ts";
import setupUi from "./UI/setupUi.ts";
import createAlert from "./UI/createAlert.ts";
import createUserLoginInfoNavBar from "./UI/createUserInfoNav.ts";
import templateCard from "./templates/templateCard.ts";
import handleLogout from "./Logic/logout.ts";
import handleClickDeleteButton from "./Logic/handleDeletingPost.ts";
import handlePagination from "./Logic/pagination.ts";
import handleLogin from "./Logic/handleLogin.ts";
import handleRegister from "./Logic/handleRegister.ts";
import handleCreatePost from "./Logic/handleCreatePost.ts";
import handleAddingComment from "./Logic/handleAddingComment.ts";
import userProfilePage from "./templates/userProfilePage.ts";
import userInfoPostTemplate from "./templates/userInfoPostTemplate.ts";
import showUserInfo from "./Logic/handleShowInfoUser.ts";
import templateComment from "./templates/commentTemplate.ts";
import postTemplate from "./templates/postTemplate.ts";
import handleClickCard from "./Logic/handleClickCard.ts";
import scrollTop from "./UI/scrollTop.ts";
import getRequest from "./Logic/getRequestPost.ts";
import handleClickEditButton from "./Logic/handleEdit.ts";

export {
    reloadWindow, loaderHandler, setLocalStorageInfo,
    setupUi, createAlert, createUserLoginInfoNavBar, templateCard,
    handleLogout ,handleClickDeleteButton, handlePagination, handleLogin,
    handleRegister, handleCreatePost, handleAddingComment, userInfoPostTemplate, userProfilePage, showUserInfo,
    templateComment, postTemplate, handleClickCard, scrollTop, getRequest, handleClickEditButton 
};
