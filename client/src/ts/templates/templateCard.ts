import axios from "axios";
import { handleClickDeleteButton, handleAddingComment, showUserInfo, handleClickCard, handleClickEditButton, getTimeInGoodWay } from "../index.ts";
import { CustomWindow } from "../interface.ts";
import { url } from "../storeData.ts";

/**
 * @param {object} item - the current card item full object
 * @param {boolean} condition - the condition for show the delete and edit buttons
 * @param {number} idUpdate - the id for the card
 * @param {number} id - the id for the card
 * @param {string} title - the title for the card
 * @param {HTMLElementEventMap} tags - for html with all tags
 * @returns {object} - returns the card for the html tree
 */
function templateCard(item: any, condition: boolean, idUpdate: number,title: string,  userInfo: any): string {
  // global defeind the method to can read by html
  const customWindow = window as CustomWindow;

  customWindow.showUserInfo = showUserInfo;
  customWindow.handleClickCard = handleClickCard;
  customWindow.handleAddingComment = handleAddingComment;
  customWindow.handleClickDeleteButton = handleClickDeleteButton;
  customWindow.handleClickEditButton = handleClickEditButton;


//   const card = `
// <div class="card" >
//     <div class="card-header">
//     ${userInfo?.user?.images?.profile?.url ?
//     `<img src="${userInfo!.user!.images!.profile!.url}" alt="avatar" class="img-fluid my-1" style="width: 40px; height: 40px; border-radius: 50% !important;" />`
//     :
//     `<img src="images/icons8-user-48.png" alt="avatar" class="img-fluid my-1" style="width: 40px; border-radius: 50% !important;" />`
//   }    
//     <span onclick=showUserInfo('${userInfo?.user._id}') style="cursor: pointer;"><strong>${userInfo?.user.name}</strong> </span>
//         ${condition
//       ? `<button class="btn btn-danger mx-2" style="float: right;" onclick={handleClickDeleteButton('${idUpdate}')}>delete</button>`
//       : ""
//     }
//         ${condition ? `<button class="btn btn-primary" style="float: right;" onclick="handleClickEditButton('${encodeURIComponent(JSON.stringify(item),)}')">edit</button>`
//       : ""}
//     </div>
//     <div class="card-body" onclick=handleClickCard(${id})>
//         <p class='text-sm py-2'>${title}</p>
//           ${ item.images[0]?.url ?
//          `<img src=${item.images[0]?.url} alt="image post" style="width: 100%;height: 500px;padding-bottom: 3px;" /> `
//          : "" }
//         <h6 style="color: #777;">${getTimeInGoodWay(item.createdAt)}</h6>
//         <hr />
//         <div class="d-flex gap-3 justify-content-start align-items-center">
//         <a href="#"> <span>
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16"> <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
//         </svg> </span>
//             (${item.commnets | 0})Commits
//         </a>
//             <span style="display: flex; gap: 5px;" class="category">
//                <!-- comment or tags here -->
//             </span>
//         </div>
//     </div>
// </div>
//   `;
//   return card;
   const data = `
  <div class="col-md-12">
    <div class="card rounded">
        <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center justify-content-center">
                ${userInfo?.userId?.images?.profile?.url ?
            `<img src="${userInfo?.userId?.images?.profile?.url}" alt="Avatar1" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
            :
            `<img src="images/icons8-user-48.png" alt="Avatar2" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
        }                     
                    <div class="mx-2 cursor-pointer" role="button">
                        <p  onclick=showUserInfo('${userInfo?.user?._id}')>${userInfo?.user?.name}</p>
                        <p class="tx-11 text-muted">${getTimeInGoodWay(item.createdAt)}</p>
                    </div>
                </div>
        <div>
        ${condition
        ? `<button class="btn btn-danger mx-2" style="float: right;" onclick="handleClickDeleteButton('${idUpdate}', true)">Delete</button>`
            : ""
        }
                    ${condition
            ? `<button class="btn btn-primary" style="float: right;" onclick={handleClickEditButton('${encodeURIComponent(
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
                <a href="javascript:;" class="d-flex align-items-center text-muted mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart icon-md mx-2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <p class="d-none d-md-block ml-2 mb-0">Like</p>
                </a>
                <a href="javascript:;" class="d-flex align-items-center text-muted mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square icon-md mx-2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <p class="d-none d-md-block ml-2 mb-0">Comment</p>
                </a>
                <a href="javascript:;" class="d-flex align-items-center text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share icon-md mx-2">
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
