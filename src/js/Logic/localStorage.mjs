
/**
 * this function for localStorage set the data
 * @param {number} token - the token for the user
 * @param {object} user - the user object info
 */
const setLocalStorageInfo = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", user);
};


export default setLocalStorageInfo;
