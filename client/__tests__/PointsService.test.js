import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePoints, getPointInfo, updatePointswithChange, categoryPointName, getQualityPoints } from "../src/services/PointsService.js"
import Api from "../src/services/apiUtil.js"

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mocking Api and logout functions
jest.mock("../src/services/apiUtil", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("Points Service", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
    AsyncStorage.removeItem.mockClear();
    Api.post.mockClear();
    Api.get.mockClear();
  });

  it("returns category point name", () => {
    // check each option for proper return
    const eating = categoryPointName("eating");
    expect(eating).toBe("eating_points");

    const studying = categoryPointName("studying");
    expect(studying).toBe("studying_points");

    const exercising = categoryPointName("exercising");
    expect(exercising).toBe("exercise_points");

    const sleeping = categoryPointName("sleeping");
    expect(sleeping).toBe("sleeping_points");

    // if nothing is provided, should return coins
    const coins = categoryPointName();
    expect(coins).toBe("coins");

    // if non-string is provided, should still return coins
    const nonstring = categoryPointName();
    expect(nonstring).toBe("coins");
  });

  it("calculates quality points", () => {
    // test arbitrary point values
    let wellness_result = getQualityPoints({exercise_points: 10, sleeping_points: 10, studying_points: 10, eating_points: 9});
    expect(wellness_result.wellness_points).toBe(39);
    expect(wellness_result.emotion_value).toBe(1);

    // test that if wellness points are all zero wellness and emotion are also 0
    wellness_result = getQualityPoints({exercise_points: 0, sleeping_points: 0, studying_points: 0, eating_points: 0});
    expect(wellness_result.wellness_points).toBe(0);
    expect(wellness_result.emotion_value).toBe(0);

    // make sure that if wellness is 100, emotion is rounded down to ensure emotion range 0-2
    wellness_result = getQualityPoints({exercise_points: 25, sleeping_points: 25, studying_points: 25, eating_points: 25});
    expect(wellness_result.wellness_points).toBe(100);
    expect(wellness_result.emotion_value).toBe(2);
  });
  it("updates points", async () => {
    const mockResponse = {
      data: {
        points: {
          coins: 5,
          exercise_points: 5,
          eating_points: 5,
          sleeping_points: 5,
          studying_points: 5,
        },
      },
    };

    Api.post.mockResolvedValue(mockResponse);

    const testInput = {
      coins: 5,
      exercise_points: 5,
      eating_points: 5,
      sleeping_points: 5,
      studying_points: 5,
    };

    // Call the updatePoints function
    await updatePoints(testInput);

    // Verify that the api was called with the same points, because values were within bounds
    expect(Api.post).toHaveBeenCalledWith("/points/update", {points: testInput});
    // Verify AsyncStorage.setItem is called with updated points
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("points", JSON.stringify(testInput));
  });
  it("updates points minimizes too-large points", async () => {
    // mock for api
    const mockResponse = {
      data: {
        points: {
          coins: 30,
          exercise_points: 26,
          eating_points: 25,
          sleeping_points: 27,
          studying_points: 22,
        },
      },
    };

    // mock api
    Api.post.mockResolvedValue(mockResponse);

    // input to the test
    const testInput = {
      coins: 30,
      exercise_points: 30,
      eating_points: 30,
      sleeping_points: 30,
      studying_points: 30,
    };

    // expected output
    const testOutput = {
      coins: 30,
      exercise_points: 26,
      eating_points: 25,
      sleeping_points: 27,
      studying_points: 22,
    };

    // Call the updatePoints function
    await updatePoints(testInput);

    // Verify that the api was called with the max points, because values were out of bounds
    expect(Api.post).toHaveBeenCalledWith("/points/update", {points: testOutput});
    // Verify AsyncStorage.setItem is called with updated points
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("points", JSON.stringify(testOutput));
  });
  it("updates points from change", async () => {
    const changeInput = {
      coins: 5,
      exercise_points: 5,
      eating_points: 5,
      sleeping_points: 5,
      studying_points: 5,
    }

    // mock async storage
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(changeInput));

    // expected output
    const changeOutput = {
      coins: 10,
      exercise_points: 10,
      eating_points: 5,
      sleeping_points: 5,
      studying_points: 5,
    };

    // Call the updatePointswithChange function
    await updatePointswithChange("exercising", {points: 5, coins: 5});

    // Verify Api.post is called with updated points
    expect(Api.post).toHaveBeenCalledWith("/points/update", {points: changeOutput});
  });
  it("finds user points", async () => {
    const mockResponse = {
      data: {
        points: {
          coins: 30,
          exercise_points: 26,
          eating_points: 25,
          sleeping_points: 27,
          studying_points: 22,
        },
      },
    };

    // expected output
    const findOutput = {
      coins: 30,
      exercise_points: 26,
      eating_points: 25,
      sleeping_points: 27,
      studying_points: 22,
      wellness_points: 100,
      emotion_value: 2,
    };

    // mock api and async
    Api.get.mockResolvedValue(mockResponse);
    AsyncStorage.setItem.mockResolvedValue(mockResponse);

    await getPointInfo();

    // make sure the api get was called
    expect(Api.get).toHaveBeenCalledWith("/points");

    // make sure the quality values were calculated and proper points returned
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("points", JSON.stringify(findOutput));
  });
});
