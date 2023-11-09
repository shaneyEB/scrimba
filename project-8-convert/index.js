/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
const l2g = 0.264
const k2p = 2.204
const m2f = 3.281

const convertBtn = document.getElementById("convertBtn")
const inputEl = document.querySelector("input")
const lengthEl = document.getElementById("length-el")
const volumeEl = document.getElementById("volume-el")
const massEl = document.getElementById("mass-el")

convertBtn.addEventListener("click", function () {
    const val = inputEl.value
    vol(val)
    mass(val)
    meters(val)
})

function vol(val) {
   let volx = `${val} liters = ${(val * l2g).toFixed(3)} gallons
    | ${val} gallons = ${(val / l2g).toFixed(3)} liters`;
    return volumeEl.textContent = volx
}

function mass(val) {
    let massx = `${val} kilos = ${(val * k2p).toFixed(3)} pounds 
    | ${val} pounds = ${(val / k2p).toFixed(3)} kilos`;
    return massEl.textContent = massx
}

function meters(val){
    let meterx = `${val} meters = ${(val * m2f).toFixed(3)} feet 
    | ${val} feet = ${(val / m2f).toFixed(3)} meters`
    return lengthEl.textContent = meterx

}

