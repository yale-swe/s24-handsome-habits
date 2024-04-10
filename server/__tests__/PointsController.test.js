import Points from "../src/db/models/points.js";
import { createPoints, findPoints, updatePoints, deletePoints } from "../src/controllers/pointsController.js";
import { jest } from "@jest/globals";
import mongoose from "mongoose";


// These are the default points and coins for a new user
const defaultPoints = {
    _id: expect.any(mongoose.Types.ObjectId),
    user_id: expect.any(mongoose.Types.ObjectId),
    coins: 10,
    exercise_points: 26,
    eating_points: 25,
    sleeping_points: 27,
    studying_points: 22,
};
const userObjectId = new mongoose.Types.ObjectId();

let findOneSpy, deleteOneSpy, updateOneSpy, saveSpy;
beforeAll(() => {
    const pointsObjectId = new mongoose.Types.ObjectId();

    const userPointsinfo = {
        _id: pointsObjectId,
        user_id: userObjectId,
    }

    const createdPoints = {
        ...userPointsinfo,
        coins: 10,
        exercise_points: 26,
        eating_points: 25,
        sleeping_points: 27,
        studying_points: 22,
    }

    const updatedPoints = {
        ...userPointsinfo,
        coins: 12,
        exercise_points: 10,
        eating_points: 10,
        sleeping_points: 20,
        studying_points: 22,
    };

    /* Mock the required dependencies */

    // Save is called twice. The first time it should return the created points
    // The second time it should throw an error for testing purposes
    saveSpy = jest.spyOn(Points.prototype, "save")
        .mockImplementationOnce(() => (createdPoints))
        .mockImplementationOnce(() => {
            throw new Error("Mocked existing points error")
        });

    // findOne is called more than twice.
    // Error mocking is handling in the test checking for the error
    findOneSpy = jest.spyOn(Points, "findOne")
        //  args is a json of the arguments passed into the function
        .mockImplementation((args) => {
            if (args.user_id == userObjectId) {
                return Promise.resolve(createdPoints);
            }
            return Promise.resolve(null);
        });

    // findOneAndUpdate is called twice. The first time it should return the updated points
    // The second time it should throw an error for testing purposes
    updateOneSpy = jest.spyOn(Points, "findOneAndUpdate")
        .mockImplementationOnce(() => (updatedPoints))
        .mockImplementationOnce(() => { throw new Error("Mocked findOne and Update Error") });

    // return null. Potentially, update later
    deleteOneSpy = jest.spyOn(Points, "deleteOne")
        .mockImplementationOnce(() => (null))
        .mockImplementationOnce(() => { throw new Error("Mocked deleteOne Error") });
});

beforeEach(() => {
    console.log = jest.fn();
});


// Test the createPoints function for when it works and when it doesn't
describe("createPoints", () => {
    let count = 0;
    afterEach(() => {
        count++;
        expect(saveSpy).toHaveBeenCalledTimes(count);
    });

    test("should create a new points object", async() => {
        const newPoints = await createPoints(userObjectId);
        expect(newPoints.user_id).toEqual(userObjectId);
        expect(newPoints).toEqual(defaultPoints);
    });

    // save is an async function, and this could fail/throw an error for a variety of reasons (Eg. network error, etc.)
    // mocking the result in case an error is thrown from Model.save()
    test("should return null following error on save", async() => {
        const newPoints = await createPoints(userObjectId);
        expect(newPoints).toBeNull();
        expect(console.log).toHaveBeenCalledWith("Points already exists");
    });
});


// Test the findPoints function for when it works and when it doesn't
describe("findPoints", () => {
    afterEach(() => {
        expect(findOneSpy).toHaveBeenCalled();
    });

    test("should find and return the points object", async() => {
        const newPoints = await findPoints(userObjectId);
        expect(newPoints).toEqual(defaultPoints);
        // ensure the function was called with the correct user_id
        expect(newPoints.user_id).toEqual(userObjectId);
    });

    test("should return null if the user object has no points saved", async() => {
        let wrongUserId = new mongoose.Types.ObjectId();
        // the user_id's shouldn't match
        expect(wrongUserId).not.toEqual(userObjectId);
        // wrongUserId shouldn't have any points saved
        const newPoints = await findPoints(wrongUserId);
        expect(newPoints).toBeNull();
        expect(console.log).toHaveBeenCalledWith("User's points not found");
    });

    test("should return null if there is an error finding the points", async() => {
        // Mock the findOne function to throw an error for testing purposes
        findOneSpy = jest.spyOn(Points, "findOne")
            .mockImplementationOnce(() => {
                throw new Error("Mocked find points error");
            });
        const newPoints = await findPoints(userObjectId);
        expect(newPoints).toBeNull();
        // ensure that the findOne function was called in findPoints
        expect(findOneSpy).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith("Error finding points");
    });
});


describe("updatePoints", () => {
    let count = 0;
    afterEach(() => {
        count++;
        expect(updateOneSpy).toHaveBeenCalledTimes(count);
    });

    test("should update the points object for the user", async() => {
        const updatedPoints = {
            _id: expect.any(mongoose.Types.ObjectId),
            user_id: userObjectId,
            coins: 12,
            exercise_points: 10,
            eating_points: 10,
            sleeping_points: 20,
            studying_points: 22,
        };

        // Find points and verify that the points are unchanged yet
        let points = await findPoints(userObjectId);
        expect(points).not.toBeNull();
        expect(points).not.toEqual(updatedPoints);

        const newPoints = await updatePoints(userObjectId, updatedPoints);
        // ensure the function was called with the correct user_id and newPoints
        expect(newPoints.user_id).toEqual(userObjectId);
        expect(newPoints._id).toEqual(points._id);
        // ensure the points were updated
        expect(newPoints).toEqual(updatedPoints);
    });

    // The mocked version of findAndUpdateOne throws an error on second call for testing purposes
    test("should return null if there's an error updating the points", async() => {
        const newPoints = await updatePoints(new mongoose.Types.ObjectId(), defaultPoints);
        expect(newPoints).toBeNull();
        expect(console.log).toHaveBeenCalledWith("Points not found");
    });
});


describe("deletePoints", () => {
    let count = 0;
    afterEach(() => {
        count++;
        expect(deleteOneSpy).toHaveBeenCalledTimes(count);
    });

    test("should delete the points object", async() => {
        let points = await findPoints(userObjectId);
        expect(points).not.toBeNull();
        const deletedPoints = await deletePoints(userObjectId);
        expect(deletedPoints).toBeNull();
    });

    // The mocked version of deleteOne throws an error on second call for testing purposes
    test("should return null if there's an error deleting the points", async() => {
        const newPoints = await deletePoints(new mongoose.Types.ObjectId());
        expect(newPoints).toBeNull();
        expect(console.log).toHaveBeenCalledWith("Error deleting points");
    });
});