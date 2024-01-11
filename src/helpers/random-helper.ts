import * as Chance from "chance";
import { MersenneTwister19937, Random as RandomJS } from "random-js";
import { randomInt } from "crypto";
import * as randomLib from "random";
import * as _ from "lodash";

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
    static random2(min, max) {
        return randomInt(min, max + 1);
    }

    static random3(min, max) {
        const chance = new Chance();
        return chance.natural({ min: min, max: max });
    }

    static random4(min, max) {
        // @ts-ignore
        return randomLib.int(min, max);
    }

    static random5(min, max) {
        const randomJs = new RandomJS(MersenneTwister19937.autoSeed());
        return randomJs.integer(min, max);
    }

    static random6(min, max) {
        return _.random(min, max);
    }

    static random7(min: number, max: number) {
        return min + Math.floor(Math.random() * (max - min + 1)); // NOSONAR
    }

    static random(mode: number) {
        const randomModes = {
            1: [this.random1, this.random2, this.random3, this.random4],
            2: [this.random4, this.random5, this.random6, this.random7],
            3: [this.random1, this.random3, this.random5, this.random7],
        };
        const chance = new Chance();
        const randomFunctions = randomModes[mode] || randomModes[1];
        return chance.pickone<Function>(randomFunctions);
    }
}
