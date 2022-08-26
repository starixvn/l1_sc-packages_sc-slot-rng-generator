import { ResultGenerator } from "../../src/generators/result-generator";

describe("ResultGenerator", () => {
    it("should work", () => {
        // Arrange
        const betChoiceTable = {
            choices: [
                {
                    name: "big",
                    odds: 2,
                    count: 100,
                    canBet: true,
                    relatedChoices: [],
                },
                {
                    name: "small",
                    odds: 2,
                    count: 100,
                    canBet: true,
                    relatedChoices: [],
                },
            ],
        };
        const generator = new ResultGenerator(betChoiceTable, { ratio: 0, extraMin: 1, extraMax: 2 }, 1);

        // Act
        const result = generator.generate();

        // Assert
        console.log(result);
        expect(result.length).toBe(1);
        expect(["big", "small"].includes(result[0]));
    });
});
