import { BetChoiceTable } from "./bet-choice-table";
import { LuckyConfig } from "./lucky-config";
import { RandomHelper } from "./random-helper";

export class ResultGenerator {
    private readonly luckyConfig: LuckyConfig;
    private readonly betChoiceTable: BetChoiceTable;
    private readonly randomMode: number;

    constructor(betChoiceTable, luckyConfig, randomMode) {
        this.luckyConfig = luckyConfig;
        this.betChoiceTable = betChoiceTable;
        this.randomMode = randomMode;
    }

    generate() {
        const extraCount = this.getExtraCount();
        const result = [];
        Array(1 + extraCount)
            .fill(1)
            .forEach(() => {
                const excludedChoices = this.getExcludedChoices(result);
                const choice = this.generateWithFilter(excludedChoices);
                result.push(choice);
            });

        return result;
    }

    generateWithFilter(excludedChoices: string[]) {
        const mapper = {};
        let selectionArr = [];

        this.betChoiceTable.choices.forEach((choice, index) => {
            if (!excludedChoices.includes(choice.name)) {
                mapper[index + 1] = choice;
                selectionArr = selectionArr.concat(Array(choice.count).fill(index + 1));
            }
        });

        const randomValue = RandomHelper.getRandomFromArray(selectionArr, this.randomMode);
        const selectedBetChoice = mapper[randomValue];

        return selectedBetChoice.name;
    }

    getExtraCount() {
        const arr1 = Array(this.luckyConfig.ratio * 100).fill(1);
        const arr2 = Array(100 - this.luckyConfig.ratio * 100).fill(0);
        const value = RandomHelper.getRandomFromArray(arr1.concat(arr2), this.randomMode);

        let extraCount = 0;
        if (value === 1) {
            extraCount = RandomHelper.random(this.randomMode)(this.luckyConfig.extraMin, this.luckyConfig.extraMax);
        }

        return extraCount;
    }

    getExcludedChoices(choices): string[] {
        const allRelatedChoices = this.betChoiceTable.choices
            .filter((choice) => choice.relatedChoices && choice.relatedChoices.length > 0)
            .map((choice) => choice.relatedChoices.concat([choice.name]));

        const excludedChoices = [];
        choices.forEach((choice) => {
            const relatedChoices = allRelatedChoices.find((rc) => rc.includes(choice));
            if (relatedChoices) {
                excludedChoices.push(...relatedChoices);
            } else {
                excludedChoices.push(choice);
            }
        });

        return excludedChoices;
    }
}
