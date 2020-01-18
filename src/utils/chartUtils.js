function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const defaultSetOfColorsPieCharts = [
    'rgba(61, 136, 246, 1)', 'rgba(206, 44, 206, 1)', 'rgba(122, 46, 204, 1)',
];

const defaultSetOfColorsBarCharts = [
    'rgba(0, 220, 172, 1)', 'rgba(254, 77, 101, 1)',
];

export const getColours = (howMany, type = 'pie') => {
    let response = [];
    if (type === 'pie') {
        response = defaultSetOfColorsPieCharts;
    }
    else {
        response = defaultSetOfColorsBarCharts;
    }

    let index = response.length;

    for (index; index < howMany; index++) {
        // eslint-disable-next-line max-len
        response.push(`rgba(${getRandomArbitrary(0, 255)},${getRandomArbitrary(0, 255)},${getRandomArbitrary(0, 255)},1)`);
    }
    return response;
};