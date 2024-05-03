/*
* This function is used to reload the window and scroll to the top of the page
*/
export default function reloadWindow(): void {
  window.location.reload();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
