import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://movies-4050e-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const details = document.getElementById("details")
const xAppInDB = ref(database, "xBullets")
const cartridge = document.getElementById("cartridge")
const bulletWeight = document.getElementById("bulletWeight")
const bulletType = document.getElementById("bulletType")
const bc = document.getElementById("bc")
const primer = document.getElementById("primer")
const powder = document.getElementById("powder")
const powderCharge = document.getElementById("powderCharge")
const maxVelocity = document.getElementById("maxVelocity")
const minVelocity = document.getElementById("minVelocity")
const avgVelocity = document.getElementById("avgVelocity")
const sd = document.getElementById("sd")
const notes = document.getElementById("notes")
const addButtonEl = document.getElementById("add-button")
const xAppEl = document.getElementById("list")
const error = document.getElementById("error")
const create = document.getElementById("create")
const xForm = document.getElementById("xForm")

create.addEventListener("click", function() {
    xForm.style.display = "block"
    create.style.display = "none"
})

addButtonEl.addEventListener("click", function() {
    let val1 = cartridge.value
    let val2 = bulletWeight.value
    let val3 = bulletType.value
    let val4 = bc.value
    let val5 = primer.value
    let val6 = powder.value
    let val7 = powderCharge.value
    let val8 = maxVelocity.value
    let val9 = minVelocity.value
    let val10 = avgVelocity.value
    let val11 = sd.value
    let val12 = notes.value


    if ((val1 === null || val1 === undefined || val1 === "") ||
        (val2 === null || val2 === undefined || val2 === "") ||
        (val3 === null || val3 === undefined || val3 === "") ||
        (val4 === null || val4 === undefined || val4 === "") ||
        (val5 === null || val5 === undefined || val5 === "") ||
        (val6 === null || val6 === undefined || val6 === "") ||
        (val7 === null || val7 === undefined || val7 === "") ||
        (val8 === null || val8 === undefined || val8 === "") ||
        (val9 === null || val9 === undefined || val9 === "")

    ) {
        error.innerHTML = " Please check the input field... Try again!"

    } else {
        let values = {
            "cartridge": val1,
            "bulletWeight": val2,
            "bulletType": val3,
            "bc": val4,
            "primer": val5,
            "powder": val6,
            "powderCharge": val7,
            "maxVelocity": val8,
            "minVelocity": val9,
            "avgVelocity": val10,
            "sd": val11,
            "notes": val12,
            "active": "white"
        }
        push(xAppInDB, values)
            // clearInputFieldEl()
        error.innerHTML = ""
    }
})

onValue(xAppInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearxAppEl()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            appendItemToxAppEl(currentItem)
        }
    } else {
        xAppEl.innerHTML = "No items here... yet"
    }
})


function clearxAppEl() {
    xAppEl.innerHTML = ""
}

function clearInputFieldEl() {
    cartridge.value = ""
    bulletWeight.value = ""
    bulletType.value = ""
}


function appendItemToxAppEl(item) {
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
    newEl.append(toggleItem)
    newEl.append(deleteItem)

    let main = document.createElement("div")
    main.innerHTML = ` &nbsp; 
    Cartridge Name: ${itemValue.cartridge} 
    Bullet Weight: ${itemValue.bulletWeight}
    Bullet Type: ${itemValue.bulletType}
    BC: ${itemValue.bc}
    Primer: ${itemValue.primer}
    Powder: ${itemValue.powder}
    Powder Charge: ${itemValue.powderCharge}
    Max Velocity: ${itemValue.maxVelocity}
    Min Velocity: ${itemValue.minVelocity}
    Avg Velocity: ${itemValue.avgVelocity}
    SD: ${itemValue.sd}
    Notes: ${itemValue.notes}
    `
    main.className = "main"
    newEl.append(main)

    details.innerHTML += `
    <tr>
        <td>${itemValue.cartridge} </td>
        <td> ${itemValue.bulletWeight}</td>
        <td> ${itemValue.bulletType}</td>
        <td> ${itemValue.bc}</td>
        <td> ${itemValue.primer}</td>
        <td> ${itemValue.powder}</td>
        <td> ${itemValue.powderCharge}</td>
        <td> ${itemValue.maxVelocity}</td>
        <td> ${itemValue.minVelocity}</td>
        <td> ${itemValue.avgVelocity}</td>
        <td> ${itemValue.sd}</td>
        <td> ${itemValue.notes}</td>
    </tr>
    `

    deleteItem.addEventListener("click", function() {

        let exactLocationOfItemInDB = ref(database, `xBullets/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    toggleItem.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `xBullets/${itemID}`)


        if (itemValue.active === "green") {
            let values = {
                "active": "white",
            }
            update(exactLocationOfItemInDB, values)
        } else {
            let values = {
                "active": "green",
            }
            update(exactLocationOfItemInDB, values)
        }
    })

    xForm.style.display = "none"
    create.style.display = "block"

    xAppEl.append(newEl)
}