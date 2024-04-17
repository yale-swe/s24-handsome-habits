import request from "supertest";
import express from "express";
import session from "express-session";
import { DummyLogin } from "../src/controllers/authentication/DummyAuthController"; // Adjust the import path

const app = express();
app.use(
    session({
        secret: "testsecret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.post("/dummy_login", DummyLogin);

describe("POST /dummy_login", () => {
    
    it("should log in a dummy user and return user data", async () => {
        const response = await request(app).post("/dummy_login").send();

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
            "message",
            "Logged in with dummy user"
        );
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toContain("dummy@example.com"); // Since user is a JSON string, check if it contains the email
    });

});
