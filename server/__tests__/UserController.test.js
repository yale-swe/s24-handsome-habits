import User from "../src/db/models/user.js";
import { createUser, findUser, deleteUser } from "../src/controllers/userController.js";
import Points from "../src/db/models/points.js";
import Assets from "../src/db/models/assets.js";
import { jest } from "@jest/globals";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

jest.mock("../src/db/models/user.js");
Points.prototype.save = jest.fn().mockResolvedValue(true);
Assets.prototype.save = jest.fn().mockResolvedValue(true);

// Mock the necessary modules
jest.mock("mongoose", () => {
  const originalModule = jest.requireActual("mongoose");
  return {
    __esModule: true,
    ...originalModule,
    connection: {
      db: {
        collection: jest.fn()
      }
    }
  };
});

jest.mock("../src/db/models/user", () => ({
  findOne: jest.fn()
}));

describe("User Controller", () => {
  describe("createUser", () => {
    beforeEach(() => {
      console.log = jest.fn(); // Mocking console.log to prevent it from logging in tests
    });

    it("should successfully create a new user", async () => {
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        username: "testUser",
        email: "test@example.com"
      };
      User.prototype.save = jest.fn().mockResolvedValue(mockUser);

      const user = await createUser(mockUser);

      expect(user).toEqual(mockUser);
    });

    it("should return null and log an error when user creation fails", async () => {
      const mockUser = {
        username: "testUser",
        email: "test@example.com"
      };
      User.prototype.save = jest.fn().mockRejectedValue(new Error("MongoDB Error"));

      const user = await createUser(mockUser);

      expect(user).toBeNull();
      expect(console.log.mock.calls.some(call => call[0].includes("Error creating user:"))).toBe(true);
      expect(console.log.mock.calls.some(call => call[0].includes("User already exists"))).toBe(true);
    });
  });

  describe("findUser", () => {
    const req = {
      session: {
        user: {
          user: {
            id: new mongoose.Types.ObjectId()
          }
        }
      }
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    it("should find a user and return user data", async () => {
      const foundUser = { username: "foundUser", email: "found@example.com" };
      User.findOne = jest.fn().mockResolvedValue(foundUser);

      await findUser(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({ user: foundUser });
    });

    it("should return a 404 if the user is not found", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      await findUser(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return an unauthorized status if the user is not logged in", async () => {
      const req = { session: {} }; // no user in session

      await findUser(req, res);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
      expect(res.json).toHaveBeenCalledWith({ message: "User not authenticated" });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and return true", async () => {
      User.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const result = await deleteUser("testUser");
      expect(result.deletedCount).toBe(1);
    });

    it("should return false if no user was deleted", async () => {
      User.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });
      const result = await deleteUser("nonExistentUser");
      expect(result.deletedCount).toBe(0);
    });
  });
});
