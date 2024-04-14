import {
    getEmotionPath,
    getEmotion,
    getClothesPath,
    getClothes,
} from "../src/services/AppearanceService";
import {
    emotions,
    tops,
    bottoms,
    accessories,
} from "../src/constants/resources";
import { getPointInfo } from "../src/services/PointsService";

// Mock Points Service
jest.mock("../src/services/PointsService", () => ({
    getPointInfo: jest.fn(),
}));

describe("Appearance Service", () => {
    describe("Get Emotion", () => {
        it("returns the user's current emotion value", async () => {
            const mockPoints = { exercise_points: 20, eating_points: 20, sleeping_points: 5, studying_points: 2, wellness_points: 57, emotion_value: 1 }
            getPointInfo.mockResolvedValue(mockPoints);
            const emotion = (await getEmotion()).emotion;
            expect(emotion).toBe(1);
        });
    });

    describe("Get Emotion Path", () => {
        it("returns the path to the image of the user's current emotion", async () => {
            const mockPoints = { exercise_points: 20, eating_points: 20, sleeping_points: 5, studying_points: 2, wellness_points: 57, emotion_value: 1 }
            getPointInfo.mockResolvedValue(mockPoints);
            const path = await getEmotionPath();
            expect(path).toBe(emotions["neutral_face"]);
        });
    });

    describe("Get Clothes", () => {
        //TODO: finish when there is a retreival funcitn that can be mocked
    });

    //TODO: finish when there is a retreival funcitn that can be mocked

    describe("Get Clothes Path", () => {
        it("returns the path to the image of the user's current clothes", () => {
            const clothes = getClothes();
            const path = getClothesPath();

            expect(path).toStrictEqual({
                top: tops[clothes.top],
                bottom: bottoms[clothes.bottom],
                accessories: accessories[clothes.accessories],
            });
        });
    });
});
