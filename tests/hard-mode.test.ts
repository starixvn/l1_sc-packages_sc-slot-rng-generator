import { ReturnToPlayerCalculator } from "../src/return-to-player-calculator";
import { betChoiceTable } from "./bet-choice-table";

describe("ReturnToPlayerCalculator", () => {
    describe("Hard mode", () => {
        it("should work", () => {
            // Arrange
            const calculate = new ReturnToPlayerCalculator(betChoiceTable, { ratio: 0.18, extraMin: 1, extraMax: 2 }, 2);

            // Act
            const result1 = calculate.calculate(100000, "orange");
            const result2 = calculate.calculate(100000, "orange");
            const result3 = calculate.calculate(100000, "orange");

            // Assert
            console.log("Hard 1: ", result1);
            console.log("Hard 2: ", result2);
            console.log("Hard 3: ", result3);
        });
    });
});
