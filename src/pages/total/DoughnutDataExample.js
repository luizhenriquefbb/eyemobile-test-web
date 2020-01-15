// temporary file to use mocks for charts

export const pie_example = {

    labels: ['New Customers', 'Return Customers',],
    datasets: [{

        backgroundColor: ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)',],
        borderColor: ['rgba(255,0,0,1)', 'rgba(0,255,0,1)',],
        borderWidth: 1,
        data: [
            1,
            2,
        ],
    },],

};

export const pie_options = { cutoutPercentage: 70, };

export const bar_example = {
    labels: ['Return Customers', 'one more',],
    datasets: [{
        label: '',
        backgroundColor: ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)',],
        borderColor: ['rgba(255,0,0,1)', 'rgba(0,255,0,1)',],
        data: [20, 30,],
    },],
};

export const bar_options = {
    scales: {
        xAxes: [{
            gridLines: {
                display: true,
            },
        },],
        yAxes: [{
            gridLines: {
                display: false,
            },
        },],

    },
};
