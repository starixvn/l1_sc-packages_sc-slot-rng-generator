import { ResultGenerator } from "../src/result-generator";
import { BetChoiceTable } from "../src/bet-choice-table";

xdescribe("ResultGenerator", () => {
    it("should work", () => {
        // Arrange
        const betChoiceTable = {
            choices: [
                {
                    name: "bar100",
                    odds: 100,
                    count: 6,
                },
                {
                    name: "starx3",
                    odds: 3,
                    count: 200,
                },
                {
                    name: "bellx3",
                    odds: 3,
                    count: 200,
                },
            ],
        };
        const generator = new ResultGenerator(betChoiceTable, { ratio: 0.5, extraMin: 1, extraMax: 2 });

        // Act
        const result = generator.generate();

        // Assert
        console.log(result);
    });
});
