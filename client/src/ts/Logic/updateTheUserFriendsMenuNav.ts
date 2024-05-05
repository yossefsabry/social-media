import { user } from "../storeData";
export default function updateNavFriendMenu() {
  const element: HTMLElement = (document.getElementById("dropmenu__wrapper__friends") as HTMLElement);

    console.log(user);
    if (user!.value!.connections!.accepted.length <= 0) {
        element.innerHTML = `
          <h4 class="text-white text-decoration-underline d-block w-100 text-center p-5">
              Empty
          </h4>
      `;
    }else {
      console.log(user);
    };
};
