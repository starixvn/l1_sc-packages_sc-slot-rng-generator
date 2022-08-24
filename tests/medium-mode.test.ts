import { ReturnToPlayerCalculator } from "../src/return-to-player-calculator";
import { betChoiceTable } from "./bet-choice-table";

describe("ReturnToPlayerCalculator1", () => {
    describe("Medium mode1", () => {
        it("should work1", () => {
            // Arrange
            const calculate = new ReturnToPlayerCalculator(betChoiceTable, { ratio: 0.21, extraMin: 1, extraMax: 2 }, 3);

            // Act
            const result = calculate.calculate(10000);

            // Assert
            console.log("Medium: ", result);
        });
    });
});
