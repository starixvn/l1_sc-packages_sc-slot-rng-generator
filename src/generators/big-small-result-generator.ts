import { RandomHelper } from "../helpers/random-helper";

const SmallValues = [1, 2, 3, 4, 5, 6, 7];
const BigValues = [8, 9, 10, 11, 12, 13, 14];
const SmallText = "small";
const BigText = "big";

export class BigSmallResultGenerator {
    private readonly randomMode: number;

    constructor(randomMode: number) {
        this.randomMode = randomMode;
    }

    generate() {
        const randomItems = SmallValues.concat(BigValues);
        const value = RandomHelper.getRandomFromArray(randomItems, this.randomMode);

        return {
            value,
            choice: SmallValues.includes(value) ? SmallText : BigText,
        };
    }
}
