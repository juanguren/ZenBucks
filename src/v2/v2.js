
let searchForm = document.getElementById("send-ticker");
let searchInput = document.getElementById("input-asset");

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const query = searchInput.value;
    if (query) {
        getFinancialInfo(query);
        searchInput.value = "";
    } else{
        console.log("Bad input. Please make sure it contains something.");
    }
})

getFinancialInfo = (query) =>{
    console.log(query);
}