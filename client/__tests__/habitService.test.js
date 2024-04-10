import { addHabit, calculatePoints } from "../src/services/habitService"; // Adjust the import path accordingly
import apiUtil from "../src/services/apiUtil.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePointswithChange } from "../src/services/PointsService";

// Mocks
jest.mock("../src/services/apiUtil.js", () => ({
    post: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
    setItem: jest.fn(),
}));
jest.mock("../src/services/authenticationUtil", () => ({
    logout: jest.fn(),
}));
jest.mock("../src/services/PointsService", () => ({
    updatePointswithChange: jest.fn(),
}));

describe("addHabit", () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        apiUtil.post.mockClear();
        AsyncStorage.setItem.mockClear();
    });

    it("successfully adds a new habit", async () => {
        const newHabit = {
            category_name: "Exercising",
            date_and_time: "2024-04-10T18:07:44.594Z",
            description: "I workout",
            details: {
                workout: {
                    workout_duration: "10",
                    workout_intensity: "Medium",
                    workout_tag: "Weights",
                },
            },
            title: "Test Workout",
        };
        const mockResponseData = {
            habit: {
                __v: 0,
                _id: "6616d582383824a21e272960",
                category: "65e6ace0b7ceaeacc058a6ab",
                date_and_time: "2024-04-10T18:07:44.594Z",
                description: "I workout",
                details: {
                    eating: [Object],
                    sleep: [Object],
                    study: [Object],
                    workout: [Object],
                },
                title: "Test Workout",
                user_id: "660e3ac5b3779188b2d2dacc",
            },
        };

        apiUtil.post.mockResolvedValue({ data: mockResponseData });

        const result = await addHabit(newHabit);

        expect(apiUtil.post).toHaveBeenCalledWith("/habits/add", {
            habit: newHabit,
        });
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            "habit",
            JSON.stringify(mockResponseData)
        );
        expect(updatePointswithChange).toHaveBeenCalledWith(
            newHabit.category_name,
            expect.any(Object)
        );
        expect(result).toEqual(mockResponseData);
    });
});

describe("calculatePoints", () => {
    // low intensity, short test
    it("calculates points and coins correctly for low intensity and short duration", () => {
        const newHabit = {
            category_name: "Exercising",
            details: {
                workout: {
                    workout_duration: 10,
                    workout_intensity: "Low",
                },
            },
        };

        const { points, coins } = calculatePoints(newHabit);
        expect(points).toBe(10); // 5 points per 5 minutes
        expect(coins).toBe(3); // Default coins
    });

    // medium intensity, high duration test
    it("adds points for medium workout duration and extra coin for medium intensity", () => {
        const newHabit = {
            category_name: "Exercising",
            details: {
                workout: {
                    workout_duration: 120,
                    workout_intensity: "Medium",
                },
            },
        };

        const { points, coins } = calculatePoints(newHabit);
        expect(points).toBe(120); // 5 points per 5 minutes
        expect(coins).toBe(5); // Default coins + 1 for medium intensity + 1 for duration over 30 minutes
    });

    // high intensity, medium duration test
    it("adds extra coins for high intensity and duration over 30 minutes", () => {
        const newHabit = {
            category_name: "Exercising",
            details: {
                workout: {
                    workout_duration: 25,
                    workout_intensity: "High",
                },
            },
        };

        const { points, coins } = calculatePoints(newHabit);
        expect(points).toBe(25); // 5 points per 5 minutes
        expect(coins).toBe(4); // Default coins + 1 for high intensity
    });

    //
});