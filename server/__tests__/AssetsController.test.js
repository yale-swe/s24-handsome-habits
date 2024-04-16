import { jest } from "@jest/globals";
import mongoose from "mongoose";
import Assets from "../src/db/models/assets";
import { createInitialAssets, getAssets, updateAssets, addAsset, setActiveAssets } from "../src/controllers/assetsController";

const userObjectId = new mongoose.Types.ObjectId();

const expectedDefaultAssets = {
    _id: expect.any(mongoose.Types.ObjectId),
    user_id: userObjectId,
    owned: {
        tops: ["yale_tshirt.jpg"],
        bottoms: [],
        accessories: []
    },
    active: {
        tops: "yale_tshirt.jpg",
    }
};

let saveSpy, findSpy, updateSpy;
beforeAll(() => {
    const createdAssets = {
        _id: expect.any(mongoose.Types.ObjectId),
        user_id: userObjectId,
        owned: {
            tops: ["yale_tshirt.jpg"],
            bottoms: [],
            accessories: []
        },
        active: {
            tops: "yale_tshirt.jpg",
        }
    };

    const updatedAssets = {
        _id: expect.any(mongoose.Types.ObjectId),
        user_id: userObjectId,
        owned: {
            tops: ["morse_tshirt.jpg", "yale_tshirt.jpg"],
            bottoms: ["morse_pants.jpg"],
            accessories: []
        },
        active: {
            tops: "morse_tshirt.jpg",
            bottoms: "morse_pants.jpg",
        }
    };

    /* Mock the required dependencies */

    // Save is called twice. The first time it should return the created points
    // The second time it should throw an error for testing purposes
    saveSpy = jest.spyOn(Assets.prototype, "save")
        .mockImplementationOnce(() => (expectedDefaultAssets))
        .mockImplementationOnce(() => {
            throw new Error("Mocked existing points error")
        });

    findSpy = jest.spyOn(Assets, "findOne")
        //  args is a json of the arguments passed into the function
        .mockImplementation((args) => {
            if (args.user_id == userObjectId) {
                return Promise.resolve(createdAssets);
            }
            return Promise.resolve(null);
        });

    updateSpy = jest.spyOn(Assets, "findOneAndUpdate").mockImplementation(() => (updatedAssets));
});

beforeEach(() => {
    console.log = jest.fn();
})

describe("Assets Controller", () => {

    describe("createInitialAssets", () => {
        afterEach(() => {
            expect(saveSpy).toHaveBeenCalledTimes(1);
            saveSpy.mockClear();
        });

        test("should create a new assets object", async() => {
            const newAssets = await createInitialAssets(userObjectId);
            expect(newAssets.user_id).toEqual(userObjectId);
            expect(newAssets).toEqual(expectedDefaultAssets);
            expect(newAssets).toHaveProperty("owned");
            expect(newAssets).toHaveProperty("active");
        });

        test("should return null if assets already exists or error occurs", async() => {
            const newAssets = await createInitialAssets(userObjectId);
            expect(newAssets).toBeNull();
            expect(console.log).toHaveBeenCalledWith("Error creating initial assets object");
        });
    })

    describe("getAssets", () => {
        afterEach(() => {
            expect(findSpy).toHaveBeenCalledTimes(1);
            findSpy.mockClear();
        });

        test("should return the assets object", async() => {
            const referenceAssets = {
                _id: expect.any(mongoose.Types.ObjectId),
                user_id: userObjectId,
                owned: {
                    tops: ["yale_tshirt.jpg"],
                    bottoms: [],
                    accessories: []
                },
                active: {
                    tops: "yale_tshirt.jpg"
                }
            };

            const createdAssets = await getAssets(userObjectId);
            expect(createdAssets).toEqual(referenceAssets);
        });

        test("should return null if assets does not exist for User", async() => {
            const wrongUserId = new mongoose.Types.ObjectId();
            const createdAssets = await getAssets(wrongUserId);
            expect(createdAssets).toBeNull();
            expect(console.log).not.toHaveBeenCalledWith("Error getting assets");
        });


        test("should return null if there is an error finding the assets", async() => {
            // Mock the findOne function to throw an error for testing purposes
            findSpy = jest.spyOn(Assets, "findOne")
                .mockImplementationOnce(() => {
                    throw new Error("Mocked find assets error");
                });

            const createdAssets = await getAssets(userObjectId);
            expect(createdAssets).toBeNull();
            expect(console.log).toHaveBeenCalledWith("Error getting assets");
        });
    });

    describe("updateAssets", () => {

        afterEach(() => {
            expect(updateSpy).toHaveBeenCalledTimes(1);
            updateSpy.mockClear();
        });

        test("should update the assets object", async() => {

            const referenceAssets = {
                _id: expect.any(mongoose.Types.ObjectId),
                user_id: userObjectId,
                owned: {
                    tops: ["morse_tshirt.jpg", "yale_tshirt.jpg"],
                    bottoms: ["morse_pants.jpg"],
                    accessories: []
                },
                active: {
                    tops: "morse_tshirt.jpg",
                    bottoms: "morse_pants.jpg",
                }
            };

            // check that old assets aren't the same as the assets to be updated to
            const oldAssets = await getAssets(userObjectId);
            expect(oldAssets).not.toBeNull();
            expect(oldAssets).not.toEqual(referenceAssets);

            // check that the user's assets have been updated
            const updatedAssets = await updateAssets(userObjectId, referenceAssets);
            expect(updatedAssets.user_id).toEqual(referenceAssets.user_id);
            expect(updatedAssets).toEqual(referenceAssets);
        });

        // The mocked version of findAndUpdateOne throws an error on second call for testing purposes
        test("should return null if there is an error updating the assets", async() => {
            updateSpy = jest.spyOn(Assets, "findOneAndUpdate")
                .mockImplementationOnce(() => {
                    throw new Error("Mocked update assets error");
                });
            const updatedAssets = await updateAssets(userObjectId, expectedDefaultAssets);
            expect(updatedAssets).toBeNull();
            expect(console.log).toHaveBeenCalledWith("Error updating assets");
        });
    });

    describe("addAsset", () => {
        const expectedUpdatedAssets = expectedDefaultAssets;
        expectedUpdatedAssets.owned.tops.push("dport_tshirt.jpg");

        afterEach(() => {
            updateSpy.mockClear();
        });

        test("should add an asset to the user's owned assets", async() => {

            // Mock findAndUpdateOne to return the updated assets
            updateSpy = jest.spyOn(Assets, "findOneAndUpdate").mockImplementation(() => {
                const newAssets = expectedDefaultAssets;
                newAssets.owned.tops.push("dport_tshirt.jpg");
                return newAssets;
            });

            const createdAssets = await getAssets(userObjectId);
            expect(createdAssets).not.toBeNull();
            expect(createdAssets.owned).not.toContain("dport_tshirt.jpg");

            const updatedAssets = await addAsset(userObjectId, "tops", "dport_tshirt.jpg");
            expect(updatedAssets).not.toBeNull();
            // Assert that dport_tshirt.jpg has been added to the user's owned tops
            expect(updatedAssets).toEqual(expectedUpdatedAssets);
            expect(updateSpy).toHaveBeenCalledTimes(1);
        });


        test("should return null if there is an error adding the asset", async() => {
            // Mock findAndUpdateOne to throw an error for testing purposes
            Assets.findOneAndUpdate.mockRejectedValue(new Error("Mocked update assets error"));

            const updatedAssets = await addAsset(userObjectId, "tops", "dport_tshirt.jpg");
            expect(updatedAssets).toBeNull();
            expect(console.log).toHaveBeenCalledWith("Error updating assets");
        });
    });


    describe("Set Active Assets", () => {
        // The expected assets after updating the active assets
        const expectedUpdatedAssets = expectedDefaultAssets;
        expectedUpdatedAssets.owned.tops.push("dport_tshirt.jpg");
        expectedUpdatedAssets.active.tops = "dport_tshirt.jpg";

        afterEach(() => {
            updateSpy.mockClear();
        });

        test("should set the active assets for the user", async() => {
            // Mock findAndUpdateOne to return the updated assets
            updateSpy = jest.spyOn(Assets, "findOneAndUpdate").mockImplementation(() => {
                const newAssets = expectedDefaultAssets;
                newAssets.owned.tops.push("dport_tshirt.jpg");
                return newAssets;
            });

            let userAssets = await getAssets(userObjectId);
            expect(userAssets).not.toBeNull();
            expect(userAssets.active).not.toContain("dport_tshirt.jpg");

            // add the assets to the user's assets
            userAssets = await addAsset(userObjectId, "tops", "dport_tshirt.jpg");
            expect(userAssets).not.toBeNull();
            // set the user's active assets to be the asset
            userAssets = await setActiveAssets(userObjectId, { tops: "dport_tshirt.jpg" });
            expect(userAssets).not.toBeNull();
            expect(userAssets).toEqual(expectedUpdatedAssets);
            expect(updateSpy).toHaveBeenCalledTimes(2); // 1 for addAsset, 1 for setActiveAssets
        });

        test("should return null if there is an error setting the active assets", async() => {
            // Mock findAndUpdateOne to throw an error for testing purposes
            Assets.findOneAndUpdate.mockRejectedValue(new Error("Mocked update assets error"));

            const updatedAssets = await setActiveAssets(userObjectId, { tops: "dport_tshirt.jpg" });
            expect(updatedAssets).toBeNull();
            expect(console.log).toHaveBeenCalledWith("Error updating assets");
        });
    });
})