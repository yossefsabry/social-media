const url = "https://tarmeezacademy.com/api/v1";
let postArray = [];

axios
   .get(`${url}/posts`)
   .then((response) => {
      postArray = response.data.data;
   })
   .then(() => {
      let posts = document.querySelector(".posts");
      postArray.map((item) => {
         console.log(item);
         // loop for the tags for every post
         const tags = item.tags.map((tg) => {
            return `<div> ${tg}</div>`;
         });
         let title = "";
         // check if the title is null then  remove the title else add the title
         if (item.title == null) {
            title = "";
         } else {
            title = item.title;
         }
         posts.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <img src=${item.author.profile_image} alt="profile image user" style="width: 40px; border-radius: 100%">
                    <span><strong>${item.author.username}</strong></span>
                </div>
                <div class="card-body">
                    <img src=${item.image} alt="image post"
                        style="width: 100%;height: 500px;padding-bottom: 3px;">
                    <h6 style="color: #777;">${item.created_at}</h6>
                    <h4>${title}</h4>
                    <p>${item.body}</p>
                    <hr />
                    <div class="d-flex gap-3 justify-content-start align-items-center">
                        <a href="#">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pen-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                                </svg>
                            </span>
                            (${item.comments_count})Commits
                        </a>
                        <span style="display: flex; gap: 5px;" class="category">
                            ${tags}
                        </span>
                    </div>
                </div>
            </div>
            `;
      });
   })
   .catch((error) => {
      console.log("error happend", error);
   })
   .finally(() => {
      console.log("request finsh...");
   });

// onclick in login button for the form login
document.querySelector("#LoginBtn").addEventListener("click", () => {
   let username = document.querySelector("#username-input-login").value;
   let password = document.querySelector("#password-input-login").value;
   let data = {
      username: username,
      password: password,
   };
   console.log(data);

   axios.post(`${url}/login`,data)
   .then((response) => console.log(response));



});
