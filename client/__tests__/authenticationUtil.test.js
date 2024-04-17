import Authentication, { logout } from "../src/services/authenticationUtil.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthApi } from "../src/services/apiUtil.js";
import { dummyLogin } from "../src/services/authenticationUtil.js";

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

// Mock AuthApi
jest.mock("../src/services/apiUtil.js", () => ({
    AuthApi: {
        post: jest.fn(),
    },
}));

describe("Authentication and logout", () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        AsyncStorage.getItem.mockClear();
        AsyncStorage.setItem.mockClear();
        AsyncStorage.removeItem.mockClear();
        AuthApi.post.mockClear();
    });

    it("logout removes user data from storage", async () => {
        await logout();

        expect(AsyncStorage.clear).toHaveBeenCalled();
    });

    // Simple test for login
    it("handles successful login", async () => {
        const mockResponse = {
            type: "success",
            authentication: { accessToken: "token123" },
        };

        // Mock the response from the server
        AuthApi.post.mockResolvedValue({ data: { user: "testUser" } });
        AsyncStorage.getItem.mockResolvedValue(null); // Simulate no user logged in initially

        const userData = await Authentication(mockResponse);

        expect(AuthApi.post).toHaveBeenCalledWith("/google/login", {
            token: "token123",
        });
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            "user",
            JSON.stringify({ user: "testUser" })
        );
        expect(userData).toEqual(JSON.stringify({ user: "testUser" }));
    });
});

describe("Dummy login", () => {
    it("bypasses login and stores dummy user data", async () => {
        const dummyUserData = { id: "dummy1", name: "Dummy User" };
        AuthApi.post.mockResolvedValue({ data: { user: dummyUserData } });

        // Act
        const result = await dummyLogin();

        // Assert
        expect(AsyncStorage.clear).toHaveBeenCalled();
        expect(AsyncStorage.removeItem).toHaveBeenCalledWith("cookies");
        expect(AuthApi.post).toHaveBeenCalledWith("/dummy_login");
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            "@user",
            JSON.stringify(dummyUserData)
        );
        expect(result).toEqual(dummyUserData);
    });

    it("logs an error if the dummy login fails", async () => {
        // Arrange
        const error = new Error("Failed to login");
        AuthApi.post.mockRejectedValue(error);

        // We need to mock console.error to check if it was called
        const consoleSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        // Act
        const result = await dummyLogin();

        // Assert
        expect(consoleSpy).toHaveBeenCalledWith(
            "Error logging in with dummy user",
            error
        );
        expect(result).toBeUndefined();

        // Clean up the mock
        consoleSpy.mockRestore();
    });
});
