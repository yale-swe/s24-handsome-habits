import session from "express-session";
import cors from "cors";
import passport from "passport";
import MongoDBStoreSession from "connect-mongodb-session";
import yaleCAS from "./yale-cas.js";
import strategies from "./strategies.js";

// MongoDB session store to manage session data
const MongoDBStore = MongoDBStoreSession(session);

// Configure Passport strategies
strategies(passport);

/**
 * Configures the Express application with necessary middlewares and Passport strategies.
 *
 * @param {Express.Application} app - The Express application instance to configure.
 * @description
 * This function sets up various middlewares including session management with MongoDB,
 * CORS for handling cross-origin requests, and Passport for authentication.
 * It initializes and configures Passport with defined strategies and sets session and
 * CORS configurations based on the environment (production or development).
 *
 * @example
 * Usage in the main server file
 * import express from 'express';
 * import passport_config from './path/to/passport-config.js';
 * const app = express();
 * passport_config(app);
 */
export default function (app) {
  // Changes isProduction var after cloud hosting
  let isProduction = false;
  const sessionStore = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: "sessions",
  });

  // Session configuration
  const sessionConfig = {
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: isProduction ? process.env.SESSION_SECURE : false, // secure cookie based on environment
    },
  };

  // CORS configuration
  const corsOptions = {
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  };

  app.use(session(sessionConfig));
  app.use(cors(corsOptions));

  // Set up Passport strategies
  yaleCAS(passport);

  app.use(passport.initialize());
  app.use(passport.session());
}
