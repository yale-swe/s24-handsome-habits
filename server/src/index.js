import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import router from './routes/apiRouter.js';
import passportConfig from './controllers/authentication/strategies/passport-config.js';
import 'dotenv/config';
import Category from './db/models/category.js'

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
            // if we don't have 4 categories, initialize the base categories in the database
            if (db.category.countDocuments() < 4) {
                initializeBaseCategories();
            }
        }
    ).catch((err) => { console.log(err); });
}

async function initializeBaseCategories() {
    // Initialize the base categories if they don't exist
    // query the database for each category
    // if that category doesn't exist, create it
    const eating = await Category.findOne({
        category_name: "eating",
    });
    if (!eating) {
        const newEating = new Category("eating");
        newEating.save();
    }

    const sleeping = await Category.findOne({
        category_name: "sleeping",
    });
    if (!sleeping) {
        const newSleeping = new Category("sleeping");
        newSleeping.save();
    }

    const exercising = await Category.findOne({
        category_name: "exercising",
    });
    if (!exercising) {
        const newExercising = new Category("exercising");
        newExercising.save();
    }

    const studying = await Category.findOne({
        category_name: "studying",
    });
    if (!studying) {
        const newStudying = new Category("studying");
        newStudying.save();
    }
}

connectToDatabase();