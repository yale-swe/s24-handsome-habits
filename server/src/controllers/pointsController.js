import Points from '../db/models/pointsTable.js';

export async function createPoints(user_id) {
    try {
        const newPoints = new Points({ user_id: user_id });
        return newPoints.save();
    } catch (err) {
        console.log('Points already exists');
        return null;
    }
}