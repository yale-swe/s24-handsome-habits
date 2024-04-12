import { jest } from "@jest/globals";
import mongoose from "mongoose";
import Assets from "../src/db/models/assets";
import { createInitialAssets, getAssets, updateAssets } from "../src/controllers/assetsController";

const userObjectId = new mongoose.Types.ObjectId();

const defaultAssets = {
    _id: expect.any(mongoose.Types.ObjectId),
    user_id: userObjectId,
    clothes: [],
    objects: [],
    backgrounds: [],
};

let saveSpy, findSpy, updateSpy;
beforeAll(() => {

    const savedAssets = {
        _id: expect.any(mongoose.Types.ObjectId),
        user_id: userObjectId,
        clothes: ["yale_shirt.jpg"],
        objects: ["shoes.jpg"],
        backgrounds: [],
    };

    const updatedAssets = {
        _id: expect.any(mongoose.Types.ObjectId),
        user_id: userObjectId,
        clothes: ["morse_shirt.jpg"],
        objects: [],
        backgrounds: ["navy_background.jpg"],
    };

    /* Mock the required dependencies */

    // Save is called twice. The first time it should return the created points
    // The second time it should throw an error for testing purposes
    saveSpy = jest.spyOn(Assets.prototype, "save")
        .mockImplementationOnce(() => (defaultAssets))
        .mockImplementationOnce(() => {
            throw new Error("Mocked existing points error")
        });

    findSpy = jest.spyOn(Assets, "findOne")
        //  args is a json of the arguments passed into the function
        .mockImplementation((args) => {
            if (args.user_id == userObjectId) {
                return Promise.resolve(savedAssets);
            }
            return Promise.resolve(null);
        });

    updateSpy = jest.spyOn(Assets, "findOneAndUpdate")
        .mockImplementationOnce(() => (updatedAssets))
        .mockImplementationOnce(() => {
            throw new Error("Mocked update assets error")
        });
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
            expect(newAssets).toEqual(defaultAssets);
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
                clothes: ["yale_shirt.jpg"],
                objects: ["shoes.jpg"],
                backgrounds: [],
            };

            const savedAssets = await getAssets(userObjectId);
            expect(savedAssets).toEqual(referenceAssets);
        });

        test("should return null if assets does not exist for User", async() => {
            const wrongUserId = new mongoose.Types.ObjectId();
            const savedAssets = await getAssets(wrongUserId);
            expect(savedAssets).toBeNull();
            expect(console.log).not.toHaveBeenCalledWith("Error getting assets");
        });


        test("should return null if there is an error finding the assets", async() => {
            // Mock the findOne function to throw an error for testing purposes
            findSpy = jest.spyOn(Assets, "findOne")
                .mockImplementationOnce(() => {
                    throw new Error("Mocked find assets error");
                });

            const savedAssets = await getAssets(userObjectId);
            expect(savedAssets).toBeNull();
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
                clothes: ["morse_shirt.jpg"],
                objects: [],
                backgrounds: ["navy_background.jpg"],
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
            const updatedAssets = await updateAssets(userObjectId, defaultAssets);
            expect(updatedAssets).toBeNull();
            expect(console.log).toHaveBeenCalledWith("Error updating assets");
        });
    });
})