const data = require('../store/data');
const category = require('../store/category');

function getByCategory(cName, sort) {
    if (sort && !(sort === 1 || sort === -1)) {
        throw new Error('Sort agrument is invalid');
    }
    const cIndex = category.indexOf(cName);
    
    if (cIndex === -1) {
        throw new Error('This category not exist');
    }

    const result = data.reduce((arr, obj) => {
        if (obj.category === cIndex) {
            arr.push({ ...obj, category: cName})
        }

        

        return arr;
    }, []);

    if (sort) {
        result.sort(({price: priceA}, {price: priceB}) => (priceA - priceB) * sort);
    }

    return result;
}

module.exports = getByCategory;