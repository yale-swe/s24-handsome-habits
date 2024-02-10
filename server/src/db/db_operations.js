import User from './models/user.js';

export async function createUser(user) {
    try {
        const newUser = new User(user);
        return newUser.save();
    } catch (err) {
        console.log('User already exists');
        return null;
    }
}

export async function findUser(username) {
    return User.findOne({ username: username });
}

export async function deleteUser(username) {
    return User.deleteOne({ username: username });
}