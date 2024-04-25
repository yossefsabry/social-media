// import bootstrap, { Modal } from "bootstrap"
import { Modal } from "bootstrap";
/**
 * handle click on edit button for my post
 *@param {string} e - is string but object to card 
 */
const handleClickEditButton = (e: any) => {
  const element: any = JSON.parse(decodeURIComponent(e));
  console.log("element: ", element);

  (document.getElementById("create-post-button") as HTMLButtonElement).innerHTML = "Update";
  (document.getElementById("title-create-post") as HTMLButtonElement ).value = `${element.title}`;
  (document.getElementById("body-create-post") as HTMLButtonElement).value = `${element.body}`;
  const modal: HTMLElement = (document.querySelector("#create-post-modal") as HTMLElement);
  const modalInstance: Modal = new bootstrap.Modal(modal, {});
  modalInstance.toggle();
};
export default handleClickEditButton; 
