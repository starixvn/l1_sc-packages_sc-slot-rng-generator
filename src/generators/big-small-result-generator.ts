import { RandomHelper } from "../helpers/random-helper";

export class BigSmallResultGenerator {
    private readonly randomMode: number;

    constructor(randomMode: number) {
        this.randomMode = randomMode;
    }

    generate() {
        const smallValues = [1, 2, 3, 4, 5, 6, 7];
        const bigValues = [8, 9, 10, 11, 12, 13, 14];
        const randomItems = smallValues.concat(bigValues);
        const value = RandomHelper.getRandomFromArray(randomItems, this.randomMode);

        return {
            value,
            choice: smallValues.includes(value) ? "small" : "big",
        };
    }
}
