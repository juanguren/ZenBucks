
/**
 * TODO
 *  watchify v1.js -o bundle.js -v    
*/

// ============ Modal ==============

let btnModal = document.getElementById("btn-modal");
let modal = document.querySelector(".modalv1");
let modalClose = document.getElementById("btn-close");

btnModal.addEventListener("click", (e) =>{
    modal.classList.remove("hidden");
})

modalClose.addEventListener("click", () =>{
    modal.classList.add("hidden");
})

let searchInput = document.getElementById("send-ticker");
let searchValue = document.getElementById("input-asset");
let divContainer = document.getElementById("container");
let savedTickers = [];

const key = "398aa778137209a478ab10906b372f4f";

searchInput.addEventListener("submit", getTickerResults);

function getTickerResults(e) {
    e.preventDefault();
    let searchQuery = searchValue.value.toUpperCase();
    fetchSearchResults(searchQuery);

    searchValue.value = "";
}

async function fetchSearchResults(query) {
    let data = await fetch(`https://financialmodelingprep.com/api/v3/quote/${query}?apikey=${key}`);
    let response = await data.json();
    if (response.length == 0) {
        console.log("Bad request");
        
        let failedMsg = document.getElementById("failure-message");
        failedMsg.style.position = "fixed";
        failedMsg.style.color = "crimson";
        failedMsg.innerText = "Ups, check your query!";

        setTimeout(() => {
            failedMsg.innerText = "";
        }, 2500);

    } else{
        console.log(response);
        let objectResponse = response[0];
        appendResults_DOM(objectResponse);
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

    } else{
        console.log("Check your input!");
    }
}