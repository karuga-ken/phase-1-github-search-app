document.addEventListener("DOMContentLoaded", function() {
    const search = document.querySelector("#main")
    const newSearch = document.createElement("div")
    
    newSearch.innerHTML = `
        
    <h2>GitHub Search</h2>
    
    <form id='github-form'>
      <input id='search' type='text' name='search'>
      <input type='submit' name='submit'/>
    </form>
    
    <div id='github-container'>
      <ul id='user-list'>
        
      </ul>
    
      <ul id='repos-list'>
    
      </ul>
    </div>
    `
    search.appendChild(newSearch)

    const githubForm = document.querySelector("#github-form") //listening for input in the form 
    githubForm.addEventListener("submit", function(e){
        e.preventDefault()
        const userInput = document.querySelector("#search").value //input from the user
        fetchUser(userInput)
    } )
})

const Base_Url = "https://api.github.com/search/users?q=" //link to github's API

function fetchUser(searchQueries){
    const configurationObject = {
        Headers: {
            Accept: "application/vnd.github.v3+json"
        }
    }
    const searchLink = `${Base_Url}${searchQueries}`
    fetch(searchLink, configurationObject)
    .then ((res) => res.json())
    .then ((data) => showForm(data.items))
    .then ((data) => showForm(data.items))
    .catch((error) => {
        console.log("Error:", error)
    })
}
function showForm(item){ //function to display a list of usernames
    const listUser = document.querySelector("#user-list")
    listUser.innerHTML = ""
    item.forEach((user) => {
        listUser.innerHTML += `<li><a href = "${user.html_url}">${user.login}</li>` //displays the list of users and links them to their accounts
    })
}
