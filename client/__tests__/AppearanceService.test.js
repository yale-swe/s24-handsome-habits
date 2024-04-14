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
import { getQualityPoints } from "../src/services/PointsService";

// Mock Points Service
jest.mock("../src/services/PointsService", () => ({
    getPointInfo: jest.fn(),
    getQualityPoints: jest.fn(),
}));

describe("Appearance Service", () => {
    describe("Get Emotion", () => {
        it("returns the user's current emotion value", async () => {
            getQualityPoints.mockReturnValue({
                wellness_points: 57,
            });
            const emotion = await getEmotion();
            expect(emotion).toBe(57);
        });
    });

    describe("Get Emotion Path", () => {
        it("returns the path to the image of the user's current emotion", async () => {
            getQualityPoints.mockReturnValue({
                wellness_points: 57,
            });
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
