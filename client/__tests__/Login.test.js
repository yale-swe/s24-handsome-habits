import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Login from "../src/screens/login";

/// Mock WebView
jest.mock("react-native-webview", () => ({
  WebView: jest.fn().mockImplementation(({ source }) => (
    // eslint-disable-next-line
    <div testID="mockedWebView">{source.uri}</div>
  ))
}));

// Mock other dependencies
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn().mockResolvedValue(null),
  getItem: jest.fn().mockResolvedValue(JSON.stringify({ "connect.sid": "dummy_cookie" })),
}));

jest.mock("@react-native-cookies/cookies", () => ({
  get: jest.fn().mockResolvedValue({ "connect.sid": "dummy_cookie" }),
}));

describe("Login Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    expect(getByText("Welcome to")).toBeTruthy();
    expect(getByText("Handsome Habits")).toBeTruthy();
    expect(getByText("Sign in with Yale CAS")).toBeTruthy();
  });

  it("renders the CAS WebView with correct props on button press", () => {
    const { getByText, getByTestId } = render(<Login navigation={{ navigate: jest.fn() }} />);

    // Trigger the function to show WebView
    const casLoginButton = getByText("Sign in with Yale CAS");
    fireEvent.press(casLoginButton);

    // Check if WebView is rendered
    const webView = getByTestId("mockedWebView");
    expect(webView).toBeTruthy();

    // Check the props of WebView, specifically the URI
    expect(webView.props.children).toBe("http://localhost:8000/auth/cas/login");
  });
});
