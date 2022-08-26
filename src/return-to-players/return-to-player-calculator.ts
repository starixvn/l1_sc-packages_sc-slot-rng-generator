import { ResultGenerator } from "../generators/result-generator";
import { RandomHelper } from "../helpers/random-helper";
import { BetChoiceTable } from "../models/bet-choice-table";
import { LuckyConfig } from "../models/lucky-config";

export class ReturnToPlayerCalculator {
    private readonly generator: ResultGenerator;
    private readonly betChoiceTable: BetChoiceTable;
    private readonly randomMode: number;

    constructor(betChoiceTable: BetChoiceTable, luckyConfig: LuckyConfig, randomMode: number) {
        this.generator = new ResultGenerator(betChoiceTable, luckyConfig, randomMode);
        this.betChoiceTable = betChoiceTable;
        this.randomMode = randomMode;
    }

    calculate(roundCount: number, selectedChoice: string) {
        const chips = [10, 100, 1000];
        const allChoices = this.betChoiceTable.choices.filter((value) => value.canBet).map((value) => value.name);

        let totalBet = 0;
        let totalWin = 0;
        let luckyCount = 0;
        let betStats = {};
        let resultStats = {};
        for (let i = 0; i < roundCount; i++) {
            const chip = RandomHelper.getRandomFromArray(chips, this.randomMode);
            const choice = selectedChoice ? selectedChoice : RandomHelper.getRandomFromArray(allChoices, this.randomMode);
            const relatedChoices = this.getRelatedChoices(choice);
            const betChoices = relatedChoices && relatedChoices.length > 0 ? relatedChoices.concat([choice]) : [choice];
            const result = this.generator.generate();
            const winningChoice = this.getWinningChoice(betChoices, result);

            if (betStats[choice]) {
                betStats[choice]["count"] += 1;
                betStats[choice]["bet"] += chip;
            } else {
                betStats[choice] = { count: 1, win: 0, bet: chip };
            }

            result.forEach((c) => {
                if (resultStats[c]) {
                    resultStats[c] += 1;
                } else {
                    resultStats[c] = 1;
                }
            });

            if (result.length > 1) {
                luckyCount += 1;
            }

            if (winningChoice) {
                const odds = this.getOddOfChoice(winningChoice);
                betStats[choice]["win"] += chip * odds;
                totalWin += chip * odds;
            }

            totalBet += chip;
        }

        this.calculateBetStatistic(betStats);
        this.calculateResultStatistic(resultStats, roundCount);

        return {
            ticketCount: roundCount,
            totalBet: totalBet,
            totalWin: totalWin,
            payout: (totalWin / totalBet).toFixed(2),
            luckyCount: luckyCount,
            betStats,
            //resultStats,
        };
    }

    calculateBetStatistic(betStat) {
        Object.keys(betStat).forEach((k) => {
            betStat[k] = { ...betStat[k], percentage: ((betStat[k]["win"] / betStat[k]["bet"]) * 100).toFixed(2) };
        });
    }

    calculateResultStatistic(resultStat, roundCount: number) {
        Object.keys(resultStat).forEach((k) => {
            const odds = this.betChoiceTable.choices.find((choice) => choice.name == k).odds;
            resultStat[k] = {
                count: resultStat[k],
                percentage: ((resultStat[k] / roundCount) * 100).toFixed(2),
                "percentage*odds": ((resultStat[k] / roundCount) * odds).toFixed(2),
                odds,
            };
        });
    }

    getWinningChoice(betChoices: string[], resultBetChoices: string[]) {
        return betChoices.find((betChoice) => resultBetChoices.includes(betChoice));
    }

    getOddOfChoice(choice: string) {
        return this.betChoiceTable.choices.find((c) => c.name === choice).odds;
    }

    getRelatedChoices(choice: string) {
        return this.betChoiceTable.choices.find((c) => c.name === choice).relatedChoices;
    }
}
