
let searchForm = document.getElementById("send-ticker");
let searchInput = document.getElementById("input-asset");
let chart = document.getElementById("myChart");

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
            openChart(res[0])
        })
}

const openChart = (stockData) =>{
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
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