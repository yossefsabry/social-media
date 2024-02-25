// global veribal ....
const url = "https://tarmeezacademy.com/api/v1";
let postArray = [];
let currentPage = 1;
let lastPage;
let postInfo = [];
let user = {};
let updatePost = false;
let postIdUpdate = null;
let currentPostClick = null;


function reloadWindow() {
  window.location.reload(true);
}

/*
 * for  setup the loader for the app
 */
const loaderHandler = (status) => {
	if (status) {
		document.body.style.height = "100vh";
		document.querySelector(".loader__container").style.cssText =
			`z-index: 100000; opacity: 1;`;
	} else {
		document.body.style.height = "";
		document.querySelector(".loader__container").style.cssText =
			`z-index: -1; opacity: 0;`;
	}
};

/**
 * request for the api for data posts
 */
getRequest(false, currentPage);
async function getRequest(updatePost, current) {
	loaderHandler(true);
	const response = await axios
		.get(`${url}/posts?limit=5&page=${current}`)
		.then((response) => {
			postArray = response.data.data;
			// console.log(response);
			lastPage = response.data.meta.last_page;
			user = JSON.parse(localStorage.getItem("user"));
			console.log(" ---------------------", user);
		})
		.then(() => {
			let posts = document.querySelector(".posts");
			// for when update and delete post its delete the posts conatiner and adding the new posts
			if (updatePost == true) {
				posts.innerHTML = "";
			}
			postArray.map((item) => {
				console.log(item);
        currentPostClick = item;

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

				let id = item.id;
				// for update method
				postIdUpdate = id;
				const authorIdPost = item.author.id;
				// oldEcma script code
				let idUser;
				if (user !== null) {
					idUser = user.id;
				}
				let conditionEdit = idUser != null && authorIdPost == idUser;
				posts.innerHTML += `
            <div class="card" >
                <div class="card-header">
                  ${ typeof item.author.profile_image == "string" ? 
                        `<img src="${item.author.profile_image}" alt="Avatar" class="img-fluid my-1" style="width: 40px; height: 40px; border-radius: 50% !important;" />`
                        :
                        `<img src="images/icons8-user-48.png" alt="Avatar" class="img-fluid my-1" style="width: 40px; border-radius: 50% !important;" />`
                    }                     
                    <span onclick={showUserInfo('${encodeURIComponent(
											JSON.stringify(item),
										)}')} style="cursor: pointer;"><strong>${
											item.author.username
										}</strong></span>
                    ${
											conditionEdit
												? `<button class="btn btn-danger mx-2" style="float: right;" onclick={handleClickDeleteButton('${postIdUpdate}')}>Delete</button>`
												: ""
										}
                    ${
											conditionEdit
												? `<button class="btn btn-primary" style="float: right;" onclick={handleClickEditButton('${encodeURIComponent(
														JSON.stringify(item),
                            )}')}>edit</button>`
												: ""
										}
                </div>
                <div class="card-body" onclick="handleClickCard(${id})">
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
	loaderHandler(false);
	return response;
}

/**
 * adding pagination for the website
 */
//  fix
let isFetching = false;
window.addEventListener("scroll", () => {
	if (
		!isFetching &&
		window.pageYOffset + 3000 >= document.body.offsetHeight &&
		currentPage < lastPage &&
		postInfo.length == 0
	) {
		isFetching = true; // Set flag to true when a request is initiated
		currentPage = currentPage + 1;
		getRequest(false, currentPage)
			.then(() => {
				isFetching = false;
			})
			.catch(() => {
				console.log("error happend pagination");
			});
	}
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
	loaderHandler(true);
	axios
		.post(`${url}/login`, data)
		.then((response) => {
			// hide modal
			const modal = document.getElementById("login-modal");
			const modalInstance = bootstrap.Modal.getInstance(modal);
			modalInstance.hide();
			setLocalStorageInfo(
				response.data.token,
				JSON.stringify(response.data.user),
			);
			// createAlert();
			createAlert("Login successful! Welcome back!", "success");
			setupUi();
		})
		.catch((e) => {
			createAlert(`error happend: ${e}`, "danger");
		});
	loaderHandler(false);
});

/**
 * handle the logout
 */
document.getElementById("logout-button").addEventListener("click", () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	setupUi();
  reloadWindow();
	createAlert("Logout successful! Goodbye, and have a great day!", "info");
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
        <img src=${user.profile_image} alt="avatar" />
        <strong class="text-white">${user.name}</strong>
    `;

	const userInfo = `
        <img src="images/icons8-user-48.png" alt="avatar" />
        <strong class="text-white">${user.name}</strong>
    `;

	// Assuming you have an HTML element with the id "info-user-nav"
	if (typeof user.profile_image == "string") {
		document.querySelector(".info-user-nav").innerHTML = infoUserNav;
	} else {
		document.querySelector(".info-user-nav").innerHTML = userInfo;
	}
};

/**
 * for setup the ui fo the website
 */
const setupUi = () => {
	const token = localStorage.getItem("token");
	const user = JSON.parse(localStorage.getItem("user"));
	const login = document.getElementById("login-wrapper");
	const logout = document.getElementById("logout-wrapper");
	const icon = document.getElementById("icon__adding");

	if (token == null) {
		login.style.cssText = "display:flex !important";
		logout.style.cssText = "display:none !important";
		icon.style.cssText = "display: none !important";
	} else {
		createUserLoginInfoNavBar(user);
		login.style.cssText = "display:none !important";
		logout.style.cssText = "display:flex !important";
		icon.style.cssText = "display: block !important";
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
	const image = document.getElementById("image-register").files[0];

	const dataForm = new FormData();
	dataForm.append("name", user);
	dataForm.append("username", username);
	dataForm.append("email", email);
	dataForm.append("password", password);
	dataForm.append("image", image);

	// old way for post the data in register
	// const data = {
	//   name: user,
	//   username: username,
	//   email: email,
	//   password: password,
	// };

	loaderHandler(true);
	axios
		.post(`${url}/register`, dataForm)
		.then((response) => {
			console.log(response);
			createAlert("Registration successful! now login.", "info");

			const modal = document.getElementById("register-modal");
			const modalInstance = bootstrap.Modal.getInstance(modal);
			modalInstance.hide();
			setLocalStorageInfo(response.data.token, JSON.parse(response.data.user));
			setupUi();
		})
		.catch((e) => {
			// old ecma script
			createAlert(
				"error: " + (e.response.data.message || "An unknown error occurred"),
				"danger",
			);
			console.log(e);
		});
	loaderHandler(false);
});

// todo: alert fix hidden
const createAlert = (message, type) => {
	const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
	const appendAlert = (message, type) => {
		const wrapper = document.createElement("div");
		wrapper.innerHTML = [
			`<div class="alert alert-${type} alert-dismissible" role="alert">`,
			`   <div>${message}</div>`,
			"   <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>",
			"</div>",
		].join("");

		alertPlaceholder.append(wrapper);

		// Hide the alert after 2 seconds
		setTimeout(() => {
			wrapper.remove();
		}, 3000);
	};
	appendAlert(message, type);
};

/**
 * create post for user that authorization
 */
document.querySelector("#create-post-button").addEventListener("click", () => {
	loaderHandler(true);
	const title = document.querySelector("#title-create-post").value;
	const body = document.querySelector("#body-create-post").value;
	const image = document.querySelector("#image-create-post").files[0];
	const token = localStorage.getItem("token");
	const formData = new FormData();
	formData.append("title", title);
	formData.append("body", body);
	formData.append("image", image);

	const headers = {
		authorization: `Bearer ${token}`,
	};
	if (!updatePost) {
		document.getElementById("create-post-button").innerHTML = "Create";
		document.getElementById("title-create-post").value = ``;
		document.getElementById("body-create-post").value = ``;

		const headers = {
			authorization: `Bearer ${token}`,
		};

		axios
			.post(`${url}/posts`, formData, { headers: headers })
			.then((response) => {
				console.log(response);
				createAlert("success create a new post ... ", "success");
				const modal = document.getElementById("create-post-modal");
				const modalInstance = bootstrap.Modal.getInstance(modal);
				modalInstance.hide();
				getRequest(true);
			})
			.catch((e) => {
				createAlert("error happend: " + e.request.responseText, "danger");
				console.log(e);
			});
	} else {
		formData.append("_method", "put");
		axios
			.put(`${url}/posts/${postIdUpdate}`, formData, { headers: headers })
			.then((response) => {
				console.log(response);
				createAlert("success create a new post ... ", "success");
				const modal = document.getElementById("create-post-modal");
				const modalInstance = bootstrap.Modal.getInstance(modal);
				modalInstance.hide();
				getRequest(true);
			})
			.catch((e) => {
				createAlert("error happend: " + e.request.responseText, "danger");
				console.log(e);
			});
		update = false;
	}
	loaderHandler(false);
});

/**
 * handle create an post page
 */
const handleClickCard = (e) => {
	// console.log(e);
	loaderHandler(true);
	axios
		.get(`${url}/posts/${e}`)
		.then((response) => {
			postInfo = [];
			postInfo = response.data.data;
			console.log("$$$$$$$$$$$$$$$$$$$$$$");
			console.log(postInfo);
		})
		.then(() => {
			let containerPost = document.querySelector(".container__posts");
			containerPost.innerHTML = "";
			let postIdUpdate = postInfo.id;
			const authorIdPost = postInfo.author.id;
			let conditionEdit = postIdUpdate != null && authorIdPost == postIdUpdate;
			let item = postInfo;
			const allComments = postInfo.comments.map((item) => {
				const comm = `
            <div class="comment pb-1">
              <div class="pt-1 flex align-items-center justify-content-center gap-3 pb-1">
              ${ typeof item.author.profile_image === "string" ? 
              `<img src="${item.author.profile_image}" alt="Avatar1" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
              :
              `<img src="images/icons8-user-48.png" alt="Avatar2" class="img-fluid my-1" style="width: 30px; height: 30px; border-radius: 50% !important;" />`
              }                     
              <span><strong>@${item.author.username}</strong></span>
              </div>
              <h5>${item.body}</h5>
            </div>
          `;
				return comm;
			});

			const post = `
          <h2 style="padding: 40px 0px 0px; color: white !important;">${postInfo.author.username} post</h2>
          <div class="card my-5">
            <div class="card-header">
              <img src="${postInfo.author.profile_image}" style="width: 40px; border-radius: 50%;" />
              <span onclick="showUserInfo('${encodeURIComponent(
								JSON.stringify(item),
							)}')" style="cursor: pointer;"><strong>${postInfo.author.username}</strong></span>
                ${
									conditionEdit
										? `<button class="btn btn-danger mx-2" style="float: right;" onclick={handleClickDeleteButton('${postIdUpdate}')}>Delete</button>`
										: ""
								}
                ${
									conditionEdit
										? `<button class="btn btn-primary" style="float: right;" onclick={handleClickEditButton('${encodeURIComponent(
												JSON.stringify(item),
										  )}')}>edit</button>`
										: ""
								}
            </div>
            <div class="card-body">
              <img src="${postInfo.image}" alt="image post" style="width: 100%; height: 500px; padding-bottom: 3px;" />
              <h6 style="color: #777;">${postInfo.create_at}</h6>
              <h4>${postInfo.title}</h4>
              <p>${postInfo.body}</p>
              <hr />
              <div class="d-flex gap-3 justify-content-start align-items-center">
                <a href="#">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                    </svg>
                  </span>
                  (${postInfo.comments_count}) Commits
                </a>
              </div>
              <!-- Comments Section -->
                <br />
              <div class="comments-section">
                <h3 style="text-decoration: underline; margin-bottom: 20px; width: 300px;">Comments</h3>
                  ${allComments}
              </div>
            </div>
          <div class="input-group">
            <input id="comment__input" type="text" class="form-control py-2" placeholder="add comment..." aria-label="Enter something..." aria-describedby="button-addon">
            <button class="btn btn-primary" type="button" id="button-addon" onclick="handleAddingComment(${e})">Add Comment</button>
          </div>
          </div>
		`;
			containerPost.innerHTML = post;
		})
		.catch((e) => {
			console.log("error happend", e);
			createAlert("error happend " + e, "danger");
		});
	loaderHandler(false);
};

/**
 * handle create comment for  the user
 */
const handleAddingComment = (e) => {
	console.log("adding comment");
	let commentValue = document.querySelector("#comment__input").value;
	let token = localStorage.getItem("token");
	const data = {
		body: commentValue,
	};
	const headers = {
		authorization: `Bearer ${token}`,
	};
	loaderHandler(true);
	axios
		.post(`${url}/posts/${e}/comments`, data, { headers: headers })
		.then((response) => {
			console.log(response);
			createAlert("success adding commit to the post", "success");
			handleClickCard(e);
		})
		.catch((e) => {
			console.log("error happend", e);
			createAlert("error happend " + e.request.response, "danger");
		});
	loaderHandler(false);
};

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

	// set update for change the axios request
	update = true;
};

/**
 * for handle the deleting button for the post that user made
 */
const handleClickDeleteButton = (e, refresh) => {
	console.log(e);
	const token = localStorage.getItem("token");
	const headers = {
		authorization: `Bearer ${token}`,
	};
	loaderHandler(true);
	axios
		.delete(`${url}/posts/${e}`, { headers: headers })
		.then((response) => {
			console.log(response);
			getRequest(true);
			createAlert("deleting the post successfuly ", "success");
      // FIX handle the fix click
      if(refresh) {
        showUserInfo(currentPostClick);
      }
		})
		.catch((e) => {
			console.log(e);
			createAlert("error happend in deleting", "danger");
		});
	loaderHandler(false);
};

/**
 * for show the user info
 */
const showUserInfo = async (element) => {
	// to stop fetching data for pagination
	isFetching = true;
	let content = document.querySelector(".container__posts");
	let user;
	let userProfile;
	loaderHandler(true);
	if (element == null) {
		user = JSON.parse(localStorage.getItem("user"));
		userProfile = true;
	} else {
		user = JSON.parse(decodeURIComponent(element));
		user_id = user.author.id;
		userProfile = false;
		const request = await axios
			.get(`${url}/users/${user_id}`)
			.then((response) => {
				// console.log(response);
				user = response.data.data;
			})
			.catch((e) => console.log(e));
	}
	if (user == null) {
		createAlert("no user sign in ..", "danger");
	} else {
		let postUser;
		console.log(user.id);
		loaderHandler(true);
		const requestPost = await axios
			.get(`${url}/users/${user.id}/posts`)
			.then((response) => {
				// console.log(response);
				postUser = response.data.data;
			})
			.catch((e) => console.log("error happend", e));
		// console.log(postUser);

		const allPostUser = postUser.map((item, index) => {
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

			let id = item.id;
			// for update method
			postIdUpdate = id;
			const authorIdPost = item.author.id;
			// oldEcma script code
			const idUser = user.id;
			return `
            <div class="card" >
                <div class="card-header">
                    <img src=${item.author.profile_image} alt="profile image user" style="width: 40px; border-radius: 100%">
                    <span onclick={showUserInfo('${encodeURIComponent(
											JSON.stringify(item),
										)}')} style="cursor: pointer;"><strong>${
											item.author.username
										}</strong></span>
                    ${
											userProfile
												? `<button class="btn btn-danger mx-2" style="float: right;" onclick={handleClickDeleteButton('${postIdUpdate}')}>Delete</button>`
												: ""
										}
                    ${
											userProfile
												? `<button class="btn btn-primary" style="float: right;" onclick={handleClickEditButton('${encodeURIComponent(
														JSON.stringify(item),
                            )}' )}>edit</button>`
                          : ""
										}
                </div>
                <div class="card-body" onclick="handleClickCard(${id})">
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

		let userInfo = `
        <section class="h-100 profile__user" style="background-color: #f4f5f7; color: black;">
          <div class="container profile__user py-2 h-100 w-100">
            <div class="row d-flex justify-content-center align-items-center">
              <div class="col col-lg-9 mb-4 mb-lg-9">
                <div class="card mb-3" style="border-radius: .5rem;">
                  <div class="row g-0">
                    <div class="col-md-4 text-center text-white"
                      style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;  background-image: radial-gradient(circle, #051937, #09485f, #3f7a7d, #84ac98, #d2dcbc);">
                ${ typeof user.profile_image === "string" ? 
                        `<img src="${user.profile_image}" alt="Avatar1" class="img-fluid my-5" style="width: 80px; height: 80px; border-radius: 50% !important;" />`
                        :
                        `<img src="images/icons8-user-48.png" alt="Avatar2" class="img-fluid my-5" style="width: 80px; height: 80px; border-radius: 50% !important;" />`
                    }                     
                    <h5 class="text-white">${user.username}</h5>
                      <i class="far fa-edit mb-5"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body p-4">
                        <h6>Information</h6>
                        <hr class="mt-0 mb-4">
                        <div class="row pt-1 text-white">
                          <div class="col-6 mb-3">
                            <h6>Email</h6>
                            <p class="text-muted text-white" style="color: white !important;">${user.email}</p>
                          </div>
                          <div class="col-6 mb-3">
                            <h6>Phone</h6>
                            <p style="color: white !important;" class="text-muted text-white">123 456 789</p>
                          </div>
                        </div>
                        <h6>Activites</h6>
                        <hr class="mt-0 mb-4">
                        <div class="row pt-1">
                          <div class="col-6 mb-3">
                            <h6>Recent Posts</h6>
                            <p  style="color: white !important;" class="text-muted">${user.posts_count}</p>
                          </div>
                          <div class="col-6 mb-3">
                            <h6>Comments Counts</h6>
                            <p  style="color: white !important;" class="text-muted">${user.comments_count}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 style="text-decoration: underline; font-weight: bold;"> Posts User </h2>
                ${allPostUser}
                </div>
            </div>
          </div>
        </section>
    `;
		content.innerHTML = userInfo;
	}
	loaderHandler(false);
};

document
	.getElementById("profile-user")
	.addEventListener("click", () => showUserInfo(null));
