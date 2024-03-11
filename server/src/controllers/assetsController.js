import Assets from '../db/models/assets.js';

export async function createInitialAssets(user_id) {
    try {
        const newAssets = new Assets({ user_id: user_id });
        return newAssets.save();
    } catch (err) {
        console.log('Assets already exists');
        return null;
    }
}