import {
    getExpression,
    getLowestHabit,
    expressions,
} from "../src/services/DansWordsService";
import { getPointInfo } from "../src/services/PointsService";
import { getEmotion } from "../src/services/AppearanceService";

jest.mock("../src/services/PointsService", () => ({
    getPointInfo: jest.fn(),
}));

jest.mock("../src/services/AppearanceService", () => ({
    getEmotion: jest.fn(),
}));

describe("Dans Words Service", () => {
    describe("Get Lowest Habit", () => {
        it("returns the lowest habit", async () => {
            getPointInfo.mockResolvedValue({
                eating_points: 23,
                sleeping_points: 25,
                studying_points: 20,
                exercise_points: 26,
            });
            const habit = await getLowestHabit();
            expect(habit).toBe("Studying");
        });
    });

    describe("Get Expression", () => {
        it("should return a happy expression if emotion is above 60", async () => {
            getEmotion.mockResolvedValue(65); // Emotion greater than 60
            const expression = await getExpression();
            expect(expressions["Happy"]).toContain(expression);
        });

        it("should return a relevant expression based on the lowest habit if emotion is 60 or below", async () => {
            getEmotion.mockResolvedValue(60);
            getPointInfo.mockResolvedValue({
                eating_points: 20,
                sleeping_points: 27,
                studying_points: 22,
                exercise_points: 26,
            });
            const expression = await getExpression();
            expect(expressions["Eating"]).toContain(expression);
        });
    });
});
