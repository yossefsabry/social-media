import { handleClickCard } from "../../../script.mjs";

function templateCard(item, condition, idUpdate, id, title, tags) {
  const card = `
<div class="card" >
    <div class="card-header">
        ${typeof item.author.profile_image == "string" ?
      `<img src="${item.author.profile_image}" alt="avatar" class="img-fluid my-1" style="width: 40px; height: 40px; border-radius: 50% !important;" />`
      :
      `<img src="images/icons8-user-48.png" alt="avatar" class="img-fluid my-1" style="width: 40px; border-radius: 50% !important;" />`
    }                     
        <span onclick="showuserinfo('${encodeURIComponent(JSON.stringify(item),
    )}')" style="cursor: pointer;"><strong>${item.author.username
    }</strong>
        </span>
        ${condition
      ? `<button class="btn btn-danger mx-2" style="float: right;" onclick={handleclickdeletebutton('${idUpdate}')}>delete</button>`
      : ""
    }
        ${condition ? `<button class="btn btn-primary" style="float: right;" onclick="handleclickeditbutton('${encodeURIComponent(JSON.stringify(item),)}')">edit</button>`
      : ""}
    </div>
    <div class="card-body" onclick="handleClickCard(${id})">
        <img src=${item.image} alt="image post" style="width: 100%;height: 500px;padding-bottom: 3px;" />
        <h6 style="color: #777;">${item.created_at}</h6>
        <h4>${title}</h4>
        <p>${item.body}</p>
        <hr />
        <div class="d-flex gap-3 justify-content-start align-items-center">
            <a href="#"> <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-pen-fill" viewbox="0 0 16 16"> <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059l4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056l6.854 4.854a.5.5 0 1 1-.708-.708l9.44.854a1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                  </svg> </span>
                  (${item.comments_count})commits
            </a>
            <span style="display: flex; gap: 5px;" class="category">
                ${tags}
            </span>
        </div>
    </div>
</div>
  `;
  return card;
}
export { templateCard };
