
/**
 * TODO
 *  watchify v1.js -o bundle.js -v    
*/

//const Ticker = require("./search_class");

let searchInput = document.getElementById("send-ticker");
let searchValue = document.getElementById("input-asset");
let divContainer = document.getElementById("container");
let savedTickers = [];

searchInput.addEventListener("submit", getTickerResults);

function getTickerResults(e) {
    e.preventDefault();
    let searchQuery = searchValue.value.toUpperCase();
    fetchSearchResults(searchQuery);

    searchValue.value = "";
}

async function fetchSearchResults(query) {
    let data = await fetch(`https://financialmodelingprep.com/api/v3/quote/${query}`);
    let response = await data.json();
    if (data.ok) {
        let objectResponse = response[0];
        appendResults_DOM(objectResponse);
    } else{
        console.log("Data wasn´t fetched correctly");
    }
}

let resultsDiv = document.querySelector(".ticker-information");

function appendResults_DOM(data) {

    divContainer.classList.add("container");

    let divResult1 = document.querySelector(".result1").childNodes;
    let divResult2 = document.querySelector(".result2").childNodes;
    let divResult3 = document.querySelector(".result3").childNodes;
    let divResult4 = document.querySelector(".result4").childNodes;
    let divResult5 = document.querySelector(".result5").childNodes;

    if (data) {
        resultsDiv.classList.remove("hidden");

        const {name, price, open, dayLow, dayHigh} = data;

        divResult1[1].innerText = "Name:";
        divResult1[3].innerText = name;

        divResult2[1].innerText = "Price:";
        divResult2[3].innerText = price;

        divResult3[1].innerText = "Open:";
        divResult3[3].innerText = open;

        divResult4[1].innerText = "Day Low:";
        divResult4[3].innerText = dayLow;

        divResult5[1].innerText = "Day High:";
        divResult5[3].innerText = dayHigh;

        let newTicker = new Ticker(name, price, open, dayLow, dayHigh);
        savedTickers.push(newTicker);
        console.log(Ticker);       
        console.log(savedTickers); 

    } else{
        console.log("Check your input!");
    }
}

let modal = document.getElementById("btn-modal");

modal.addEventListener("click", () =>{
    
})