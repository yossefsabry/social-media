/**
 * handle click on edit button for my post
 */
const handleClickEditButton = (e) => {
  const element = JSON.parse(decodeURIComponent(e));
  console.log("element: ", element);

  document.getElementById("create-post-button").innerHTML = "Update";
  document.getElementById("title-create-post").value = `${element.title}`;
  document.getElementById("body-create-post").value = `${element.body}`;
  const modal = document.querySelector("#create-post-modal");
  const modalInstance = new bootstrap.Modal(modal, {});
  modalInstance.toggle();
};
export default handleClickEditButton; 