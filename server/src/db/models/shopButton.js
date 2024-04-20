import mongoose from "mongoose";

/*
 *
 * @description
 * Represents a shopButton
 *
 *
 * @typedef {Object} shopButton
 * @property {String} type - the type of the shop button (e.g. "shop", "coin", "shopCoin")
 * @property {Number} count - the number of counts/presses on this button type
 */
const shopButtonSchema = new mongoose.Schema({
    //mongoose creates automatically a unique _id for each row
    type: { type: String, unique: true },
    timesPressed: { type: Number, default: 1 },
    timesShown: { type: Number, default: 1 },
    expectation: { type: Number, default: 100 },
});

const ShopButton = mongoose.model("ShopButton", shopButtonSchema);

export default ShopButton;