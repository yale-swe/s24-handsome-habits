import { jest } from "@jest/globals";
import LastActivity from "../src/db/models/LastActivity.js";
import {
    updateLastActivity,
    retrieveLastActivity,
} from "../src/controllers/lastActivityController";
import mongoose from "mongoose";


// console has to be mocked
beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
    jest.spyOn(LastActivity, "findOne").mockResolvedValue(null); // Default to null unless specified in a test
    jest.spyOn(LastActivity, "findOneAndUpdate").mockResolvedValue(null); // Default to null unless specified
    jest.spyOn(LastActivity.prototype, "save").mockResolvedValue(null); // Default to null unless specified
});

describe("updateLastActivity", () => {
    it("should update the last activity date for a given category", async () => {
        const mockUserId = "123abc";
        const category = "Exercising";
        const mockDate = new Date();
        LastActivity.findOneAndUpdate.mockResolvedValue({
            _id: mockUserId,
            [`last_${category}`]: mockDate,
        });

        const result = await updateLastActivity(mockUserId, category);

        expect(LastActivity.findOneAndUpdate).toHaveBeenCalledWith(
            { user_id: mockUserId },
            { $set: { [`last_${category}`]: expect.any(Date) } },
            { new: true, upsert: true }
        );
        expect(result).toHaveProperty(`last_${category}`, mockDate);
    });

    it("should return null if update fails", async () => {
        const mockUserId = "1234567890abcdef";
        const category = "exercising";
        LastActivity.findOneAndUpdate.mockResolvedValue(null);

        const result = await updateLastActivity(mockUserId, category);

        expect(result).toBeNull();
    });
});

describe("retrieveLastActivity", () => {
    it("should retrieve last activity data for a user", async () => {
        const mockUserId = "1234567890abcdef";
        const mockLastActivity = {
            user_id: mockUserId,
            last_exercising: new Date(),
        };

        LastActivity.findOne.mockResolvedValue(mockLastActivity);

        const result = await retrieveLastActivity(mockUserId);

        expect(LastActivity.findOne).toHaveBeenCalledWith({
            user_id: mockUserId,
        });
        expect(result).toEqual(mockLastActivity);
    });


    it("should create and return a new last activity if none exists", async () => {
        const mockUserId = new mongoose.Types.ObjectId();

        await retrieveLastActivity(mockUserId.toString());

        expect(LastActivity.prototype.save).toHaveBeenCalledTimes(1);
    });

    it("should return null if there is an error retrieving last activity", async () => {
        const mockUserId = new mongoose.Types.ObjectId();

        // Simulate an error when trying to find an activity
        jest.spyOn(LastActivity, "findOne").mockRejectedValue(new Error("Database error"));

        // Execute the function with the mocked error condition
        const result = await retrieveLastActivity(mockUserId.toString());

        // Assert that the result is null due to the error
        expect(result).toBeNull();

        // Assert that findOne was called with the correct user ID
        expect(LastActivity.findOne).toHaveBeenCalledWith({ user_id: mockUserId.toString() });

        // Assert that console.error was called with the expected error message
        expect(console.error).toHaveBeenCalledWith(
            "Error retrieving last activity:",
            expect.any(Error)
        );
    });



});
