import {
    handleClickDeleteButton, handleAddingComment,
    showUserInfo, handleClickCard, handleClickEditButton,
    getTimeInGoodWay, addingLike, sharePost
} from "../index.ts";
import { CustomWindow, PostInfo, User, userIdInfo } from "../interface.ts";

/**
 * Generates a template card HTML string.
 * 
 * @param item - The item data.
 * @param condition - The condition for displaying certain elements.
 * @param idUpdate - The ID for updating the card.
 * @param title - The title of the card.
 * @param userInfo - Optional user information.
 * @param refresh - Optional flag to refresh the card.
 * @returns The generated template card HTML string.
 */
function templateCard(item: PostInfo, condition: boolean, idUpdate: number, title: string, userInfo: User, refresh?: boolean): string {
    // global defeind the method to can read by html
    userInfo = userInfo;
    // console.log(userInfo)
    const customWindow = window as CustomWindow;
    customWindow.showUserInfo = showUserInfo;
    customWindow.handleClickCard = handleClickCard;
    customWindow.handleAddingComment = handleAddingComment;
    customWindow.handleClickDeleteButton = handleClickDeleteButton;
    customWindow.handleClickEditButton = handleClickEditButton;
    customWindow.addingLike = addingLike;
    customWindow.sharePost = sharePost;

    // console.log(item)
    // for check if the user adding  like or not for the post
    const userLocalStorage: User = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
    let userId: number = userLocalStorage._id;
    let userAddingLike: boolean = false;
    item?.reactions?.like.forEach((element: userIdInfo) => {
        if (element._id == userId) {
            userAddingLike = true;
        }
    });

    const data = `
  <div class="col-md-12 block w-100">
    <div class="card rounded">
        <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center justify-content-center">
                ${userInfo?.images?.profile?.url ?
            `<img src="${userInfo?.images?.profile?.url}" alt="Avatar1" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
            :
            `<img src="images/icons8-user-48.png" alt="Avatar2" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
        }                     
                    <div class="mx-2 cursor-pointer" role="button">
                        <p  onclick=showUserInfo('${item?.userId?._id}')>${item?.userId?.name}</p>
                        <p class="tx-11 text-muted">${getTimeInGoodWay(item.createdAt)}</p>
                    </div>
                </div>
        <div>
        ${condition
            ? `<button class="btn btn-outline-light mx-2" style="float: right;" onclick="handleClickDeleteButton('${idUpdate}', ${refresh} )">Delete</button>`
            : ""
        }
                    ${condition
            ? `<button class="btn btn-outline-light" style="float: right;" onclick={handleClickEditButton('${encodeURIComponent(
                JSON.stringify(item),
            )}' )}>edit</button>`
            : ""
        }
        </div>
            </div>
        </div>
        <div class="card-body" onclick=handleClickCard('${encodeURIComponent(JSON.stringify(item))}')>
            <p class="mb-3 tx-14" >${title}</p>
            ${item?.images[0]?.url ?
            `<img class="img-fluid cover card__image__post" src="${item?.images[0].url}" alt="">`
            : ""
        }
        </div>
        <div class="card-footer">
            <div class="d-flex align-items-center gap-2 justify-content-center text-center post-actions">
                <a href="javascript:;" class="d-flex align-items-center text-muted mr-4" onclick="addingLike('${item._id}', '${encodeURIComponent(JSON.stringify(item))}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${userAddingLike ? "red" : "none"}" stroke="${userAddingLike ? "red" : "currentColor"}" id="like__element_${item._id}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart icon-md mx-1
                        ${userAddingLike ? "bg__red" : ""}
                    ">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <p class="d-none d-md-block ml-2 mb-0" id="adding__like"><span>${item.reactions.like.length || ""}</span> Like</p>
                </a>
                <a href="javascript:;" class="d-flex align-items-center text-muted mr-4" onclick=handleClickCard('${encodeURIComponent(JSON.stringify(item))}')>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square icon-md mx-1">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <p class="d-none d-md-block ml-2 mb-0">Comment</p>
                </a>
                <a href="javascript:;" class="d-flex align-items-center text-muted" onclick="sharePost()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share icon-md mx-1">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <p class="d-none d-md-block ml-2 mb-0">Share</p>
                </a>
            </div>
          </div>
        </div>
    </div>
  </div>
        `
    return data;
}
export default templateCard;
