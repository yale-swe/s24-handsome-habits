import { getQualityPoints, getPointInfo } from "./PointsService";
import { emotions, tops, bottoms, accessories } from "../constants/resources";

/**
 * Returns the path to the image of the user's current emotion.
 * @returns {Any} The path to the image of the user's current emotion.
 */
export function getEmotionPath() {

    const emotion = getEmotion();

    if (emotion < 33.3) {
        return emotions["sad_face"];
    }
    else if (emotion < 66.6) {
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
    const emotion_value = getQualityPoints(userPoints).wellness_points;
    return emotion_value;

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
