require('bulma');
const hello = require('hellojs');
const GITHUB = require('../config').GITHUB;

let $gitHubLoginButton = document.querySelector('.js-handle-github-login');
let $logoutButton = document.querySelector('.js-handle-logout')

let $navigation = document.querySelector('.navbar-start')

// AUTORIZATION
hello.init({
  github: GITHUB.CLIENT_ID
})

const renderUserDetails = (profile) => {
  const $container = document.querySelector('.user-details');
  const template = `
      <img src="${profile.avatar_url}" alt="avatar" style="display: block; margin-right: 10px;"/>
      <p>${profile.login}</p>
  `
  $container.innerHTML = template;
}

// make sure you have data
const isUserIndicate = hello('github').getAuthResponse();

//get user Informations
const getUserInformations = () => {
  hello('github').api('/me')
  .then((userProfile) => {
    renderUserDetails(userProfile)
  })
}

// if user is already logged in don't log him/her out after refresh
if (isUserIndicate !== null) {
  getUserInformations();
}

// log in user by Github
$gitHubLoginButton.addEventListener('click', () => {
  console.log('login');
  hello('github').login()
  .then(() => {
    getUserInformations()
  })
})

// log out user
$logoutButton.addEventListener('click', () => {
  console.log('logout');
  hello.logout('github')
    .then(() => location.reload())
})
