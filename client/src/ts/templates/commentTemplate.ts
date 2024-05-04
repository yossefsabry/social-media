import { postInfoComments } from "../interface";

/**
 * 
 * @param {object} item - the object for the item comment
 * @returns {HTMLDivElement} - the commment for html tree
 */
async function templateComment(comments: Array<postInfoComments>, id: number): Promise<string> {
  // const windowCustomed = window as CustomWindow;
  // windowCustomed.handleAddingComment = handleAddingComment;


   // Reverse the order of comments
   const reversedComments: Array<postInfoComments> = comments.reverse();
  // console.log("-----------------------")
  // console.log(comments)
  const allComments: string = reversedComments.map((item: any) => {
    // console.log(item)
      return `
        <div class="card">
          <div class="card-body">
            <p>${item.text}</p>
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center" onclick="showUserInfo('${item.userId._id}')">
                <img ${ item?.userId?.images?.profile?.url ?  `src="${item.userId.images.profile.url}"` : `src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"`} alt="avatar" width="25" height="25" />
                <p class="small mb-0 ms-2">${item.userId.name}</p>
              </div>
              <div class="d-flex flex-row align-items-center">
                <p class="small text-muted mb-0 mx-1">like -${item.reactions.like.length == 0 ? "" : item.reactions.like.length } </p>
                <p class="small text-muted mb-0 mx-1">reply?</p>
                <i class="far fa-thumbs-up ms-2 fa-xs text-body" style="margin-top: -0.16rem;"></i>
              </div>
            </div>
          </div>
        </div>
      `
  }).join('');


  const comm: string = `
  <div class="row d-flex justify-content-center mb-5 w-100 ">
  <div class="col-12 col-md-12 col-lg-12">
    <div class="card shadow-0 overflow-auto">
      <div class="card-body p-4 h-100">
        ${allComments}
      </div>
    </div>
  </div>
</div>
      `;
  return comm;
}
export default templateComment;
