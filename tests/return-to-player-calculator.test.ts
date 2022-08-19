import { ReturnToPlayerCalculator } from "../src/return-to-player-calculator";

describe("ReturnToPlayerCalculator", () => {
    describe("Easy mode", () => {
        it("should work", () => {
            // Arrange
            const betChoiceTable = {
                choices: [
                    {
                        name: "bar100",
                        odds: 100,
                        count: 6,
                        canBet: true,
                        relatedChoices: ["bar50", "bar25"],
                    },
                    {
                        name: "bar50",
                        odds: 50,
                        count: 12,
                        canBet: false,
                        relatedChoices: [],
                    },
                    {
                        name: "bar25",
                        odds: 25,
                        count: 24,
                        canBet: false,
                        relatedChoices: [],
                    },
                    {
                        name: "77",
                        odds: 40,
                        count: 15,
                        canBet: true,
                        relatedChoices: ["77x3"],
                    },
                    {
                        name: "77x3",
                        odds: 3,
                        count: 200,
                        canBet: false,
                        relatedChoices: [],
                    },
                    {
                        name: "star",
                        odds: 30,
                        count: 20,
                        canBet: true,
                        relatedChoices: ["starx3"],
                    },
                    {
                        name: "starx3",
                        odds: 3,
                        count: 200,
                        canBet: false,
                        relatedChoices: [],
                    },
                    {
                        name: "watermelon",
                        odds: 20,
                        count: 30,
                        canBet: true,
                        relatedChoices: ["watermelonx3"],
                    },
                    {
                        name: "watermelonx3",
                        odds: 3,
                        count: 200,
                        canBet: false,
                        relatedChoices: [],
                    },
                    {
                        name: "bell",
                        odds: 20,
                        count: 30,
                        canBet: true,
                        relatedChoices: ["bellx3"],
                    },
                    {
                        name: "bellx3",
                        odds: 3,
                        count: 200,
                        canBet: false,
                        relatedChoices: [],
                    },
                    {
                        name: "lemon",
                        odds: 15,
                        count: 40,
                        canBet: true,
                        relatedChoices: ["lemonx3"],
                    },
                    {
                        name: "lemonx3",
                        odds: 3,
                        count: 200,
                        canBet: false,
                        relatedChoices: [],
                    },
                    {
                        name: "orange",
                        odds: 10,
                        count: 60,
                        canBet: true,
                        relatedChoices: ["orangex3"],
                    },
                    {
                        name: "orangex3",
                        odds: 3,
                        count: 200,
                        canBet: false,
                        relatedChoices: [],
                    },
                    {
                        name: "cherry",
                        odds: 5,
                        count: 120,
                        canBet: true,
                        relatedChoices: ["cherryx3"],
                    },
                    {
                        name: "cherryx3",
                        odds: 3,
                        count: 200,
                        canBet: false,
                        relatedChoices: [],
                    },
                ],
            };
            const calculate = new ReturnToPlayerCalculator(betChoiceTable, { ratio: 0.25, extraMin: 1, extraMax: 2 });

            // Act
            const result = calculate.calculate(50000);

            // Assert
            console.log(result);
        });
    });
});
