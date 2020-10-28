
let searchForm = document.getElementById("send-ticker");
let searchInput = document.getElementById("input-asset");
let chart = document.getElementById("myChart");

const key = "398aa778137209a478ab10906b372f4f";
const getToDate = () =>{ return moment().format('YYYY-MM-DD'); }
const getFromDate = () => { 
    const date = '2020-01-01';
    return moment(date).format('YYYY-MM-DD');
}

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
    try {
        fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${query}?from=${getFromDate()}&to=${getToDate()}&apikey=${key}`)
        .then(data => data.json())
        .then((historics) =>{
            if (historics) {
                const { symbol } = historics;
                fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${key}`)
                .then(res => res.json())
                .then((name) => {
                    if (name == "") { throw alert("Undefinded"); }
                    const { companyName } = name[0];
                    openChart(historics, companyName);
                })
            }
        }).catch((e) => console.log(e))
    } catch (error) {
        console.log(error)
    }
}

const openChart = (stockData, tickerName) =>{
    const orderedInfo = stockData.historical.reverse();
    try {
        new Chart(chart, {
            type: 'line',
            data: {
                labels: orderedInfo.map(all => all.date),
                datasets: [{
                    label: tickerName,
                    data: orderedInfo.map(all => all.close),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [ // ! Take care of colours
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
    } catch (error) {
        console.log(error)
    }
}