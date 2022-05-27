const chai = require('chai');

const getByCategory = require('./function/getByCategory');
const getByAll = require('./function/getAll');

const expect = chai.expect

chai.use(require("chai-sorted"));

describe('PageOfProduct', () => {
    describe('Get product py category', () => {
        it('Should return all products of decks', () => {
            const decks = getByCategory('decks');

            expect(decks).to.be.an('array');
            expect(decks).to.have.length(4);
        });

        it('Should return all products of wheels', () => {
            const wheels = getByCategory('wheels');

            expect(wheels).to.be.an('array');
            expect(wheels).to.have.length(5);
        });

        it('Should return all products of trucks', () => {
            const trucks = getByCategory('trucks');

            expect(trucks).to.be.an('array');
            expect(trucks).to.have.length(4);
        });

        it('Should return error if category not exist', () => {
            try {
                getByCategory('NOTEXITS');
            } catch(e) {
                expect(e.message).to.equal('This category not exist');
            }
        });
    });

    describe('Get product by category in descending order of price', () => {
        it('Should return sorted products (decks)', () => {
            const decks = getByCategory('decks', -1);

            expect(decks).to.be.an('array');
            expect(decks).to.be.sortedBy('price', { descending: true });
        });

        it('Should return sorted products (wheels)', () => {
            const wheels = getByCategory('wheels', -1);

            expect(wheels).to.be.an('array');
            expect(wheels).to.be.sortedBy('price', { descending: true });
        });

        it('Should return sorted products (trucks)', () => {
            const trucks = getByCategory('trucks', -1);

            expect(trucks).to.be.an('array');
            expect(trucks).to.be.sortedBy('price', { descending: true });
        });

        it('Should return error if sort argument is invalid', () => {
            try {
                getByCategory('trucks', 'NOTEXITS');
            } catch (e) {
                expect(e.message).to.equal('Sort agrument is invalid');
            }
        });
    });

    describe('getAllProduct', () => {
        it('Should return all products', () => {
            const all = getByAll();

            expect(all).to.be.an('array');
            expect(all).to.have.length(13);
        })
    });

    describe('getAllProductWithSort in descending order of price.', () => {
        it('Should return sorted products', () => {
            const all = getByAll({sort: -1});

            expect(all).to.be.an('array');
            expect(all).to.be.sortedBy('price', { descending: true });
        })

        it('Should return error if sort argument is invalid', () => {
            try {
                getByAll({ sort: 'NOTEXITS' });
            } catch (e) {
                expect(e.message).to.equal('Sort agrument is invalid');
            }
        });
    });

    describe('getAllProductWithPagination', () => {
        it('Should return all remaining elements', () => {
            const all = getByAll({ offset: 10 });

            expect(all).to.be.an('array');
            expect(all).to.have.length(3);
        });

        it('Should return limited numbers of products', () => {
            const all = getByAll({ limit: 2 });

            expect(all).to.be.an('array');
            expect(all).to.have.length(2);
            expect(all).to.eql([{
                name: 'ALMOST X REN',
                category: 'decks',
                price: 120
            }, {
                name: 'HOCKEY',
                category: 'decks',
                price: 140
            }])
        });

        it('Should return empty array', () => {
            const all = getByAll({ offset: 30, limit: 2 });

            expect(all).to.be.an('array');
            expect(all).to.have.length(0);
        });

        it('Should return limited numbers of products with displacement', () => {
            const all = getByAll({ offset: 9, limit: 1 });

            expect(all).to.be.an('array');
            expect(all).to.have.length(1);
            expect(all).to.eql([{ name: 'BOARDTOWN', price: 60, category: 'wheels' }])
        });
    });

    describe('getAllProductWithSortAndPagination', () => {
        it('Should return sort limited numbers of products with displacement', () => {
            const all = getByAll({ offset: 3, limit: 2, sort: -1 });

            expect(all).to.be.an('array');
            expect(all).to.have.length(2);
            expect(all).to.eql([{ name: 'BORDER TOWN', price: 245, category: 'decks' },
                { name: 'INDEPENDET', price: 200, category: 'trucks' }]);
            expect(all).to.be.sortedBy('price', { descending: true });
        })
    });

});