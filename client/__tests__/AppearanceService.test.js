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
import { getAssets } from "../src/services/AssetsService";

// Mock Points Service
jest.mock("../src/services/PointsService", () => ({
    getPointInfo: jest.fn(),
    getQualityPoints: jest.fn(),
}));

// Mock async storage
jest.mock("@react-native-async-storage/async-storage", () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

// Mock Assets Service
jest.mock("../src/services/AssetsService", () => ({
    getAssets: jest.fn(),
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
        it("returns the user's current clothes", async () => {
            const assets = {
                owned: {
                    tops: ["yale_tshirt"],
                    bottoms: [],
                    accessories: [],
                },
                active: {
                    tops: "yale_tshirt",
                    bottoms: "medium_jeans",
                },
            };

            getAssets.mockReturnValue(assets);

            const clothes = await getClothes();
            expect(clothes).toStrictEqual({
                top: "yale_tshirt",
                bottom: "medium_jeans",
                accessories: null,
            });
        });
    });

    describe("Get Clothes Path", () => {
        it("returns the path to the image of the user's current clothes", async () => {
            const clothes = await getClothes();
            const path = await getClothesPath();

            expect(path).toStrictEqual({
                top: tops[clothes.top],
                bottom: bottoms[clothes.bottom],
                accessories: accessories[clothes.accessories],
            });
        });
    });
});
