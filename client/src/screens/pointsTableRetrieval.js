import User from '../db/models/user.js';
import PointsTable from '../db/models/pointstable.js';
import { StatusCodes } from 'http-status-codes';

export async function createPointsTable(pointsTable) {
    try {
        const newPointsTable = new PointsTable(pointsTable);
        return newPointsTable.save();
    } catch (err) {
        console.log('User already has a points table');
        return null;
    }
}

export async function findPointsTable(req, res) {
    console.log("Finding points table");
    try {
        const pointsTable = await PointsTable.findOne({
            user_id: req.session.user.user.id,
        });

        if (!pointsTable) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Points table not found" });
        } else {
            res.status(StatusCodes.OK).json({ pointsTable: pointsTable });
        }
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
}

export async function deletePointsTable(user_id) {
    return PointsTable.deleteOne({ user_id: user_id });
}