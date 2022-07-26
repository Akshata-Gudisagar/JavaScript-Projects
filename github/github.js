const APIURL = "http://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
getUser("drmesazim");
async function getUser(username){
    const resp = await fetch (APIURL + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}
async function getRepos(username){
    const resp = await fetch (APIURL + username + "/repos");
    const respData = await resp.json();
   addReposToCard(respData);
}
function createUserCard(user){
    const cardHTML = `${user.name}${user.bio}${user.followers}Followers${user.following}Following${user.public_repos}Repos
    `;

    
    main.innerHTML =cardHTML;
}
function addReposToCard(repos){
    const reposEl = document.getElementById("repos");
    repos
     .sort((a, b) => b.stargazers_count - a.stargazers_count)
     .slice(0,10)
     .forEach((repo) =>{
        const reposEl = document.getElementById("a");
        reposEl.classList.add("repo");
        reposEl.href = repo.html_url;
        reposEl.target = "_blank";
        reposEl.innerText = repo.name;
        reposEl.appendChild(reposEl);
     });
}
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const user = search.value;
    if (user){
        getUser(user);
        search.value ="";
    }
});