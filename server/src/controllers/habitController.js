import Habit from '../db/models/habit.js';

export async function addExercise(user_id, newExercise) {
    try {
        // console.log('Adding exercise', newExercise);
        const userExercise = new Habit({ user_id: user_id }, newExercise, { new: true });
        await userExercise.save();
        return userExercise;
    } catch (err) {
        console.log('Cant add exercise');
        return null;
    }
}