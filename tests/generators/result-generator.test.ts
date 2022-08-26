import { ResultGenerator } from "../../src/generators/result-generator";
import { betChoiceTable } from "../statistics/bet-choice-table";

describe("ResultGenerator", () => {
    it("should not generate overlapped choice or related choice for free spins", () => {
        // Arrange
        const generator = new ResultGenerator(betChoiceTable, { ratio: 0.24, extraMin: 1, extraMax: 2 }, 1);

        // Act
        const freeSpinResult: string[][] = [];
        for (let i = 0; i < 10; i++) {
            const result = generator.generate();
            if (result.length > 1) {
                freeSpinResult.push(result);
            }
        }

        const allRelatedChoices: string[][] = [];
        betChoiceTable.choices.forEach((choice) => {
            if (choice.relatedChoices && choice.relatedChoices.length > 0) {
                allRelatedChoices.push([choice.name, ...choice.relatedChoices]);
            }
        });

        // Assert
        freeSpinResult.forEach((result) => {
            getPairsOfArray(result).forEach((pair) => {
                const group1 = allRelatedChoices.find((group) => group.includes(pair[0]));
                const group2 = allRelatedChoices.find((group) => group.includes(pair[1]));

                expect(pair[0]).not.toEqual(pair[1]);
                expect(group1).not.toEqual(group2);
            });
        });
    });
});

const getPairsOfArray = (arr: string[]) => {
    const res: string[][] = [];
    for (var i = 0; i < arr.length; ++i) {
        for (var j = i + 1; j < arr.length; ++j) {
            res.push([arr[i], arr[j]]);
        }
    }

    return res;
};
