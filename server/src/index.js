import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import router from './routes/apiRouter.js';
import passportConfig from './controllers/authentication/strategies/passport-config.js';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
passportConfig(app);

app.use('/auth', authRouter);
app.use('/api', router);

export async function connectToDatabase() {
    const port = process.env.PORT || 8000;
    const db_uri = process.env.DB_URI;
    console.log('Connecting to databasee');
    await mongoose.connect(db_uri).then(
        () => {
            console.log('Database connected');
            // only listen to requests after we are connected to the database
            app.listen(port);

        }
    ).catch((err) => { console.log(err); });
}

connectToDatabase();