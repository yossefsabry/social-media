import getTimeInGoodWay from "../Logic/calcCreatedPosts";
/**
 * @param {object} item - the post template
 * @param {number} idPost - the id for the post
 * @param {number} id - the second id for the post   
 * @param {boolean} condition - the condition for the post
 * @returns {HTMLDivElement} - return the templateUser
 */
function userInfoPostTemplate(item: any, idPost: number, id: number, condition: any): string {
    const data = `
<div class="col-md-12">
    <div class="card rounded">
        <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center justify-content-center">
                ${item?.userId?.images?.profile?.url ?
            `<img src="${item?.userId?.images?.profile?.url}" alt="Avatar1" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
            :
            `<img src="images/icons8-user-48.png" alt="Avatar2" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
        }                     
                    <div class="mx-2">
                        <p>${item.userId.name}</p>
                        <p class="tx-11 text-muted">${getTimeInGoodWay(item.createdAt)}</p>
                    </div>
                </div>
        <div>
        ${condition
        ? `<button class="btn btn-danger mx-2" style="float: right;" onclick="handleClickDeleteButton('${idPost}', true)">Delete</button>`
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
        <div class="card-body">
            <p class="mb-3 tx-14">${item.title || ""}</p>
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
export default userInfoPostTemplate;
