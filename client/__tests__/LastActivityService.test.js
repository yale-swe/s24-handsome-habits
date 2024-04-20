import apiUtil from "../src/services/apiUtil.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    updateLastActivity,
    retrieveLastActivity,
} from "../src/services/LastActivityService.js";

// Mocks
jest.mock("../src/services/apiUtil.js", () => ({
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
    setItem: jest.fn(),
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

            const result = await updateLastActivity(category);

            expect(apiUtil.post).toHaveBeenCalledWith("/lastActivity/update", {
                category,
            });
            expect(result).toEqual(mockData);
        });

        it("should return null on API failure", async () => {
            apiUtil.post.mockRejectedValue(new Error("API Error"));
            const category = "Exercising";

            const result = await updateLastActivity(category);

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

            const result = await retrieveLastActivity();

            expect(apiUtil.get).toHaveBeenCalledWith("/lastActivity");
            expect(result).toEqual(mockData);
        });

        it("should return null on API failure", async () => {
            apiUtil.get.mockRejectedValue(new Error("API Error"));

            const result = await retrieveLastActivity();

            expect(apiUtil.get).toHaveBeenCalledWith("/lastActivity");
            expect(result).toBeNull();
        });
    });
});
