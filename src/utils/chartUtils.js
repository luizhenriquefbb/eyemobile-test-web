function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
export const getColours = (howMany) => {
    const response = [];
    for (let index = 0; index < howMany; index++) {
        // eslint-disable-next-line max-len
        response.push(`rgba(${getRandomArbitrary(0, 255)},${getRandomArbitrary(0, 255)},${getRandomArbitrary(0, 255)},1)`);
    }
    return response;
};