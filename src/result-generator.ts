import { BetChoiceTable } from "./bet-choice-table";
import * as Chance from "chance";
import { LuckyConfig } from "./lucky-config";
import { RandomHelper } from "./random-helper";

export class ResultGenerator {
    private readonly luckyConfig: LuckyConfig;
    private readonly betChoiceTable: BetChoiceTable;

    constructor(betChoiceTable, luckyConfig) {
        this.luckyConfig = luckyConfig;
        this.betChoiceTable = betChoiceTable;
    }

    generate() {
        const extraCount = this.getExtraCount();
        const result = [];
        Array(1 + extraCount)
            .fill(1)
            .forEach(() => {
                const choice = this.generateWithFilter(result);
                result.push(choice);
            });

        return result;
    }

    generateWithFilter(excludedChoices: string[]) {
        const mapper = {};
        let selectionArr = [];

        this.betChoiceTable.choices.forEach((value, index) => {
            if (!excludedChoices.includes(value.name)) {
                mapper[index + 1] = value;
                selectionArr = selectionArr.concat(Array(value.count).fill(index + 1));
            }
        });

        const randomValue = RandomHelper.getRandomFromArr(selectionArr);
        const selectedBetChoice = mapper[randomValue];

        return selectedBetChoice.name;
    }

    getExtraCount() {
        const arr1 = Array(this.luckyConfig.ratio * 100).fill(1);
        const arr2 = Array(100 - this.luckyConfig.ratio * 100).fill(0);
        const value = RandomHelper.getRandomFromArr(arr1.concat(arr2));

        let extraCount = 0;
        if (value === 1) {
            const chance = new Chance();
            extraCount = chance.integer({ min: this.luckyConfig.extraMin, max: this.luckyConfig.extraMax });
        }

        return extraCount;
    }
}
