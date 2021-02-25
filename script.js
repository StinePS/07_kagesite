//json data-info
const url = "https://kager-e10d.restdb.io/rest/kager";
const medieurl = "https://kager-e10d.restdb.io/media/";
const myHeaders = {
    headers: {
        'x-apikey': "602e8f495ad3610fb5bb635c"
    }
};

//variabler og konstanter
let cakes;
let filter = "alle"; //så filteret starter med alle
let sort; //variabel til sortering

//hent data, når DOM er loadet
document.addEventListener("DOMContentLoaded", getData);

//asynkron funktion henter JSON-data og afventer svar tilbage, før "start" køres
async function getData() {
    console.log("getData");
    const JSONData = await fetch(url, myHeaders);
    cakes = await JSONData.json();
    start();
}

//eventlisteners på filtrerings-knapper + vis alle kager
function start() {
    console.log("start");

    const filterButtons = document.querySelectorAll(".category_buttons button");
    filterButtons.forEach(button => button.addEventListener("click", filterCakes));
    document.querySelector(".sorter_tid_op").addEventListener("click", sortCakesTime);
    document.querySelector(".sorter_tid_ned").addEventListener("click", sortCakesTimeUp);
    document.querySelector(".sorter_navn").addEventListener("click", sortCakesName);
    document.querySelector(".sorter_navn_ned").addEventListener("click", sortCakesNameUp);
    showCakes("alle");
}


//eventlistener knyttet til knapperne vælger det aktive filter
function filterCakes() {
    console.log("filterCakes");
    //sæt variablen "filter" til værdien af data-cakes på den klikkede knap. 'const' er fjernet, så den er en global variabel og kan tilgås senere
    filter = this.dataset.cakes;
    //fjern class "selected" fra klikket knap
    document.querySelector(".selected").classList.remove("selected");
    //tilføj class "selected" til klikket knap
    this.classList.add("selected")
    //kald funktion showCakes efter indstilling af nyt filter
    const h2 = document.querySelector("h2");
    showCakes(filter);
    h2.textContent = this.textContent;
}

//https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
function sortCakesTime() {

    //er lavet til en variabel med const
    const sort = cakes.sort((a, b) => {
        return a.tidsforbrug - b.tidsforbrug;
    });

    //kalder showcakes med den sorterede variabel (så den har samme filter)
    showCakes(sort);
}

//https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
function sortCakesTimeUp() {
    const sort = cakes.sort((a, b) => b.tidsforbrug - a.tidsforbrug);

    //kalder showcakes med den sorterede variabel (så den har samme filter)
    showCakes(sort);
}

//https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
function sortCakesName() {

    //er lavet til en variabel med const
    const sort = cakes.sort((a, b) => {
        let fa = a.kagenavn.toLowerCase(),
            fb = b.kagenavn.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    //kalder showcakes med den sorterede variabel (så den har samme filter)
    showCakes(sort);
}

//https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
function sortCakesNameUp(){
    //er lavet til en variabel med const
    const sort = cakes.sort((a, b) => {
        let fa = a.kagenavn.toLowerCase(),
            fb = b.kagenavn.toLowerCase();

        if (fb < fa) {
            return -1;
        }
        if (fb > fa) {
            return 1;
        }
        return 0;
    });

    //kalder showcakes med den sorterede variabel (så den har samme filter)
    showCakes(sort);
}

//funktion der viser kager i liste-view
function showCakes(sort) {
    console.log("showCakes");
    const section = document.querySelector("#gallery");
    section.textContent = "";
    cakes.forEach(cake => {
        if (filter == cake.kategori || filter == "alle") {
            const cakeTemplate = document.querySelector("template").content;
            const clone = cakeTemplate.cloneNode(true);
            clone.querySelector("img").src = medieurl + cake.foto1;
            clone.querySelector("h3").textContent = cake.kagenavn;
            clone.querySelector(".cake_time").textContent = `Omtrentligt tidsforbrug: ${cake.tidsforbrug} timer`;
            clone.querySelector(".cake_article").addEventListener("click", () => location.href = `single_view.html?id=${cake._id}`);
            section.appendChild(clone);
        }
    })
}

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown
//toggle gem og vis dropdown elementer, når der klikkes
function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// luk dropdown hvis man klikker udenfor
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
