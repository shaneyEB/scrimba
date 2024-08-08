
const colors = document.getElementById("xColor")
document.addEventListener("click", color2Clipboard);

function color2Clipboard(event) {
    var res = event.target.dataset.role;
    if (res != undefined) {
        navigator.clipboard.writeText(res);
    }
}

getColors()

colors.addEventListener("click", function () {
    getColors()
})

function returnColors(data) {
    setHex(data)
    setColor(data)
    setTitle(data)
}

function setTitle(colors) {
    const val = ['c', 'o', 'l', 'o', 'r', 'z']
    let res = ""
    let i = 0;
    for (color of colors) {
        res += ` <span style= 'color: ${color.hex.value}'>${val[i]}</span>`
        i++
    }
    document.getElementById("title").innerHTML = res
}

function setHex(colors) {
    let xFooter = ""
    colors.forEach(color =>
        xFooter += `<div> ${color.hex.value}</div>`
    )
    document.getElementById("footer").innerHTML = xFooter
}

function setColor(colors) {
    let xColors = ""
    colors.forEach(color =>
        xColors += `<div class="dataColor" data-role=${color.hex.value} style="background: ${color.hex.value}"><span class="xToggle">${color.hex.value}</div>`
    )
    document.getElementById("output").innerHTML = xColors
}

function getColors() {
    let color = document.getElementById('xPicker').value
    let xType = document.getElementById("xType");
    let value = xType.value;
    //let text = e.options[e.selectedIndex].text;
    let hex = color.replace("#", "");
    let mode = value

    fetch('https://www.thecolorapi.com/scheme?hex=' + hex + '&format=json&mode=' + mode + '&count=6')
        .then(function (response) {
            response.json().then(function (data) {
                returnColors(data.colors)
            });
        }).catch(function (error) {
            console.log('Fetch Error:', error);
        });

}
