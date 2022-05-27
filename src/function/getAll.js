const data = require('../store/data');
const category = require('../store/category');

function getAll({sort, offset, limit} = {}) {
    if (!offset) {
        offset = 0;
    }

    if (!limit) {
        limit = data.length;
    }

    if (sort && !(sort === 1 || sort === -1)) {
        throw new Error('Sort agrument is invalid');
    }

    const result = data.slice(offset, offset + limit).map(({category: cIndex, ...other}) => ({...other, category: category[cIndex]}));

    if (sort) {
        result.sort(({ price: priceA }, { price: priceB }) => (priceA - priceB) * sort);
    }

    return result;
}

module.exports = getAll;