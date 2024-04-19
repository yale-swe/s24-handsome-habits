import { getPointInfo } from "./PointsService";
import { getEmotion } from "./AppearanceService";

export const expressions = {

    Eating: [
        "Where can a dog find some good kibble around here?",
        "Did you hear that? I think my tummy just rumbled.",
        "It's been a ruff day... I could use a treat.",
        "I could go for a bone right about now...",
        "I'm peckish and parched!",
        "Feed me... please...",
    ],
    Sleeping: [
        "I'm dog tired today.",
        "I could use a nap right about now...",
        "Oh, what I'd do to nap in my dog house right now!",
        "I could really go for a cat-nap... or a dog-nap!",
        "I wish I could lay down for a bit...",
        "Was that a yawn just now?",
        "Oh boy, I'm exhausted...",
    ],
    Studying: [
        "I'm trying to expand my vocab beyond \"woof\" and \"bark.\"",
        "I wish I could learn something new today...",
        "My last report card didn't look so good...",
        "Wanna have a study sesh at my dog house?",
        "I saw the neatest book the other day!",
        "I'm feeling awfully studious today.",
        "Want to study together?",
    ],
    Exercising: [
        "I'm feeling a bit restless today...",
        "If we went swimming, I could teach you to doggy-paddle.",
        "I've got the zoomies! I would love to go run around!",
        "I would love the chance to stretch my paws!",
        "I could go for some belly rubs right now...",
        "Can we go to the park?",
        "Can we go for a walk?",
    ],
    Happy: [
        "Barking contest! Whoever barks louder wins!",
        "Woof! What a beautiful day it is!",
        "I'm feeling mighty handsome today.",
        "I'm having a dog-gone good day!",
        "I'm loving my cool threads!",
        "You deserve a round of a-paws!",
        "Does this shirt give me rizz?",
        "I want a new outfit!",
        "How's it going!",
        "Boola boola!",
    ]
}

/**
 * Gets a random expression based on emotion/lowest habit.
 * @returns {String} - The expression.
 */
export async function getExpression() {
    const points_values = await getEmotion();
    const emotion = points_values.wellness_points;
    if (emotion > 60) {
        const randomIndex = Math.floor(Math.random() * expressions["Happy"].length);
        const expression = expressions["Happy"][randomIndex];
        return expression;
    }
    else {
        const lowestHabit = await getLowestHabit();
        console.log(lowestHabit);
        const randomIndex = Math.floor(Math.random() * expressions[lowestHabit].length);
        const expression = expressions[lowestHabit][randomIndex];
        return expression;
    }

}

/**
 * Gets the lowest habit by percentage.
 * @returns {JSON} - The lowest habit.
 */
export async function getLowestHabit() {

    const userPoints = await getPointInfo();
    const eating = userPoints.eating_points / 25;
    const sleeping = userPoints.sleeping_points / 27;
    const studying = userPoints.studying_points / 22;
    const exercising = userPoints.exercise_points / 26;

    const lowest = Math.min(eating, sleeping, studying, exercising);

    if (lowest === eating) {
        return "Eating";
    } else if (lowest === sleeping) {
        return "Sleeping";
    } else if (lowest === studying) {
        return "Studying";
    } else {
        return "Exercising";
    }
}
