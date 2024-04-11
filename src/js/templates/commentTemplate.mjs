
/**
 * 
 * @param {object} item - the object for the item comment
 * @returns {HTMLDivElement} - the commment for html tree
 */
function templateComment(item) {
  const comm = `
      <div class="comment pb-1" onclick={showUserInfo('${encodeURIComponent( JSON.stringify(item))}')} >
        <div class="pt-1 flex align-items-center justify-content-center gap-3 pb-1">
          ${typeof item.author.profile_image === "string" ?
      `<img src="${item.author.profile_image}" alt="Avatar1" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
      :
      `<img src="images/icons8-user-48.png" alt="Avatar2" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
    }                     
          <span><strong>@${item.author.username}</strong></span>
          </div>
          <h5>${item.body}</h5>
        </div>
        <hr />
      `;
  return comm;
}
export default templateComment;
