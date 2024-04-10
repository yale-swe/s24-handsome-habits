import { addHabit } from "../src/controllers/habitController.js";
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
