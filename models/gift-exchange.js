const { BadRequestError } = require("../utils/errors");
class GiftExchange {
    static pairs(names) {
        if (names.length % 2 != 0) {
            throw new BadRequestError("numbers cannot be odd.");
        }
        //randomly pairing names together 
        const tuples = []
        while (names.length > 0) {
            const pair = [];
            while (pair.length < 2 && names.length > 0) {
                let randomIndex = Math.floor(Math.random() * names.length);
                pair.push(names[randomIndex]);
                names.splice(randomIndex, 1);
            }
            tuples.push(pair);
        }
        return tuples;
    }

    static traditional(names) {
        //we need to randomize the array first - shuffle algorithm
        let index = names.length - 1;
        while (index > 0) {
            const random = Math.floor(Math.random() * names.length);
            //swap elements
            let temp = names[index];
            names[index] = names[random];
            names[random] = temp;

            index -= 1;
        }

        //why is there an undefined name 

        const pairPhrases = [];
        for (let x = 0; x < names.length; x++) {
            //we need to wrap around the last element 
            pairPhrases.push(`${names[x]} is giving a gift to ${names[(x + 1) % names.length]}`);
        }
        return pairPhrases;
    }
}

module.exports = GiftExchange;