import { jest } from "@jest/globals";
import mongoose from "mongoose";
import LastActivity from "../src/db/models/lastActivity";
import {
    updateLastActivity,
    retrieveLastActivity,
} from "../src/controllers/lastActivityController";

// jest.mock("../src/db/models/lastActivity", () => ({
//     findOneAndUpdate: jest.fn().mockReturnThis(),
//     findOne: jest.fn().mockReturnThis(),
//     exec: jest.fn(),
// }));

// console has to be mocked
beforeEach(() => {
    console.log = jest.fn();
    jest.spyOn(LastActivity, "findOne").mockResolvedValue(null); // Default to null unless specified in a test
    jest.spyOn(LastActivity, "findOneAndUpdate").mockResolvedValue(null); // Default to null unless specified
});

describe("updateLastActivity", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
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

    it("should return null if no last activity found", async () => {
        const mockUserId = "1234567890abcdef";
        LastActivity.findOne.mockResolvedValue(null);

        const result = await retrieveLastActivity(mockUserId);

        expect(result).toBeNull();
    });
});
