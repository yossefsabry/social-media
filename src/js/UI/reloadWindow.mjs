/*
* This function is used to reload the window and scroll to the top of the page
*/
export default function reloadWindow() {
  window.location.reload(true);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
