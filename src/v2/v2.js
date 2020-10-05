
let searchForm = document.getElementById("send-ticker");
let searchInput = document.getElementById("input-asset");
let chart = document.getElementById("myChart");

const key = "398aa778137209a478ab10906b372f4f"; // ! Learn how to hide API keys

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
    fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${query}?from=2020-01-12&to=2020-09-12&apikey=${key}`)
        .then(data => data.json())
        .then((res) =>{
            openChart(res)
        }).catch((e) => console.log(e))
}

const openChart = (stockData) =>{ // ! Sort array in reverse order. All dates are being returned backwards..
    new Chart(chart, {
        type: 'line',
        data: {
            labels: stockData.historical.map(all => all.date),
            datasets: [{
                label: '# of Votes',
                data: stockData.historical.map(all => all.close),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}