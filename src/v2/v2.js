
let searchForm = document.getElementById("send-ticker");
let searchInput = document.getElementById("input-asset");

const key = "398aa778137209a478ab10906b372f4f";

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const query = searchInput.value.toUpperCase();
    if (query) {
        getFinancialInfo(query);
        searchInput.value = "";
    } else{
        console.log("Bad input. Please make sure it contains something.");
    }
})

getFinancialInfo = (query) =>{
    fetch(`https://financialmodelingprep.com/api/v3/quote/${query}?apikey=${key}`)
        .then(data => data.json())
        .then((res) =>{
            console.log(...res);
        })
}

// ! TODO: Integrate a chart API.