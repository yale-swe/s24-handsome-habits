import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import {} from 'dotenv/config';

const port = process.env.PORT || 8000;
const db_uri = process.env.DB_URI;

const app = express();
app.use(cors());
app.use(express.json());

async function connectToDatabase() {
    await mongoose.connect(db_uri).then(
        () => {
            console.log("Connected to database");
            console.log(`Server is running on port: ${port}`);

            // only listen to requests after we are connected to the database
            app.listen(port);
        }
    ).catch((err) => { console.log(err) });
}

connectToDatabase();