import { getQualityPoints } from "./PointsService";
import { emotions, tops, bottoms } from "./constants/resources";


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
export function getEmotion() {

    const userPoints = getQualityPoints();
    const emotion = getQualityPoints(userPoints).emotion_value;
    return emotion;

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
        accessories: null
    };
    return clothesPath;


}

/**
 * Returns the user's current clothes.
 * @returns {JSON} The user's current clothes.
 */
export function getClothes() {

    return {
        top: "white_tshirt",
        bottom: "white_pants",
        accessories: null,
    }


}
