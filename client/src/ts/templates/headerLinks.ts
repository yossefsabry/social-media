export default function headerlinks(userFriends: number | "") {
    const data = `<div class="header-links">
                      <ul class="links d-flex align-items-center mt-3 mt-md-0">
                          <li class="header-link-item d-flex align-items-center active">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather   feather-columns mr-1 icon-md">
                                  <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                              </svg>
                              <a class="pt-1px d-none d-md-block" href="#">Timeline</a>
                          </li>
                          <li class="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user mr-1 icon-md">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                              <a class="pt-1px d-none d-md-block" href="#">About</a>
                          </li>
                          <li class="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users mr-1 icon-md">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <a class="pt-1px d-none d-md-block" href="#">Friends <span class="text-muted tx-12">${userFriends}</span></a>
                          </li>
                          <li class="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" eather feather-image mr-1 icon-md">
                                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                  <polyline points="21 15 16 10 5 21"></polyline>
                              </svg>
                              <a class="pt-1px d-none d-md-block" href="#">Photos</a>
                          </li>
                      </ul>
                  </div>`;
    return data;
}