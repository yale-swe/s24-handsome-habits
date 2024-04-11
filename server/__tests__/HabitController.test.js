import { addHabit, retrieveHabitsByCategory, deleteHabit } from "../src/controllers/habitController.js";
import Habit from "../src/db/models/habit.js";
import Category from "../src/db/models/category.js";
import { jest } from "@jest/globals";
import mongoose from "mongoose";

let findOneCategorySpy, saveHabitSpy;

// console has to be mocked
beforeEach(() => {
    console.log = jest.fn();
});

describe("addHabit", () => {

    const categoryId = new mongoose.Types.ObjectId();

    const categoryInfo = {
        _id: categoryId,
        category_name: "Workout",
    };

    const habitInfo = {
        title: "Morning Run",
        category_name: "Workout",
        description: "30 minutes run in the park",
        date_and_time: new Date(),
        details: {
            workout: {
                workout_tag: "Running",
                workout_duration: 30,
                workout_intensity: "Medium",
            },
        },
        user_id: new mongoose.Types.ObjectId(),
        category: categoryId,
    };

    // mock the required dependencies
    beforeAll(() => {
        findOneCategorySpy = jest
            .spyOn(Category, "findOne")
            .mockResolvedValue(categoryInfo);

        saveHabitSpy = jest
            .spyOn(Habit.prototype, "save")
            .mockResolvedValue(habitInfo);
    });

    it("should successfully add a new habit", async () => {
        const newHabit = {
            title: "Morning Run",
            category_name: "Workout",
            description: "30 minutes run in the park",
            date_and_time: new Date(),
            details: {
                workout: {
                    workout_tag: "Running",
                    workout_duration: 30,
                    workout_intensity: "Medium",
                },
            },
        };
        const userId = new mongoose.Types.ObjectId();

        const createdHabit = await addHabit(userId, newHabit);

        expect(findOneCategorySpy).toHaveBeenCalledWith({
            category_name: newHabit.category_name,
        });
        expect(saveHabitSpy).toHaveBeenCalled();
        expect(createdHabit).not.toBeNull();
        expect(createdHabit.user_id).toEqual(userId);
        expect(createdHabit.category).toEqual(categoryInfo._id);
    });

    it("should return null following error on save", async () => {
        saveHabitSpy.mockImplementationOnce(() => {
            throw new Error("Failed to save habit");
        });

        const newHabit = {
            title: "Evening Yoga",
            category_name: "Workout",
            description: "1 hour yoga session",
            date_and_time: new Date(),
            details: {
                workout: {
                    workout_tag: "Yoga",
                    workout_duration: 60,
                    workout_intensity: "Low",
                },
            },
        };
        const userId = new mongoose.Types.ObjectId();

        const createdHabit = await addHabit(userId, newHabit);

        expect(createdHabit).toBeNull();
        expect(console.log.mock.calls[0][0]).toEqual(
            expect.stringContaining("Unable to add habit:")
        );
    });
});

describe("retrieveHabitsByCategory", () => {
    const userId = new mongoose.Types.ObjectId();
    const categoryId = new mongoose.Types.ObjectId();

    const habitsData = [{
        title: "Night Read",
        description: "Reading before sleep",
        date_and_time: new Date(),
        details: {
            study: {
                study_duration: 60,
                study_productivity: "High"
            }
        },
        user_id: userId,
        category: categoryId
    }];

    beforeAll(() => {
        jest.spyOn(Category, "findOne").mockResolvedValue({ _id: categoryId, category_name: "Studying" });
        jest.spyOn(Habit, "find").mockResolvedValue(habitsData);
    });

    it("successfully retrieves habits", async () => {
        const categoryName = "Studying";
        const habits = await retrieveHabitsByCategory(userId, categoryName);

        expect(Category.findOne).toHaveBeenCalledWith({ category_name: categoryName });
        expect(Habit.find).toHaveBeenCalledWith({ user_id: userId, category: categoryId });
        expect(habits).toEqual(habitsData);
    });

    it("returns an empty array when no habits are found", async () => {
        Habit.find.mockResolvedValueOnce([]);
        const categoryName = "Studying";

        const habits = await retrieveHabitsByCategory(userId, categoryName);
        expect(habits).toEqual([]);
    });

    it("throws an error when the category is not found", async () => {
        Category.findOne.mockResolvedValueOnce(null);
        const categoryName = "Nonexistent Category";

        await expect(retrieveHabitsByCategory(userId, categoryName)).rejects.toThrow(`Category ${categoryName} not found`);
    });
});

describe("deleteHabit", () => {
    const habitId = new mongoose.Types.ObjectId();

    beforeAll(() => {
        jest.spyOn(Habit, "deleteOne").mockImplementation(({ _id }) => {
            return Promise.resolve({ deletedCount: _id.equals(habitId) ? 1 : 0 });
        });
    });

    it("successfully deletes a habit", async () => {
        const result = await deleteHabit(habitId);
        expect(Habit.deleteOne).toHaveBeenCalledWith({ _id: habitId });
        expect(result).toBe(true);
    });

    it("returns false when the habit does not exist", async () => {
        const nonExistentHabitId = new mongoose.Types.ObjectId();
        const result = await deleteHabit(nonExistentHabitId);

        expect(result).toBe(false);
    });

    it("handles exceptions during deletion and returns false", async () => {
        const habitId = new mongoose.Types.ObjectId();
        const error = new Error("Database failure");

        // Mock the deletion to simulate a failure that would cause an error
        Habit.deleteOne.mockRejectedValueOnce(error);

        // Execute the deleteHabit function and expect it to return false due to the error
        const result = await deleteHabit(habitId);
        expect(result).toBe(false);
    });
});
