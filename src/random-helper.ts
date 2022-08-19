import * as Chance from "chance";

export class RandomHelper {
    static getRandomFromArr(array) {
        array = this.shuffle1(array);
        const chance = new Chance();
        const randomIndex = chance.integer({ min: 0, max: array.length - 1 });
        return array[randomIndex];
    }

    static shuffle1(array) {
        const chance = new Chance();
        array = chance.shuffle(array);
        array = chance.shuffle(array);
        array = chance.shuffle(array);

        return array;
    }
}
