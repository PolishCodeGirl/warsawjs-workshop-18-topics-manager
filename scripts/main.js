require('bulma');
const hello = require('hellojs');

let $gitHubLoginButton = document.querySelector('.js-handle-github-login');
let $logoutButton = document.querySelector('.js-handle-logout')

// AUTORIZATION
hello.init({
  github: '20a5918802cfa445ea66'
})

const renderUserDetails = (profile) => {
  const template = `
    <div class="user-details navbar-item">
      <img src="${profile.avatar_url}" alt="avatar"/>
      <p>${profile.login}</p>
    </div>
  `
  document.querySelector('.navbar-start').innerHTML += template;

}

$gitHubLoginButton.addEventListener('click', () => {
  hello('github').login()
  .then(function () {
    return hello('github').api('/me')
  })
  .then((userProfile) => {
    renderUserDetails(userProfile)
  })
})


// $logoutButton.addEventListener('click', () => {
//   console.log('hej helołłłłł');
// })
