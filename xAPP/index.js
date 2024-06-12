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
const cancelButtonEl = document.getElementById("cancel-button")
const xAppEl = document.getElementById("list")
const error = document.getElementById("error")
const create = document.getElementById("create")
const xForm = document.getElementById("xForm")
const idx = document.getElementById("idx")
const xView = document.getElementById("xView")
const dataTable = document.getElementById("dataTable")
const search = document.getElementById("search")



let icon = {
    success: '<span class="material-symbols-outlined">💚 success</span>',
    danger: '<span class="material-symbols-outlined">🛑 error</span>',
    warning: '<span class="material-symbols-outlined">⚡warning</span>',
    info: '<span class="material-symbols-outlined">💙info</span>',
};

const showToast = (
    message = "Sample Message",
    toastType = "info",
    duration = 5000) => {
    if (!Object.keys(icon).includes(toastType))
        toastType = "info";

    let box = document.createElement("div");
    box.classList.add(
        "toast", `toast-${toastType}`);
    box.innerHTML = ` <div class="toast-content-wrapper"> 
                      <div class="toast-icon"> 
                      ${icon[toastType]} 
                      </div> 
                      <div class="toast-message">${message}</div> 
                      <div class="toast-progress"></div> 
                      </div>`;
    duration = duration || 5000;
    box.querySelector(".toast-progress").style.animationDuration =
        `${duration / 1000}s`;

    let toastAlready =
        document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }
    document.body.appendChild(box)
};

//warn.addEventListener("click", (e) => {
//e.preventDefault();
//showToast("!warning! server error", "warning", 5000);
//});

const spinner = (load) => {
    const x = document.getElementById('spinIt')
    load === true ? x.style.display = "block" : x.style.display = "none"
}
spinner(true)

search.addEventListener("search", () => {
    getDetails()
});

xView.addEventListener("click", function() {
    if (dataTable.style.display === "none") {
        dataTable.style.display = "block";
    } else {
        dataTable.style.display = "none";
    }
})

create.addEventListener("click", function() {
    xForm.style.display = "block"
    create.style.display = "none"
})

cancelButtonEl.addEventListener("click", function() {
    xForm.style.display = "none"
    create.style.display = "block"
    clearInputFieldEl()
})

addButtonEl.addEventListener("click", function() {
    if (idx.value === "") {
        verify(true)
    } else {
        verify(false)
    }
})

function updateItem(itemID, values) {
    let exactLocationOfItemInDB = ref(database, `xBullets/${itemID}`)
    update(exactLocationOfItemInDB, values).then(() => {
            showToast("Updating Entry!", "success", 5000);
            xForm.style.display = "none"
            create.style.display = "block"
            xView.style.display = "block"
        })
        .catch((error) => {
            showToast("Unable to update Entry!", "error", 5000);
        });

}

function verify(xType) {
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
        showToast("Please check the input fields... Try again!", "danger", 5000);
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
        if (xType == true) {
            push(xAppInDB, values)
            showToast("Saving Entry!", "success", 5000);
        } else {
            updateItem(idx.value, values)

        }
        error.innerHTML = ""

    }
}

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
        spinner(false)
    }
})

function clearxAppEl() {
    xAppEl.innerHTML = ""
    details.innerHTML = ""
}

function clearInputFieldEl() {
    cartridge.value = ""
    bulletWeight.value = ""
    bulletType.value = ""
    bc.value = ""
    primer.value = ""
    powder.value = ""
    powderCharge.value = ""
    maxVelocity.value = ""
    minVelocity.value = ""
    avgVelocity.value = ""
    sd.value = ""
    notes.value = ""
    idx.value = ""
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
    let editItem = document.createElement("div")
    editItem.textContent = "✏️"
    editItem.className = "right"
    let newEl = document.createElement("li")
    newEl.className = itemValue.active
    newEl.append(toggleItem)
    newEl.append(deleteItem)
    newEl.append(editItem)
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
    <tr class="xEntry_holder">
        <td> ${itemValue.cartridge} </td>
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
        <td colspan="3"> ${itemValue.notes}</td>
    </tr>
    `
    editItem.addEventListener("click", function() {
        cartridge.value = itemValue.cartridge
        bulletWeight.value = itemValue.bulletWeight
        bulletType.value = itemValue.bulletType
        bc.value = itemValue.bc
        primer.value = itemValue.primer
        powder.value = itemValue.powder
        powderCharge.value = itemValue.powderCharge
        maxVelocity.value = itemValue.maxVelocity
        minVelocity.value = itemValue.minVelocity
        avgVelocity.value = itemValue.avgVelocity
        sd.value = itemValue.sd
        notes.value = itemValue.notes
        idx.value = itemID
        xForm.style.display = "block"
        create.style.display = "none"
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })

    deleteItem.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `xBullets/${itemID}`)
        remove(exactLocationOfItemInDB).then(() => {
                showToast("Deleting Entry!", "warning", 5000);
            })
            .catch((error) => {
                showToast("Unable to remove Entry!", "error", 5000);
            });

    })

    toggleItem.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `xBullets/${itemID}`)
        if (itemValue.active === "green") {
            let values = {
                "active": "white",
            }
            update(exactLocationOfItemInDB, values)
            showToast("Removing Detail Highlight", "info", 5000);
        } else {
            let values = {
                "active": "green",
            }
            showToast("Adding Detail Highlight", "success", 5000);
            update(exactLocationOfItemInDB, values)
        }

    })
    clearInputFieldEl()
    xForm.style.display = "none"
    create.style.display = "block"
    xView.style.display = "block"
    xAppEl.append(newEl)
    spinner(false)

}