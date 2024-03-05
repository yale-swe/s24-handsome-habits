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
    console.log('Connecting to database');
    await mongoose.connect(db_uri).then(
        () => {
            console.log('Database connected');
            // only listen to requests after we are connected to the database
            app.listen(port);
            initializeBaseCategories();
        }
        ).catch((err) => { console.log(err); });
    }
    
async function initializeBaseCategories() {
    // if we don't have 4 categories, initialize the base categories in the database
    if (await Category.countDocuments() < 4) {
        var baseCategories = ["Eating", "Sleeping", "Exercising", "Studying"];

        for (var base_habit of baseCategories) {
            const new_category = await Category.findOne({
                category_name: base_habit,
            });
            if (!new_category) {
                const newCategory = new Category({category_name: base_habit});
                newCategory.save();
            }
        }
    }
}

connectToDatabase();