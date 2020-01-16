// temporary file to use mocks for charts
export const pie_options = {
    cutoutPercentage: 70,
    legend: {
        display: false,
        position: 'bottom',
    },
};

export const bar_example = {
    // labels: ['Return Customers', 'one more',],
    datasets: [
        {
            label: ['example 1',],
            backgroundColor: ['rgba(255,0,0,1)',],
            borderColor: ['rgba(255,0,0,1)',],
            data: [20000,],
            barPercentage: 0.4,
        },
        {
            label: ['example 2',],
            backgroundColor: ['rgba(0,255,0,1)',],
            borderColor: ['rgba(0,255,0,1)',],
            data: [3000,],
            barPercentage: 0.4,
        },
    ],
};

export const bar_options = {
    scales: {
        xAxes: [{
            gridLines: {
                display: true,
            },
        },],
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
            },
        },],
    },
    legend: {
        display: false,
        position: 'bottom',
    },
};
