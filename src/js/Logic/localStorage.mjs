
/**
 * this function for localStorage set the data
 */
const setLocalStorageInfo = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", user);
};


export default setLocalStorageInfo;
