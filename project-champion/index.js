

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://movies-4050e-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const listInDB = ref(database, "posts")


const inputMain = document.getElementById("input-main")
const inputFrom = document.getElementById("input-from")
const inputTo = document.getElementById("input-to")
const addButtonEl = document.getElementById("add-btn")
const eList = document.getElementById("eList")

onValue(listInDB, function (snapshot) {
    clearList();
    let array = Object.values(snapshot.val())
    for (let i = 0; i < array.length; i++) {
        let post = array[i]
        appendPost(post)
    }
})


function appendPost(post) {

    eList.innerHTML += `
    <li>
        <h3>To ${post.to}</h3> 
        <p>${post.main}</p> 
        <div class="post-container">
        <h3>From ${post.from}</h3> 
        </div>
  </li>`
}


addButtonEl.addEventListener("click", function () {
    let main = inputMain.value
    let to = inputTo.value
    let from = inputFrom.value

    let postx = {
        to: to,
        from: from,
        main: main,
        likes: '0'
    }
    push(listInDB, postx)
    clearInputs()
})

function clearList() {
    eList.innerHTML = ""
}

function clearInputs() {
    inputMain.value = "";
    inputFrom.value = "";
    inputTo.value = "";
}