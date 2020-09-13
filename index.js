//getting the card into an array en copy them
let BlockElements = Array.from(document.querySelectorAll(".gameBlock"));
let CreatedBlockElements = [...BlockElements];
let wholeGame = document.querySelector(".blocks");
let duration = 1000;

//press start
document.querySelector(".startGame span").onclick = function () {
    let userName = prompt("What's your name?");
    if (userName == null || userName == "") {
        userName = "New Palyer"
    }
    document.querySelector(".UserName span").textContent = userName;
    document.querySelector(".startGame").remove();
    //removing the cards from the main array of cards
    BlockElements.forEach(el=> el.remove());
    //shuflle the copid array of cards
    CreatedBlockElements = shuffle(CreatedBlockElements);
    //adding the new array with event listener
    CreatedBlockElements.forEach(el =>{ 
        wholeGame.appendChild(el);
        //event listener addition
        el.addEventListener("click", () => flipCards(el))
    });
}
function flipCards(Element) {
    Element.classList.add("active");
    //counter for active cards
    let allActiveElements = CreatedBlockElements.filter(el => el.classList.contains("active"));
    //stop clicking when two is selected
    if (allActiveElements.length === 2) {
        //stop clicking for the third time
        stopClicking();
        //check Match
        checkMatch(allActiveElements[0], allActiveElements[1]);
        //clear all active
        allActiveElements = [];
    }
}
function stopClicking() {
    //freeze
    wholeGame.classList.add("no-click");
    // remove freezing
    setTimeout(() => { wholeGame.classList.remove("no-click") }, duration);
}

function checkMatch(firstElem, secondElem) {
    let numberOfTries = document.querySelector(".wrongTries span");

    if (firstElem.getAttribute("data-pic") === secondElem.getAttribute("data-pic")) {
        firstElem.classList.remove("active");
        secondElem.classList.remove("active");
        firstElem.classList.add("match");
        secondElem.classList.add("match");
    } else {
        numberOfTries.textContent = parseInt(numberOfTries.textContent) + 1;
        setTimeout(() => {
            firstElem.classList.remove("active");
            secondElem.classList.remove("active");
        }, duration);
    }

}

//shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...

    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}