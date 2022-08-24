import { RandomHelper } from "../src/random-helper";

describe("random", () => {
    const randomModes = [[1], [2], [3], [4]];

    test.each(randomModes)("random mode %p", (randomMode) => {
        // Arrange
        const min = 0;
        const max = 3;
        const random = RandomHelper.random(randomMode);

        // Act
        const result: number[] = [];
        for (let i = 0; i < 100; i++) {
            result.push(random(min, max));
        }

        // Assert
        expect(result.includes(0)).toBe(true);
        expect(result.includes(1)).toBe(true);
        expect(result.includes(2)).toBe(true);
        expect(result.includes(3)).toBe(true);
    });
});
