import apiUtil from "../src/services/apiUtil.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LastActivityService from "../src/services/LastActivityService.js";
import { updatePointswithChange } from "../src/services/PointsService";

// Mocks
jest.mock("../src/services/apiUtil.js", () => ({
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
}));

jest.mock("../src/services/PointsService");

jest.mock("@react-native-async-storage/async-storage", () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    apiUtil.post.mockClear();
    AsyncStorage.setItem.mockClear();
});

describe("LastActivityService", () => {
    describe("updateLastActivity", () => {
        it("should update the last activity successfully", async () => {
            const mockData = { success: true, message: "Updated successfully" };
            const category = "Exercising";
            apiUtil.post.mockResolvedValue({ data: mockData });

            const result = await LastActivityService.updateLastActivity(category);

            expect(apiUtil.post).toHaveBeenCalledWith("/lastActivity/update", {
                category,
            });
            expect(result).toEqual(mockData);
        });

        it("should return null on API failure", async () => {
            apiUtil.post.mockRejectedValue(new Error("API Error"));
            const category = "Exercising";

            const result = await LastActivityService.updateLastActivity(category);

            expect(apiUtil.post).toHaveBeenCalledWith("/lastActivity/update", {
                category,
            });
            expect(result).toBeNull();
        });
    });
    describe("retrieveLastActivity", () => {
        it("should retrieve the last activity successfully", async () => {
            const mockData = {
                category: "Exercising",
                last_activity: "2024-04-10T18:07:44.594Z",
            };
            apiUtil.get.mockResolvedValue({ data: mockData });

            const result = await LastActivityService.retrieveLastActivity();

            expect(apiUtil.get).toHaveBeenCalledWith("/lastActivity");
            expect(result).toEqual(mockData);
        });

        it("should return null on API failure", async () => {
            apiUtil.get.mockRejectedValue(new Error("API Error"));

            const result = await LastActivityService.retrieveLastActivity();

            expect(apiUtil.get).toHaveBeenCalledWith("/lastActivity");
            expect(result).toBeNull();
        });
    });
    describe("checkAndUpdateActivity", () => {

        it("should handle the absence of last activities correctly", async () => {
            apiUtil.get.mockRejectedValue(new Error("Failed to retrieve last activities."));
            const consoleSpy = jest.spyOn(console, "error");

            await LastActivityService.checkAndUpdateActivity();

            expect(consoleSpy).toHaveBeenCalledWith("Failed to retrieve last activities.");
            expect(updatePointswithChange).not.toHaveBeenCalled();
        });

        it("should handle an error when fetching last activity times", async () => {
            apiUtil.get.mockRejectedValue(new Error("Network error"));
            const consoleSpy = jest.spyOn(console, "error");

            await LastActivityService.checkAndUpdateActivity();

            expect(consoleSpy).toHaveBeenCalledWith("Error retrieving last activity:", expect.any(Error));
        });

        // it("should set last decrement time if not previously set", async () => {
        //     apiUtil.get.mockResolvedValue({ data: { last_eating: new Date().toISOString() } });
        //     AsyncStorage.getItem.mockResolvedValue("{}");
        //     const jsonSpy = jest.spyOn(JSON, "stringify");

        //      await LastActivityService.checkAndUpdateActivity();

        //     expect(jsonSpy).toHaveBeenCalledWith(expect.any(Object));
        // });

        it("should handle AsyncStorage failures gracefully", async () => {
            apiUtil.get.mockResolvedValue({ data: { last_studying: new Date().toISOString() } });
            AsyncStorage.getItem.mockRejectedValue(new Error("AsyncStorage error"));
            const consoleSpy = jest.spyOn(console, "error");

            await LastActivityService.checkAndUpdateActivity();

            expect(consoleSpy).toHaveBeenCalledWith("Error in checking and updating activities:", expect.any(Error));
        });
    });
});
