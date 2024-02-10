import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

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