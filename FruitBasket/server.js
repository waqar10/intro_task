const fs = require('fs');
const BasketCalculation = require('./BasketCalculation');

const fruitsData = async () => {
    return new Promise((resolve, reject) => {
        fs.readFileSync('input.json', 'utf8',  (err, data) => {
            if (err){
                console.error('Error while reading the input file');
                reject(err);
            } else {
                const basketCalculation = new BasketCalculation(JSON.parse(data));
                const summary = basketCalculation.createSummary();
                fs.writeFile('output.json', JSON.stringify(summary), 'utf8', (err) => {
                    if (err) {
                        console.error('Error while writing the output into file');
                        reject(err);
                    } else {
                       resolve();
                    }
                });
            }
        });
    });
};

fruitsData().then();


module.exports = {fruitsData};


