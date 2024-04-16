import { getPointInfo } from "./PointsService";
import { emotions, tops, bottoms, accessories } from "../constants/resources";
import { getAssets } from "./AssetsService";

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
export async function getClothesPath() {

    const clothes = await getClothes();
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
export async function getClothes() {

    const assets = await getAssets();
    console.log(assets.active);

    return {
        // set top to stored value, otherwise default
        top: (assets?.active?.tops && Object.prototype.hasOwnProperty.call(tops, assets.active.tops)) ? assets.active.tops : "white_tshirt",
        bottom: (assets?.active?.bottoms && Object.prototype.hasOwnProperty.call(bottoms, assets.active.bottoms)) ? assets.active.bottoms : "medium_jeans",
        accessories: (assets?.active?.accessories && Object.prototype.hasOwnProperty.call(accessories, assets.active.accessories)) ? assets.active.accessories : null,
};

}
