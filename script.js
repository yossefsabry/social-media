const url = "https://tarmeezacademy.com/api/v1";
let postArray = [];

/**
 * request for the api for data posts
 */
axios
    .get(`${url}/posts`)
    .then((response) => {
        postArray = response.data.data;
    })
    .then(() => {
        let posts = document.querySelector(".posts");
        postArray.map((item) => {
            // console.log(item);
            // loop for the tags for every post
            const tags = item.tags.map((tg) => {
                return `<div> ${tg}</div>`;
            });
            let title = "";
            // check if the title is null then  remove the title else add the title
            if (item.title == null) {
                title = "";
            } else {
                title = item.title;
            }
            posts.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <img src=${item.author.profile_image} alt="profile image user" style="width: 40px; border-radius: 100%">
                    <span><strong>${item.author.username}</strong></span>
                </div>
                <div class="card-body">
                    <img src=${item.image} alt="image post"
                    style="width: 100%;height: 500px;padding-bottom: 3px;">
                    <h6 style="color: #777;">${item.created_at}</h6>
                    <h4>${title}</h4>
                    <p>${item.body}</p>
                    <hr />
                    <div class="d-flex gap-3 justify-content-start align-items-center">
                        <a href="#"> <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16"> <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                        </svg> </span>
                            (${item.comments_count})Commits
                        </a>
                        <span style="display: flex; gap: 5px;" class="category">
                            ${tags}
                        </span>
                    </div>
                </div>
            </div>
`;
        });
    })
    .catch((error) => {
        console.log("error happend", error);
    })
    .finally(() => {
        console.log("request finsh...");
    });

/**
 * for loginBtn handler and send the data
 */
document.querySelector("#LoginBtn").addEventListener("click", () => {
    let username = document.querySelector("#username-input-login").value;
    let password = document.querySelector("#password-input-login").value;
    let data = {
        username: username,
        password: password,
    };
    axios
        .post(`${url}/login`, data)
        .then((response) => {
            // hide modal
            const modal = document.getElementById("login-modal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            setLocalStorageInfo(
                response.data.token,
                JSON.stringify(response.data.user)
            );
            // createAlertLogin();
            createAlertLogin( "Login successful! Welcome back!" , "success");
            setupUi();
        })
        .catch((e) => {
            createAlertLogin( `error happend: ${e}` , "danger");
        });
});

/**
 * handle the logout
 */
document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setupUi();
    createAlertLogin( "Logout successful! Goodbye, and have a great day!" , "info");
});

/**
 * this function for localStorage set the data
 */
const setLocalStorageInfo = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
};

/**
 * Create user component to add the info to nav for login
 * @param {Object} user - The user object containing information like name and image_profile.
 */
const createUserLoginInfoNavBar = (user) => {
    const infoUserNav = `
        <img src="${user.image_profile}" alt="avatar" />
        <strong>${user.name}</strong>
    `;
    // Assuming you have an HTML element with the id "info-user-nav"
    document.querySelector(".info-user-nav").innerHTML = infoUserNav;
};

/**
 * for set the nav bar buttons
 */
const setupUi = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const login = document.getElementById("login-wrapper");
    const logout = document.getElementById("logout-wrapper");

    if (token == null) {
        login.style.cssText = "display:flex !important";
        logout.style.cssText = "display:none !important";
    } else {
        createUserLoginInfoNavBar(user); 
        login.style.cssText = "display:none !important";
        logout.style.cssText = "display:flex !important";
    }
};
setupUi();


/**
 * handle register
 */
document.getElementById("RegisterBtn").addEventListener("click", () => {
    console.log("------- register ----------");
    const user = document.getElementById("user-register").value;
    const username = document.getElementById("username-register").value;
    const email = document.getElementById("email-register").value;
    const password = document.getElementById("password-register").value;
    const data = {
        name: user,
        username: username,
        email: email,
        password: password,
    };
    axios
        .post(`${url}/register`, data)
        .then((response) => {
            console.log(response);
            createAlertLogin("Registration successful! Welcome to our platform.", "info");
            createAlertLogin("you are loged in now ...", "success");

            const modal = document.getElementById("register-modal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            setLocalStorageInfo( response.data.token, JSON.stringify(response.data.user));
            setupUi();
        })
        .catch((e) => {
            // old ecma script
            createAlertLogin("error: " + (e.response?.data?.message || "An unknown error occurred"), "danger");
            console.log(e);
        });
});

// todo: alert fix hidden
const createAlertLogin = (message, type) => {
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
    const appendAlert = (message, type) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            "   <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>",
            "</div>",
        ].join("");

        // console.log(alertPlaceholder);
        alertPlaceholder.append(wrapper);
    };
    appendAlert(message, type);
};
