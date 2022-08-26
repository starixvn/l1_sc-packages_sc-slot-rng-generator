import { BigSmallResultGenerator } from "../../src/generators/big-small-result-generator";

describe("ReturnToPlayerCalculator", () => {
    describe("Easy mode", () => {
        it("should work", () => {
            // Arrange
            const generator = new BigSmallResultGenerator(1);

            // Act
            let bigCount = 0;
            const total = 100000;
            for (let i = 0; i < total; i++) {
                const result = generator.generate();
                if (result.choice === "big") {
                    bigCount += 1;
                }
            }

            const statistic = {
                big: {
                    count: bigCount,
                    percentage: ((bigCount / total) * 100).toFixed(2),
                },
                small: {
                    count: total - bigCount,
                    percentage: (((total - bigCount) / total) * 100).toFixed(2),
                },
            };

            // Assert
            console.log("statisc ", statistic);
        });
    });
});
