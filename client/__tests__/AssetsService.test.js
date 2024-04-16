import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAssets,
  addAsset,
  setActiveAssets,
} from "../src/services/AssetsService.js";
import Api from "../src/services/apiUtil.js";

// Mocking AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mocking Api and logout functions
jest.mock("../src/services/apiUtil", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

const defaultMockAssets = {
  owned: {
    tops: ["yale_tshirt.jpg"],
    bottoms: [],
    accessories: [],
  },
  active: {
    tops: "yale_tshirt.jpg",
  },
};

describe("Assets Service", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
    AsyncStorage.removeItem.mockClear();
    Api.post.mockClear();
    Api.get.mockClear();
  });

  describe("getAssets", () => {
    it("returns the user's assets JSON if found", async () => {
      // Mock the response from the server
      Api.get.mockResolvedValue({ data: { assets: defaultMockAssets } });
      AsyncStorage.getItem.mockResolvedValue(null); // Simulate no assets saved initially

      const assets = await getAssets();

      expect(Api.get).toHaveBeenCalledWith("/assets");
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "assets",
        JSON.stringify(defaultMockAssets),
      );
      expect(assets).toEqual(defaultMockAssets);
    });

    it("returns locally saved assets in AsyncStorage if server call fails - Internal Server Error", async () => {
      // Mock the response from the server
      Api.get.mockRejectedValue({ response: { status: 500 } });
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(defaultMockAssets)); // Simulate assets saved initially

      const assets = await getAssets();

      expect(Api.get).toHaveBeenCalledWith("/assets");
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      expect(assets).toEqual(defaultMockAssets);
    });

    it("logs out the user if server call fails - Unauthorized", async () => {
      // Mock the response from the server
      Api.get.mockRejectedValue({ response: { status: 401 } });
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(defaultMockAssets)); // Simulate assets saved initially

      const assets = await getAssets();

      expect(Api.get).toHaveBeenCalledWith("/assets");
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      expect(assets).toBeNull();
      // to signify that all locally stored assets should be cleared (i.e. logout)
      expect(AsyncStorage.clear).toHaveBeenCalled();
    });
  });

  describe("Add Asset", () => {
    it("adds an asset to the user's assets", async () => {
      const expectedUpdatedAsset = {
        owned: {
          tops: ["yale_tshirt.jpg", "morse_tshirt.jpg"],
          bottoms: [],
          accessories: [],
        },
        active: {
          tops: "yale_tshirt.jpg",
        },
      };

      // Mock the response from the server
      Api.post.mockResolvedValue({ data: { assets: expectedUpdatedAsset } });

      const updatedAssets = await addAsset("tops", "morse_tshirt.jpg");

      expect(Api.post).toHaveBeenCalledWith("/assets/add", {
        assets: { type: "tops", name: "morse_tshirt.jpg" },
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "assets",
        JSON.stringify(expectedUpdatedAsset),
      );
      expect(updatedAssets).toEqual(expectedUpdatedAsset);
    });

    it("returns locally saved assets in AsyncStorage if server call fails - Internal Server Error =", async () => {
      // Mock the response from the server
      Api.post.mockRejectedValue({ response: { status: 500 } });
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(defaultMockAssets)); // Simulate assets saved initially

      const assets = await addAsset("tops", "morse_tshirt.jpg");

      expect(Api.post).toHaveBeenCalledWith("/assets/add", {
        assets: { type: "tops", name: "morse_tshirt.jpg" },
      });
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      expect(assets).toEqual(defaultMockAssets);
    });
  });

  describe("Set Active Assets", () => {
    it("sets the active assets for the user", async () => {
      const newActiveAssets = {
        tops: "morse_tshirt.jpg",
        bottoms: "",
        accessories: "",
      };

      const expectedUpdatedAsset = {
        owned: {
          tops: ["yale_tshirt.jpg", "morse_tshirt.jpg"],
          bottoms: [],
          accessories: [],
        },
        active: {
          tops: "morse_tshirt.jpg",
          bottoms: "",
          accessories: "",
        },
      };

      // Mock the response from the server
      Api.post.mockResolvedValue({ data: { assets: expectedUpdatedAsset } });

      const updatedAssets = await setActiveAssets(newActiveAssets);

      expect(Api.post).toHaveBeenCalledWith("/assets/setActive", {
        assets: newActiveAssets,
      });

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "assets",
        JSON.stringify(expectedUpdatedAsset),
      );
      expect(updatedAssets.active).toEqual(newActiveAssets);
    });
  });
});
