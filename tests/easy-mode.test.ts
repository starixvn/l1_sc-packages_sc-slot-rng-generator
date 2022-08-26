import { ReturnToPlayerCalculator } from "../src/return-to-player-calculator";
import { betChoiceTable } from "./bet-choice-table";

describe("ReturnToPlayerCalculator", () => {
    describe("Easy mode", () => {
        it("should work", () => {
            // Arrange
            const calculate = new ReturnToPlayerCalculator(betChoiceTable, { ratio: 0.24, extraMin: 1, extraMax: 2 }, 1);

            // Act
            const result1 = calculate.calculate(100000, "orange");
            const result2 = calculate.calculate(100000, "orange");
            const result3 = calculate.calculate(100000, "orange");

            // Assert
            console.log("Easy 1: ", result1);
            console.log("Easy 2: ", result2);
            console.log("Easy 3: ", result3);
        });
    });
});
