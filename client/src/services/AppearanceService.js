import { getPointInfo } from "./PointsService";
import { emotions, tops, bottoms, accessories } from "../constants/resources";

/**
 * Returns the path to the image of the user's current emotion.
 * @returns {Any} The path to the image of the user's current emotion.
 */
export async function getEmotionPath() {

    const emotion_and_wellness = await getEmotion();
    const emotion = emotion_and_wellness.emotion;

    if (emotion == 0) {
        return emotions["sad_face"];
    }
    else if (emotion == 1) {
        return emotions["neutral_face"];
    }
    else {
        return emotions["happy_face"];
    }
}

/**
 * Returns the user's current emotion value
 * @returns {Number} The user's current emotion value.
 */
export async function getEmotion() {

    const userPoints = await getPointInfo();
    return {emotion: userPoints.emotion_value, wellness_points: userPoints.wellness_points};

}

/**
 * Returns the path to the image of the user's current clothes.
 * @returns {Any} The path to the image of the user's current clothes.
 */
export function getClothesPath() {

    const clothes = getClothes();
    const clothesPath = {
        top: tops[clothes.top],
        bottom: bottoms[clothes.bottom],
        accessories: accessories[clothes.accessories],
    };
    return clothesPath;

}

/**
 * Returns the user's current clothes.
 * @returns {JSON} The user's current clothes.
 */
export function getClothes() {

    // TODO: update once service is implemented

    return {
        top: "pierson_tshirt",
        bottom: "medium_jeans",
        accessories: "black_sunglasses",
    }

}
