
/**
 * for  setup the loader for the app
 * @param {boolean} status - for the status for the loader is off or on
 */
const loaderHandler = (status: boolean) => {
  if (status) {
    document.body.style.height = "100vh";
    (document.querySelector(".loader__container") as HTMLElement ).style.cssText = "z-index: 100000000; opacity: 1;";
  } else {
    document.body.style.height = "";
    (document.querySelector(".loader__container") as HTMLElement ).style.cssText = "z-index: -1; opacity: 0;";
  }
};

export default loaderHandler;

