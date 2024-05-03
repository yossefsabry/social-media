
/**
 * this function for localStorage set the data
 * @param {number} token - the token for the user
 * @param {object} user - the user object info
 */
const setLocalStorageInfo = (token: string, accessToken: string): void => {
  localStorage.setItem("token", token);
  localStorage.setItem("accessToken", accessToken);
};

export const setUserLocalStorageInfo = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
}

export default setLocalStorageInfo;
