import { BetChoice } from "../models/bet-choice-table";
import { LuckyConfig } from "../models/lucky-config";
import { RandomHelper } from "../helpers/random-helper";

export class ResultGenerator {
    private readonly luckyConfig: LuckyConfig;
    private readonly betChoices: BetChoice[];
    private readonly randomMode: number;

    constructor(betChoices: BetChoice[], luckyConfig: LuckyConfig, randomMode: number) {
        this.luckyConfig = luckyConfig;
        this.betChoices = betChoices;
        this.randomMode = randomMode;
    }

    generate(): string[] {
        const freeSpinCount = this.getFreeSpinCount();
        const result = [];
        Array(1 + freeSpinCount)
            .fill(1)
            .forEach(() => {
                const excludedChoices = this.getExcludedChoices(result);
                const choice = this.generateWithFilter(excludedChoices);
                result.push(choice);
            });

        return result;
    }

    generateWithFilter(excludedChoices: string[]) {
        const resultGroup = Array<BetChoice>();
        let randomItems = Array<number>();

        this.betChoices.forEach((choice, index) => {
            if (!excludedChoices.includes(choice.name)) {
                resultGroup[index + 1] = choice;
                randomItems = randomItems.concat(Array<number>(choice.count).fill(index + 1));
            }
        });

        const resultGroupIndex = RandomHelper.getRandomFromArray(randomItems, this.randomMode);
        const result = resultGroup[resultGroupIndex];

        return result.name;
    }

    getFreeSpinCount() {
        const luckySymbolRandomItems = Array(this.luckyConfig.ratio * 100).fill(1);
        const nonLuckySymbolRandomItems = Array(100 - this.luckyConfig.ratio * 100).fill(0);
        const isLuckySymbolOccur = RandomHelper.getRandomFromArray(luckySymbolRandomItems.concat(nonLuckySymbolRandomItems), this.randomMode) === 1;

        let freeSpinCount = 0;
        if (isLuckySymbolOccur) {
            freeSpinCount = RandomHelper.random(this.randomMode)(this.luckyConfig.extraMin, this.luckyConfig.extraMax);
        }

        return freeSpinCount;
    }

    getExcludedChoices(choices): string[] {
        const allRelatedChoices = this.betChoices
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
