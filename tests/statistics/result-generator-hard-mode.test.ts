import { ReturnToPlayerCalculator } from "../../src/return-to-players/return-to-player-calculator";
import { betChoices } from "./bet-choice-table";

describe("ReturnToPlayerCalculator", () => {
    describe("Hard mode", () => {
        it("should work", () => {
            // Arrange
            const calculate = new ReturnToPlayerCalculator(betChoices, { ratio: 0.18, extraMin: 1, extraMax: 2 }, 2);

            // Act
            const result1 = calculate.calculate(1000, "cherry");
            const result2 = calculate.calculate(1000, "cherry");
            const result3 = calculate.calculate(1000, "cherry");

            // Assert
            console.log("Hard 1: ", result1);
            console.log("Hard 2: ", result2);
            console.log("Hard 3: ", result3);
        });
    });
});
