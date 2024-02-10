import User from '../db/models/user.js';
import { createUser } from '../db/db_operations.js';
import { connectToDatabase } from '../index.js';


// Create a new user and test that the user is in the db
export async function testCreateUser() {
    // await connectToDatabase();
    const test_user_info = new User({
        username: 'testuser',
        password: 'testpassword',
        email: 'testemail@gmail.com'
    });

    const test_user = createUser(test_user_info);
    test_user.then((result) => {
            console.log('Test user created');
            console.log(result);
        })
        .catch((err) => {
            // Duplicate username error
            if (err.name === 'MongoServerError' && err.code === 11000) {
                console.log('Test user already exists');
                console.log(JSON.stringify(err, null, 2));
            } else {
                console.log('Test user not created');
                console.log(err);
            }
        });
}

// testCreateUser();