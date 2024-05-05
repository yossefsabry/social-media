import { user } from "../storeData";
import userAboutProfile from "../templates/userAboutProfile";


export default function handleShowUserAbout() {
  console.log("about page");
  let data: string = " no user found";
  if (user.value !== undefined )
    data = userAboutProfile(user.value, true);

  const element: HTMLElement = document.getElementById("profile__body__user") as HTMLElement;
  // for some style
  (document.querySelector(".profile-page") as HTMLElement).style.cssText = `
      width: 100% !important;
`;

  element.innerHTML = `
       <div class="row profile-body w-100" id="profile__body__user">
          <div class="d-md-block left-wrapper py-4 ">
              <div class="card rounded">
                ${data}
            </div>
          </div>
       </div>
`;
  
  // get all post and convert the array to array from for map and adding display none
  Array.from((document.querySelectorAll("#card__post"))).map((item: any) => { item.style.cssText = `display: none !important;`}); 
}
