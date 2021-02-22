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

	const filterButtons = document.querySelectorAll("nav button");
	filterButtons.forEach(button => button.addEventListener("click", filterCakes));
	showCakes("alle");
}


//eventlistener knyttet til knapperne vælger det aktive filter
function filterCakes() {
	console.log("filterCakes");
	//sæt variablen "filter" til værdien af data-cakes på den klikkede knap
	const filter = this.dataset.cakes;
	//fjern class "selected" fra klikket knap
	document.querySelector(".selected").classList.remove("selected");
	//tilføj class "selected" til klikket knap
	this.classList.add("selected")
	//kald funktion showCakes efter indstilling af nyt filter
	const h2 = document.querySelector("h2");
	showCakes(filter);
	h2.textContent = this.textContent;
}


//funktion der viser kager i liste-view
function showCakes(filter) {
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
