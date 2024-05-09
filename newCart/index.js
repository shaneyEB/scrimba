import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://movies-4050e-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const error = document.getElementById("error")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    if (inputValue === null || inputValue === undefined || inputValue === "") {
        error.innerHTML = " Please check the input field... Try again!"

    } else {
        let values = {
            "item": inputValue,
            "active": "white"
        }
        push(shoppingListInDB, values)
        clearInputFieldEl()
        error.innerHTML = ""
    }
})

onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

  function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }

function appendItemToShoppingListEl(item) {

  
    let itemID = item[0]
    let itemValue = item[1]


    let deleteItem = document.createElement("div")
    deleteItem.textContent = "✂️"
    deleteItem.className = "right"
    let toggleItem = document.createElement("div")
    toggleItem.textContent = "💙"
    toggleItem.className = "right"
    let newEl = document.createElement("li")
    newEl.className = itemValue.active
    // newEl.innerHTML = `<div class="main"> ${itemValue.item} </div>`
    newEl.append(toggleItem)
    newEl.append(deleteItem)

    let main = document.createElement("div")
    main.innerHTML = ` &nbsp; ${itemValue.item}`
    main.className = "main"

    newEl.append(main)

    deleteItem.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    toggleItem.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        if (itemValue.active === "green") {
            let values = {
                "active": "white",
                "item": itemValue.item
            }
            update(exactLocationOfItemInDB, values)
        }
        else {
            let values = {
                "active": "green",
                "item": itemValue.item
            }
            update(exactLocationOfItemInDB, values)
        }
    })

    shoppingListEl.append(newEl)
}