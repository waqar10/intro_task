const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const fs = require('fs');
const {fruitsData} = require('./server');
const BasketCalculation = require('./BasketCalculation');

const fruitInput = [
    {
    "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
    "max_weight": 8,
    "contents": [
      {
        "type": "apple",
        "color": "green",
        "weight": 1.5
      },
      {
        "type": "apple",
        "color": "red",
        "weight": 1
      },
      {
        "type": "pear",
        "color": "green",
        "weight": 2.5
      }
    ]
  }
];

it('Successfully created by reading file', (done) => {
    const readStub = sinon.fake.yieldsAsync(null, JSON.stringify(fruitInput));
    sinon.replace(fs, 'readFileSync', readStub);

    const fakeWrite = sinon.fake.yieldsAsync(null, undefined);
    sinon.replace(fs, 'writeFile', fakeWrite);
    fruitsData().then(data => {
        assert.isUndefined(data, "response should be undefined");
        done();
    })
});

it('BasketCalculation should return fruit', (done) => {
    const expectedFruitSummaryOutput = [
        {
            "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
            "total_fruits": 3,
            "total_weight": 5,
            "fruit_counts": [
                {
                    "type": "apple",
                    "count": 1
                },
                {
                    "type": "pear",
                    "count": 1
                }
            ]
        }
    ];
    fruitsData().then(data => {
        const basketCalculationObj = new BasketCalculation(fruitInput);
        const actualFruitSummary = basketCalculationObj.createSummary();
        assert.deepEqual(actualFruitSummary, expectedFruitSummaryOutput, 'expected output was not returned');
        done();
    })
});