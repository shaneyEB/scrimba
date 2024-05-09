import { datax } from "./datax.js";
const modal = document.getElementById("myModal");
const about = document.getElementById("aboutMe");
const loadMore = document.getElementById("loadMore");
const loadLess = document.getElementById("loadLess");
const span = document.getElementsByClassName("close")[0];
loadLess.style.display = "none";
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

about.onclick = function() {
    modal.style.display = "block";
}

loadMore.onclick = function(event) {

    if (event.target == loadMore) {
        loadMore.style.display = "none";
        loadLess.style.display = "block";
        return render(true)
    }
}

loadLess.onclick = function(event) {

    if (event.target == loadLess) {
        loadLess.style.display = "none";
        loadMore.style.display = "block";
        return render(false)
    }
}

function getFeedHtml(load) {

    let feedHtml = ``
    let repliesHtml = ``
    let mainList = datax
    let list = ``

    if (!load) {
        list = datax.filter(o => { return (o.module == 'Module 5' || o.module == 'Module 6') })
        loadMore.style.display = "block";
    } else {
        list = mainList
    }

    list.forEach(function(mods) {
        repliesHtml = ''
        if (mods.links.length > 0) {
            mods.links.forEach(function(xlinks) {
                repliesHtml +=
                    `
                    <ul class="back_feed">
                        <li>
                            <a href="${xlinks.url}" target="_blank">
                                <p>${xlinks.title}</p>
                            </a>
                        </li>
                    </ul>   
                `
            })
        }

        feedHtml +=
            `
            <div>
                <h3  class="orange">${mods.module}</h3>
                <small>${mods.sub}</small>
                <p>
                    ${repliesHtml}
                </p>  
            </div>  
        `
    })
    return feedHtml
}

function render(show) {
    document.getElementById('feed').innerHTML = getFeedHtml(show)
}

render(false)