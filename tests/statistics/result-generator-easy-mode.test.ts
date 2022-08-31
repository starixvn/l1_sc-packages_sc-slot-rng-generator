import { ReturnToPlayerCalculator } from "../../src/return-to-players/return-to-player-calculator";
import { betChoices } from "./bet-choice-table";

describe("ReturnToPlayerCalculator", () => {
    describe("Easy mode", () => {
        it("should work", () => {
            // Arrange
            const calculate = new ReturnToPlayerCalculator(betChoices, { ratio: 0.24, extraMin: 1, extraMax: 2 }, 1);

            // Act
            const result1 = calculate.calculate(1000, "cherry");
            const result2 = calculate.calculate(1000, "cherry");
            const result3 = calculate.calculate(1000, "cherry");

            // Assert
            console.log("Easy 1: ", result1);
            console.log("Easy 2: ", result2);
            console.log("Easy 3: ", result3);
        });
    });
});
