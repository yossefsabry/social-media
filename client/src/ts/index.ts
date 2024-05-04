import reloadWindow from "./UI/reloadWindow.ts";
import loaderHandler from "./UI/loaderHandler.ts";
import setLocalStorageInfo from "./Logic/localStorage.ts";
import setupUi from "./UI/setupUi.ts";
import createAlert from "./UI/createAlert.ts";
import templateCard from "./templates/templateCard.ts";
import handleLogout from "./Logic/logout.ts";
import handleClickDeleteButton from "./Logic/handleDeletingPost.ts";
import handlePagination from "./Logic/pagination.ts";
import handleLogin from "./Logic/handleLogin.ts";
import handleRegister from "./Logic/handleRegister.ts";
import handleCreatePost from "./Logic/handleCreatePost.ts";
import handleAddingComment from "./Logic/handleAddingComment.ts";
import userProfilePage from "./templates/userProfilePage.ts";
import showUserInfo from "./Logic/handleShowInfoUser.ts";
import templateComment from "./templates/commentTemplate.ts";
import postTemplate from "./templates/postTemplate.ts";
import handleClickCard from "./Logic/handleClickCard.ts";
import scrollTop from "./UI/scrollTop.ts";
import getRequest from "./Logic/getRequestPost.ts";
import handleClickEditButton from "./Logic/handleEdit.ts";
import getTimeInGoodWay from "./Logic/calcCreatedPosts.ts";
import userCoverProfile from "./templates/userCoverProfile.ts";
import userAboutProfile from "./templates/userAboutProfile.ts";
import formatTimestamp from "./Logic/userJoinedData.ts";
import headerLinks from "./templates/headerLinks.ts";
import suggestUserProfile from "./templates/suggestUserProfile.ts";
import { changeUserImageCover, changeUserImageProfile } from "./Logic/changeUserImage.ts";
import updateUserInfoProfile from "./Logic/updateUserInfoProfile.ts";
import updatePasswordUser from "./Logic/updatePasswordUser.ts";
import deleteUser from "./Logic/deleteUser.ts";
import closeModal from "./UI/closeModal.ts";
import addingLike from "./Logic/addingLike.ts";
import changeLove from "./UI/changeLove.ts";
import sharePost from "./Logic/sharePost.ts";
import settingCurrentPost from "./Logic/settingPostId.ts";

export {
    reloadWindow, loaderHandler, setLocalStorageInfo,
    setupUi, createAlert,  templateCard,
    handleLogout, handleClickDeleteButton, handlePagination, handleLogin,
    handleRegister, handleCreatePost, handleAddingComment,  userProfilePage, showUserInfo,
    templateComment, postTemplate, handleClickCard, scrollTop, getRequest, handleClickEditButton,
    getTimeInGoodWay, userCoverProfile, userAboutProfile, formatTimestamp, headerLinks, suggestUserProfile,
    changeUserImageCover, changeUserImageProfile, updateUserInfoProfile, updatePasswordUser,
    deleteUser, closeModal, addingLike, changeLove, sharePost, settingCurrentPost
};
