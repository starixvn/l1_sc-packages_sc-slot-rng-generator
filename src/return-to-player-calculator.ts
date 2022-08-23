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
        let betStats = {};
        let resultStats = {};
        for (let i = 0; i < roundCount; i++) {
            const chip = RandomHelper.getRandomFromArr(chips);
            const choice = RandomHelper.getRandomFromArr(allChoices);
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
            resultStats,
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

    getOddOfChoice(choice) {
        return this.betChoiceTable.choices.find((c) => c.name === choice).odds;
    }

    getRelatedChoices(choice) {
        return this.betChoiceTable.choices.find((c) => c.name === choice).relatedChoices;
    }
}
