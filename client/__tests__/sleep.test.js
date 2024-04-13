import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Sleep from "../src/screens/sleep";
import { NavigationContainer } from "@react-navigation/native";

// Mock the services and navigation
jest.mock("../src/services/habitService", () => ({
  retrieveHabitsByCategory: jest.fn(() => Promise.resolve([])), // Mock the function to resolve with an empty array
}));

const createTestProps = (props) => ({
  navigation: {
    navigate: jest.fn(),
    ...props,
  },
});

describe("Sleep Screen", () => {
  let props;

  beforeEach(() => {
    props = createTestProps({});
  });

  it("renders correctly and matches snapshot", () => {
    const { toJSON } = render(
      <NavigationContainer>
        <Sleep {...props} />
      </NavigationContainer>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("navigates to the Home screen when the back button is pressed", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Sleep {...props} />
      </NavigationContainer>
    );

    fireEvent.press(getByTestId("touchableBack"));
    expect(props.navigation.navigate).toHaveBeenCalledWith("Home");
  });

  it("navigates to the SleepLog screen when \"Log your Sleep\" button is pressed", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Sleep {...props} />
      </NavigationContainer>
    );

    fireEvent.press(getByText("Log your Sleep"));
    expect(props.navigation.navigate).toHaveBeenCalledWith("SleepLog");
  });
});
