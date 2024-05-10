import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getFirestore, collection, getDocs, setDoc, doc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import { config } from './config.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const app = initializeApp(config);
const db = getFirestore()
const ref = collection(db, "stitchez")
let x = ""
let rec = []
let cart = []
const cartFields = document.getElementById("cartFields")
const saveBtn = document.getElementById("save-button")
const xDetails = document.getElementById("xDetails")
const mainTitle = document.getElementById("mainTitle")
const viewXCart = document.getElementById("viewCart")
const updateCart = document.getElementById("updateCart")
const purchaseCart = document.getElementById("purchaseCart")
const cartTotal = document.getElementById("cartTotal")
const errorTrap = document.getElementById("errorTrap")
const search = document.getElementById("search-criteria")
const input = document.querySelector('input[type="search"]')
const xCart = document.getElementById("cart")
const shoppingTotal = document.getElementById("shoppingTotal")

const spinner = (load) => {
    const x = document.getElementById('spinIt')
    load === true ? x.style.display = "block" : x.style.display = "none"
}


spinner(true)
checkCart()

input.addEventListener("search", () => {
    getDetails()
});

const colorData = [
    {
        value: ["Gold", "Copper", "Silver", "Rose Gold", "Pink", "Green"],
    },
    {
        value: ["Rainbow"],
    }
]

const fileData = [
    {
        value: ["HUS", "PES"],
    }
]

//  modal
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function createADoc() {
    spinner(true)
    let x = uuidv4()
    setDoc(doc(db, "cart", x), {
        purchase: cart,
        id: x,
        jcontractor: "test2"
    }).then(() => {
        spinner(false)
        modal.style.display = "none";
        cart=[]
        checkCart()
        error.innerText = "Your order has been processed ...."

    }).catch(err => {
        error.innerText = "Unable to process request ...."
        spinner(false)
    })
}

const buildBody = (items) => {
    return `<div class="containerx">
                <div class="item"><img src="${items.filex}" class="ximg"> </div>
                <div class="itemx item-center">
                <strong class="orange">${items.category.toUpperCase()}</strong>
                - ${items.type}<br><strong>${items.title}</strong><br>${items.details}
                <br><strong class="enMoney">${items.purchase}</strong> each
                </div>
                <div class="item3"><button class="button" data-add='${items.id}'>+</button></div>
            </div>`
}

document.addEventListener('click', function (e) {
    if (e.target.dataset.hardware) {
        getDetailsByFilter(e.target.dataset.hardware)
    }
    else if (e.target.dataset.embroidery) {
        getDetailsByFilter(e.target.dataset.embroidery)
    }
    else if (e.target.dataset.about) {
        getDetailsByFilter(e.target.dataset.about)
    }
    else if (e.target.dataset.remove) {
        delete cart[e.target.dataset.remove]
        checkCart()
        cartDetails(true)
    }
    else if (e.target.dataset.add) {
        modal.style.display = "block";
        cartFields.style.display = "block"
        updateCart.style.display = "none"
        purchaseCart.style.display = "none"
        xDetails.innerHTML = getById(e.target.dataset.add, "", "", "", "")
        let val = getValuesById(e.target.dataset.add)
        mainTitle.innerHTML = "🛒 Add to cart"
        val.category === "Hardware" ? renderValueRadios(colorData) : renderValueRadios(fileData)
        saveBtn.style.display = "block"
        viewCart()
    } else if (e.target.id === "save-button") {
        getMatchingValueArray()
        checkCart()
        viewCart()
    }
    else if (e.target.id === "cart" || e.target.id === "viewCart") {
        modal.style.display = "block";
        saveBtn.style.display = "none"
        cartFields.style.display = "none"
        viewXCart.style.display = "none"
        mainTitle.innerHTML = '🛒 Shopping Cart'
        purchaseCart.style.display = ""
        cartDetails(true)
    }
    else if (e.target.id === "updateCart") {
        const cartVals = document.getElementsByClassName('cartVals')
        if (cartVals) {
            for (let cartx of cartVals) {
                cart[cartx.id].qty = cartx.value
            }
            cartDetails(true)
        }
    }else if (e.target.id === "purchaseCart") {
       createADoc()
    }
})

function cartDetails(show = false) {
    let x = ""
    let total = ""
    let lineTotal = 0
    let grandTotal = 0
    cartTotal.innerHTML = ""
    shoppingTotal.innerHTML = ""

    cart.map(function (cartx, index) {
        total = getValuesById(cartx.id)
        lineTotal = total.purchase * cartx.qty
        grandTotal += lineTotal
        cartTotal.innerHTML = `Total in cart: <span class="enMoney">${grandTotal.toFixed(2)}</span>`
        shoppingTotal.innerHTML = `<span class="enMoney">${grandTotal.toFixed(2)}</span>`
        x += getById(cartx.id, cartx.qty, cartx.type, lineTotal, index)
    })

    if (show) {
        return xDetails.innerHTML = x
    }
}

function checkCart() {
    return cart.length > 0 ? xCart.style.display = "" : xCart.style.display = "none"
}
function viewCart() {
    return cart.length > 0 ? viewXCart.style.display = "" : viewXCart.style.display = "none"
}

function getMatchingValueArray() {
    spinner(true)
    errorTrap.style.display = ""
    const qty = document.getElementById("qty")
    const selectedItem = document.getElementById("selectedId")
    if (document.querySelector('input[type="radio"]:checked') && qty.value !== "") {
        const selectedType = document.querySelector('input[type="radio"]:checked').value
        const shopping = {
            type: selectedType,
            qty: qty.value,
            id: selectedItem.innerHTML
        }
        cart.push(shopping)
        console.log(cart)
        let val = getValuesById(shopping.id)
        errorTrap.innerText = `${shopping.qty} - ${shopping.type} - ${val.title} has been added to your cart`
        errorTrap.style.backgroundColor = "#298f08d9"
        let radioButton = document.getElementById(shopping.type);
        radioButton.checked = false;
        const radios = document.getElementsByClassName('radio')
        for (let radio of radios) {
            radio.classList.remove('highlight')
        }
        qty.value = 1
        cartDetails()
    } else {
        errorTrap.innerText = "You must complete all fields"
        errorTrap.style.backgroundColor = "#e52234d1"
    }
    setTimeout(function () {
        errorTrap.style.display = "none"
        spinner(false)
    }, 1000);

}

const valueRadios = document.getElementById('value-radios')
valueRadios.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

const getById = (id, qty, type, total, cartIndex) => {
    let x = ''
    document.getElementById("selectedId").innerText = id
    rec.filter(function (items) {
        if (items.id === id) {
            if (qty) {
                x +=
                    `<div class="containerx">
                        <div class="item"><img src="${items.filex}" class="ximg"> </div>
                        <div class="itemx item-center">
                            <strong class="orange">${items.category.toUpperCase()}</strong>
                            - ${items.type}<br><strong>${items.title}</strong><br>${items.details}<br>
                            qty: ${qty}- ${type} <strong class="enMoney">${total}</strong> 
                        </div>
                        <div class="lastItem">
                        <button class="button" data-remove='${cartIndex}'>-</button>
                            <div class="counter">
                                <span class="down" onClick='decreaseCount(event, this, true)' >-</span>
                                <input type="text" id=${cartIndex} class="cartVals" value=${qty}>
                                <span class="up"  onClick='increaseCount(event, this, true)' >+</span>
                            </div>
                        </div>
                   
                    </div>`

            } else {
                x +=
                    `<div class="containerx">
                        <div class="item"><img src="${items.filex}" class="ximg"> </div>
                        <div class="itemx item-center">
                        <strong class="orange">${items.category.toUpperCase()}</strong>
                        - ${items.type}<br><strong>${items.title}</strong><br>${items.details}
                        <br><strong class="enMoney">${items.purchase}</strong>
                        </div>
                    </div>`
            }
        }
    })
    return x
}

const getValuesById = (id) => {
    let x = ''
    document.getElementById("selectedId").innerText = id
    rec.filter(function (items) {
        if (items.id === id) {
            x = items
        }
    })
    return x
}

getDocs(ref).then((snapshot) => {
    snapshot.docs.forEach((doc, index) => {
        rec.push({ ...doc.data(), idx: index })

    })
    rec.map((items) => {
        x += buildBody(items)
    })

    render(x)

}).catch(err => {
    console.log(err.message)
})

function getDetailsByFilter(filter) {
    let res = ""
    document.getElementById("adds").innerHTML = ""
    rec.forEach((items) => {
        if (filter !== "" && items.category.toLowerCase().includes(filter)) {
            res += buildBody(items)
        }
    })
    render(res)
}

function getDetails() {
    let res = ""
    document.getElementById("adds").innerHTML = ""
    rec.forEach((items) => {
        if (items.details.toLowerCase().includes(search.value.toLowerCase())
            || items.type.toLowerCase().includes(search.value.toLowerCase())
            || items.category.toLowerCase().includes(search.value.toLowerCase())
            || items.title.toLowerCase().includes(search.value.toLowerCase())) {
            res += buildBody(items)
        }
    })
    render(res)
}

function render(x) {
    document.getElementById("adds").innerHTML = x
    spinner(false)
}

function getValueArray(items) {
    const arrayX = []
    for (let x of items) {
        for (let select of x.value) {
            if (!arrayX.includes(select)) {
                arrayX.push(select)
            }
        }
    }
    return arrayX
}

function renderValueRadios(items) {
    let radioItems = ``
    const selections = getValueArray(items)
    for (let select of selections) {
        radioItems += `
        <div class="radio">
            <label for="${select}">${select}</label>
            <input
            type="radio"
            id="${select}"
            value="${select}"
            name="valueSelect"
            >
        </div>`
    }
    valueRadios.innerHTML = radioItems
}