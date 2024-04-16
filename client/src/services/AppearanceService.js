import { getQualityPoints, getPointInfo } from "./PointsService";
import { emotions, tops, bottoms, accessories } from "../constants/resources";
import { getAssets } from "./AssetsService";

/**
 * Returns the path to the image of the user's current emotion.
 * @returns {Any} The path to the image of the user's current emotion.
 */
export async function getEmotionPath() {

    const emotion = await getEmotion();

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
        top: (assets?.active?.tops && tops.Object.prototype.hasOwnProperty.call(assets.active.tops)) ? assets.active.tops : "white_tshirt",
        bottom: (assets?.active?.bottoms && bottoms.Object.prototype.hasOwnProperty.call(assets.active.bottoms)) ? assets.active.bottoms : "medium_jeans",
        accessories: (assets?.active?.accessories && accessories.Object.prototype.hasOwnProperty.call(assets.active.accessories)) ? assets.active.accessories : null,
};

}
