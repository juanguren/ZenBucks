let searchForm = document.getElementById('send-ticker');
let searchInput = document.getElementById('input-asset');
let chart = document.getElementById('myChart');

const key = '398aa778137209a478ab10906b372f4f'; // TODO: Erase this funny sequence from here

const getToDate = () => moment().format('YYYY-MM-DD');
const getFromDate = () => {
  const date = '2020-11-01';
  return moment(date).format('YYYY-MM-DD');
};

const getChartConfig = (stockData, tickerName) => {
  return {
    type: 'line',
    data: {
      labels: stockData.map((all) => all.date),
      datasets: [
        {
          label: tickerName,
          data: stockData.map((all) => all.close),
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
};

const retrieveFinancials = async (ticker, target) => {
  try {
    const APISelection = {
      historics: `https://billowing-tree-gge03.cloud.serverless.com/data/historical/${ticker}/${getFromDate()}/${getToDate()}`,
      name: `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${key}`,
    };

    const url = APISelection[target];
    return (await fetch(url)).json();
  } catch (error) {
    return error;
  }
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.toUpperCase();
  if (query) {
    getFinancialInfo(query);
    searchInput.value = '';
  } else {
    alert('Hey! Remember to enter a ticker!');
  }
});

getFinancialInfo = async (ticker) => {
  try {
    const stockData = await retrieveFinancials(ticker, 'historics');
    if (stockData.symbol) {
      const { symbol } = stockData;
      const getCompanyName = await retrieveFinancials(symbol, 'name');
      const { companyName } = getCompanyName[0];
      const newChart = openChart(stockData.data, companyName);
    } else {
      throw 'Unrecognized ticker symbol';
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const openChart = (stockData, tickerName) => {
  try {
    const config = getChartConfig(stockData, tickerName);
    return new Chart(chart, config);
  } catch (error) {
    console.log(error);
  }
};
