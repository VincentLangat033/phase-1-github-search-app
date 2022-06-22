document.addEventListener('DOMContentLoaded', () => {
    //Add submit event listener to search form:
    document.querySelector('form#github-form').addEventListener('submit', handleSubmit)


// Event handler function:
function handleSubmit(e) {
    e.preventDefault();
    fetchUsers(e.target.search.value);
}

// Fetch all user objects for provided user input:
function fetchUsers(user) {
    fetch(`https://api.github.com/search/users?q=${user}`, {
        Accept: 'application/vnd.github.v3+json'
    })
    .then(resp => resp.json())
    .then(json => json.items.forEach(user => createUserList(user)))
}

// Create a new user list item for provided user and append to DOM:
function createUserList(user) {
    let li = document.createElement('li');
    li.className = 'user';
    //I use innerHTML because I am sure of the operations I want to do
    // alternatively use innerText and create elements
    li.innerHTML = `
        <img src="${user.avatar_url}" class="user-avatar" />
        <h3>${user.login}</h3>
        <a href="${user.html_url}">GitHub Profile</a>
    `
    // Add event listener to username:
    li.addEventListener('click', () => {
        fetchRepos(user.login);
    });

    // Append new user data to user list:
    document.querySelector('#user-list').appendChild(li);
}

// Fetch all user repo objects for clicked user:
function fetchRepos(userName) {
    fetch(`https://api.github.com/users/${userName}/repos`, {
        Accept: 'application/vnd.github.v3+json'
    })
    .then(resp => resp.json())
    .then(json => json.forEach(repo => createRepoList(repo)))
}

// Create a new repo list item for provided user and append to DOM:
function createRepoList(repo) {
    let li = document.createElement('li');
    li.className = 'repo';
    li.innerHTML = `
        <p>${repo.name}</p>
        <a href="${repo.html_url}">Repo Link</a>
    `
  // Append new user data to user list:
    document.querySelector('#repos-list').appendChild(li);
}
})