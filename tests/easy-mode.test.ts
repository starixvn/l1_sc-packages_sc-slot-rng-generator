import { ReturnToPlayerCalculator } from "../src/return-to-player-calculator";
import { betChoiceTable } from "./bet-choice-table";

describe("ReturnToPlayerCalculator", () => {
    describe("Easy mode", () => {
        it("should work", () => {
            // Arrange
            const calculate = new ReturnToPlayerCalculator(betChoiceTable, { ratio: 0.24, extraMin: 1, extraMax: 2 }, 1);

            // Act
            const result = calculate.calculate(10000);

            // Assert
            console.log("Easy: ", result);
        });
    });
});
