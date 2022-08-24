import * as Chance from "chance";
import { MersenneTwister19937, Random as RandomJS } from "random-js";

export class RandomHelper {
    static getRandomFromArray(array, mode: number) {
        array = this.shuffle1(array);
        const randomIndex = this.random(mode)(0, array.length - 1);
        return array[randomIndex];
    }

    static shuffle1(array) {
        const chance = new Chance();
        array = chance.shuffle(array);
        array = chance.shuffle(array);
        array = chance.shuffle(array);

        return array;
    }

    static random1(min: number, max: number) {
        const chance = new Chance();
        return chance.integer({ min: min, max: max });
    }

    static random2(min: number, max: number) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    static random3(min: number, max: number) {
        const randomJS = new RandomJS(MersenneTwister19937.autoSeed());

        return randomJS.integer(min, max);
    }

    static random(mode: number) {
        switch (mode) {
            case 1: {
                return this.random1;
            }
            case 2: {
                return this.random2;
            }
            case 3: {
                return this.random3;
            }
            default: {
                return this.random1;
            }
        }
    }
}
