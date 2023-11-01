let homeTeam = document.getElementById("home")
let guestTeam = document.getElementById("guest")
let homeCount = 0;
let guestCount = 0;

function home(inc) {
    homeCount += inc;
    homeTeam.textContent = homeCount
    calculateScore()
}

function guest(inc) {
    guestCount += inc;
    guestTeam.textContent = guestCount
    calculateScore()
}

function calculateScore() {

    if (homeCount > guestCount) {
        homeTeam.classList.remove("score")
        homeTeam.classList.add("score-green")
    } else {
        homeTeam.classList.remove("score-green")
        homeTeam.classList.add("score")
    }

    if (guestCount > homeCount) {
        guestTeam.classList.remove("score")
        guestTeam.classList.add("score-green")
    } else {
        guestTeam.classList.remove("score-green")
        guestTeam.classList.add("score")
    }
}

function startGame(){
    homeCount = 0;
    guestCount = 0;
    home(0)
    guest(0)
}
