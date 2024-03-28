import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import Login from "../src/screens/login.js";
import * as Google from "expo-auth-session/providers/google";

// Mocking Google Authentication and logout function
jest.mock("expo-auth-session/providers/google", () => ({
  useAuthRequest: jest.fn().mockReturnValue([
    {}, // mock request
    Promise.resolve({ type: "success" }), // mock response
    jest.fn(), // mock promptAsync function
  ]),
}));

jest.mock("react-native-webview", () => ({
  WebView: () => "WebView",
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn().mockResolvedValue(null),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn().mockResolvedValue(null),
  clear: jest.fn().mockResolvedValue(null),
}));

jest.mock("../src/services/authenticationUtil.js", () => ({
  Authentication: jest.fn().mockResolvedValue(true),
  CASLogout:  jest.fn().mockResolvedValue(true),
}));

jest.mock("../src/services/userService", () => ({
  findUser: jest.fn().mockRejectedValue(new Error("User not found")),
}));

jest.mock("../src/services/userService", () => ({
  findUser: jest.fn().mockRejectedValue(new Error("User not found")),
}));

jest.mock("@react-native-cookies/cookies", () => ({
  get: jest.fn(),
  set: jest.fn(),
  clearAll: jest.fn(),
  clearByName: jest.fn(),
}));

describe("Login Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    expect(getByText("Welcome to")).toBeTruthy();
    expect(getByText("Handsome Habits")).toBeTruthy();
    expect(getByText("Sign in with Google")).toBeTruthy();
    expect(getByText("Sign in with Yale CAS")).toBeTruthy();
  });

  it("calls Google sign-in on button press", async () => {
    const promptAsyncMock = jest.fn();
    Google.useAuthRequest.mockImplementation(() => ([{}, {}, promptAsyncMock]));

    const { getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    const googleSignInButton = getByText("Sign in with Google");

    fireEvent.press(googleSignInButton);
    await waitFor(() => {
      expect(promptAsyncMock).toHaveBeenCalled();
    });
  });

});
