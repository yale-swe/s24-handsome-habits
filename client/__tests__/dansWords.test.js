import React from "react";
import { render } from "@testing-library/react-native";
import DansWords from "../src/components/dansWords.js";

describe("Dan's Words component", () => {

  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<DansWords danMessage={"Woof! I'm being used in illegal experiments!"}/>);

    // test that the main container is rendering
    expect(getByTestId("dans-words-testing")).toBeTruthy();
    // test that the provided text is being rendered
    expect(getByText("Woof! I'm being used in illegal experiments!")).toBeTruthy();
  });
});
