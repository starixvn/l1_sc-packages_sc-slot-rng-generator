import { ReturnToPlayerCalculator } from "../src/return-to-player-calculator";
import { betChoiceTable } from "./bet-choice-table";

describe("ReturnToPlayerCalculator1", () => {
    describe("Medium mode1", () => {
        it("should work1", () => {
            // Arrange
            const calculate = new ReturnToPlayerCalculator(betChoiceTable, { ratio: 0.21, extraMin: 1, extraMax: 2 }, 3);

            // Act
            const result1 = calculate.calculate(100000, "orange");
            const result2 = calculate.calculate(100000, "orange");
            const result3 = calculate.calculate(100000, "orange");

            // Assert
            console.log("Medium 1: ", result1);
            console.log("Medium 2: ", result2);
            console.log("Medium 3: ", result3);
        });
    });
});
