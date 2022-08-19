import { ResultGenerator } from "./result-generator";
import { RandomHelper } from "./random-helper";
import { BetChoiceTable } from "./bet-choice-table";
import { LuckyConfig } from "./lucky-config";

export class ReturnToPlayerCalculator {
    private readonly generator: ResultGenerator;
    private readonly betChoiceTable: BetChoiceTable;

    constructor(betChoiceTable: BetChoiceTable, luckyConfig: LuckyConfig) {
        this.generator = new ResultGenerator(betChoiceTable, luckyConfig);
        this.betChoiceTable = betChoiceTable;
    }

    calculate(roundCount: number) {
        const chips = [10, 100, 1000];
        const allChoices = this.betChoiceTable.choices.filter((value) => value.canBet).map((value) => value.name);

        let totalBet = 0;
        let totalWin = 0;
        let luckyCount = 0;
        for (let i = 0; i < roundCount; i++) {
            const chip = RandomHelper.getRandomFromArr(chips);
            const choice = RandomHelper.getRandomFromArr(allChoices);
            const relatedChoices = this.getRelatedChoices(choice);
            const betChoices = relatedChoices && relatedChoices.length > 0 ? relatedChoices.concat([choice]) : [choice];
            const result = this.generator.generate();
            const winningChoice = this.getWinningChoice(betChoices, result);

            if (result.length > 1) {
                luckyCount += 1;
            }

            if (winningChoice) {
                const odds = this.getOddOfChoice(winningChoice);
                totalWin += chip * odds;
            }

            totalBet += chip;
        }

        return {
            ticketCount: roundCount,
            totalBet: totalBet,
            totalWin: totalWin,
            payout: (totalWin / totalBet).toFixed(2),
            luckyCount: luckyCount,
        };
    }

    getWinningChoice(betChoices: string[], resultBetChoices: string[]) {
        return betChoices.find((betChoice) => resultBetChoices.includes(betChoice));
    }

    getOddOfChoice(choice) {
        return this.betChoiceTable.choices.find((c) => c.name === choice).odds;
    }

    getRelatedChoices(choice) {
        return this.betChoiceTable.choices.find((c) => c.name === choice).relatedChoices;
    }
}
