import {
    addHabit,
    calculatePoints,
    retrieveHabitsByCategory,
    deleteHabit,
} from "../src/services/habitService"; // Adjust the import path accordingly
import apiUtil from "../src/services/apiUtil.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePointswithChange } from "../src/services/PointsService";
import { logout } from "../src/services/authenticationUtil";

// Mocks
jest.mock("../src/services/apiUtil.js", () => ({
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
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

    describe("Exercising", () => {

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
            expect(coins).toBe(9); // Default coins
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
            expect(coins).toBe(15); // Default coins + 1 for medium intensity + 1 for duration over 30 minutes
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
            expect(coins).toBe(12); // Default coins + 1 for high intensity
        });
    });

    describe("Eating", () => {
        it("calculates points and coins correctly for a healthy meal", () => {
            const newHabit = {
                category_name: "Eating",
                details: {
                    eating: {
                        eating_tag: "Meal",
                        healthy_meal: true,
                    },
                },
            };

            const { points, coins } = calculatePoints(newHabit);
            expect(points).toBe(9); // Default points for eating
            expect(coins).toBe(21); // Default coins + additional for healthy meal
        });

        it("calculates points and coins for an unhealthy snack", () => {
            const newHabit = {
                category_name: "Eating",
                details: {
                    eating: {
                        eating_tag: "Snack",
                        healthy_meal: false,
                    },
                },
            };

            const { points, coins } = calculatePoints(newHabit);
            expect(points).toBe(9); // Default points
            expect(coins).toBe(6); // Lower coins for unhealthy snack
        });
    });

    describe("Studying", () => {
        it("adds points for short study sessions and standard coins", () => {
            const newHabit = {
                category_name: "Studying",
                details: {
                    study: {
                        study_duration: 25,
                        study_productivity: "Medium",
                    },
                },
            };

            const { points, coins } = calculatePoints(newHabit);
            expect(points).toBe(0); // 4 points per 30 minutes, no points for less than 30
            expect(coins).toBe(12); // Default coins + bonus for medium productivity
        });

        it("adds points and coins for long and highly productive study sessions", () => {
            const newHabit = {
                category_name: "Studying",
                details: {
                    study: {
                        study_duration: 65,
                        study_productivity: "High",
                    },
                },
            };

            const { points, coins } = calculatePoints(newHabit);
            expect(points).toBe(8); // 4 points per 30 minutes
            expect(coins).toBe(21); // Default coins + bonuses for duration over 30 and 60 minutes and high productivity
        });
    });

    describe("Sleeping", () => {
        it("calculates points and coins for a full night's sleep", () => {
            const newHabit = {
                category_name: "Sleeping",
                details: {
                    sleep: {
                        sleep_duration: 8, // 8 hours
                    },
                },
            };

            const { points, coins } = calculatePoints(newHabit);
            expect(points).toBe(32); // 4 points per hour
            expect(coins).toBe(24); // 3 coins per hour
        });

        it("calculates points and coins for a nap", () => {
            const newHabit = {
                category_name: "Sleeping",
                details: {
                    sleep: {
                        sleep_duration: 0.5, // 0.5 hours
                        is_nap: true,
                    },
                },
            };

            const { points, coins } = calculatePoints(newHabit);
            expect(points).toBe(0); // No points for less than 1 hour
            expect(coins).toBe(6); // Nap-specific coin value
        });
    });

    //
});

describe("retrieveHabitsByCategory", () => {
    beforeEach(() => {
        apiUtil.get.mockClear();
    });

    it("retrieves habits successfully for a given category", async () => {
        const mockHabits = [
            { id: "1", title: "Sleep Early", category_name: "Sleeping" },
            { id: "2", title: "Read a book", category_name: "Sleeping" },
        ];
        apiUtil.get.mockResolvedValue({
            status: 200,
            data: { habits: mockHabits },
        });

        const result = await retrieveHabitsByCategory("Sleeping");
        expect(apiUtil.get).toHaveBeenCalledWith("/habits/Sleeping");
        expect(result).toEqual(mockHabits);
    });

    it("returns null when no habits found", async () => {
        apiUtil.get.mockResolvedValue({ status: 200, data: {} });
        const result = await retrieveHabitsByCategory("Exercising");
        expect(result).toBeNull();
    });

    it("returns empty array when category does not exist", async () => {
        apiUtil.get.mockRejectedValue({ response: { status: 404 } });
        const result = await retrieveHabitsByCategory("Nonexistent");
        expect(result).toEqual([]);
    });

    it("logs out the user on unauthorized", async () => {
        apiUtil.get.mockRejectedValue({ response: { status: 401 } });
        await retrieveHabitsByCategory("Sleeping");
        expect(logout).toHaveBeenCalled();
    });
});

describe("deleteHabit", () => {
    beforeEach(() => {
        apiUtil.delete.mockClear();
    });

    it("deletes a habit successfully", async () => {
        apiUtil.delete.mockResolvedValue({ status: 200 });
        const result = await deleteHabit("1");
        expect(apiUtil.delete).toHaveBeenCalledWith("/habits/1");
        expect(result).toBe(true);
    });

    it("returns false when deletion fails", async () => {
        apiUtil.delete.mockResolvedValue({ status: 400, data: "Error" });
        const result = await deleteHabit("2");
        expect(result).toBe(false);
    });

    it("handles exception when server is unreachable", async () => {
        apiUtil.delete.mockRejectedValue(new Error("Server is unreachable"));
        const result = await deleteHabit("3");
        expect(result).toBe(false);
    });

    it("logs out the user on unauthorized access", async () => {
        apiUtil.delete.mockRejectedValue({ response: { status: 401 } });
        await deleteHabit("4");
        expect(logout).toHaveBeenCalled();
    });
});
