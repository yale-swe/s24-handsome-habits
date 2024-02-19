import User from "../src/db/models/user.js";
import { createUser, findUser, deleteUser, UserFromRequest } from "../src/controllers/userController.js";
import {jest} from "@jest/globals"

// Mock the required dependencies
jest.mock("../src/db/models/user.js", () => ({
  __esModule: true,
  default: jest.fn().mockImplementationOnce(() => ({
    save: jest.fn().mockResolvedValueOnce({
      _id: "123456789",
      username: "testuser",
      password: "password123"
    })
  }))
}));

jest.mock("../src/controllers/pointsController.js", () => ({
  createPoints: jest.fn(),
}));

jest.mock("../src/controllers/assetsController.js", () => ({
  createInitialAssets: jest.fn(),
}));

jest.mock("mongoose", () => ({
  connection: {
    db: {
      collection: jest.fn().mockReturnValueOnce({
        findOne: jest.fn().mockImplementationOnce((query) => {
          if (query._id === "encoded.session") {
            return Promise.resolve({ session: { user: { user: { _id: "123456789", username: "testuser" } } } });
          }
          return Promise.resolve(null);
        })
      })
    }
  }
}));


describe("userController", () => {
  describe("createUser", () => {
    // it("should create a new user", async () => {
    //   const userMock = { username: "testuser", password: "password123" };
    //   const savedUser = { _id: "123456789", ...userMock };

    //   const userInstance = new User();
    //   userInstance.save.mockResolvedValue(savedUser);

    //   const result = await createUser(userMock);

    //   expect(result).toEqual(savedUser);
    //   expect(User).toHaveBeenCalledWith(expect.objectContaining(userMock));
    // });

    it("should handle errors when creating a new user", async () => {
      const userMock = { username: "testuser", password: "password123" };
      const savedUser = { _id: "123456789", ...userMock };
      const userInstance = new User();
      userInstance.save = jest.fn().mockResolvedValue(savedUser);

      const result = await createUser(userMock);

      expect(result).toBeNull();
    });
  });

  describe("findUser", () => {
    it("should return the user if found", async () => {
      const userMock = { account_id: "123456789", username: "testuser" };
      const req = { session: { user: { user: { id: "123456789" } } } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne = jest.fn().mockResolvedValue(userMock);

      await findUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ user: userMock });
    });

    it("should return 401 if user is not authenticated", async () => {
      const req = { session: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await findUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "User not authenticated" });
    });

    it("should return 404 if user is not found", async () => {
      const req = { session: { user: { user: { id: "123456789" } } } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne = jest.fn().mockResolvedValue(null);

      await findUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors", async () => {
      const req = { session: { user: { user: { id: "123456789" } } } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = new Error("Failed to find user");
      User.findOne = jest.fn().mockRejectedValue(error);

      await findUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const username = "testuser";
      User.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      await deleteUser(username);

      expect(User.deleteOne).toHaveBeenCalledWith({ username });
    });
  });

  describe("UserFromRequest", () => {
    // it("should return the user from session if session exists", async () => {
    //   const userMock = { _id: "123456789", username: "testuser" };
    //   const req = { cookies: { "connect.sid": "session:encoded.session" } };
    //   const encodedSession = "session:encoded.session";
    //   const session = "encoded.session";
    //   const storedSession = { session: { user: { user: userMock } } };

    //   mongoose.connection.db.collection.mockReturnValue({
    //     findOne: jest.fn().mockResolvedValue(storedSession),
    //   });

    //   const result = await UserFromRequest(req);

    //   expect(result).toEqual(userMock);
    // });

    it("should return null if no session exists", async () => {
      const req = { cookies: {} };

      const result = await UserFromRequest(req);

      expect(result).toBeUndefined();
    });
  });

  // describe("UserFromSession", () => {
  //   it("should return the user from session if session exists", async () => {
  //     const userMock = { _id: "123456789", username: "testuser" };
  //     const encodedSession = "session:encoded.session";
  //     const session = "encoded.session";
  //     const storedSession = { session: { user: { user: userMock } } };

  //     mongoose.connection.db.collection.mockReturnValue({
  //       findOne: jest.fn().mockResolvedValue(storedSession),
  //     });

  //     const result = await UserFromSession(encodedSession);

  //     expect(result).toEqual(userMock);
  //   });

  //   it("should return null if no session exists", async () => {
  //     const encodedSession = "session:encoded.session";
  //     const session = "encoded.session";

  //     mongoose.connection.db.collection.mockReturnValue({
  //       findOne: jest.fn().mockResolvedValue(null),
  //     });

  //     const result = await UserFromSession(encodedSession);

  //     expect(result).toBeNull();
  //   });
  // });
});