import { getClothesPath, getEmotionPath } from "../services/AppearanceService";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Image, View, TouchableWithoutFeedback, Text } from "react-native";
import { Colors, Typography } from "../styles";
import { body } from "../constants/resources";
import React, { useEffect, useState } from "react";

const HandsomeDan = () => {

    const [clothes, setClothes] = useState({});
    const [emotion, setEmotion] = useState(null);
    const [showBubble, setShowBubble] = useState(false);

    async function fetchData() {
        const clothesPath = await getClothesPath();
        const emotionPath = await getEmotionPath();
        setClothes(clothesPath);
        setEmotion(emotionPath);
    }

    useEffect(() => {
        // Asynchronously fetch clothes and emotion paths
        fetchData();
    }, []);

    useFocusEffect(
        // Fetch user's points and coins when the component mounts after a navigation action
        React.useCallback(() => {
          fetchData();
        }, [])
      );

    const handlePress = () => {
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 2000); // Bubble disappears after 2 seconds
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback style={styles.imageContainer} onPress={handlePress}>
            <View style={styles.imageContainer}>
                <Image source={body} style={styles.image} />
                <Image source={emotion} style={styles.image} />
                <Image source={clothes.top} style={styles.image} />
                <Image source={clothes.bottom} style={styles.image} />
                {clothes.accessories && <Image source={clothes.accessories} style={styles.image} />}
                {showBubble && (
                    <View style={styles.bubble}>
                        <Text style={Typography.defaultFont}>Woof!</Text>
                    </View>
                )}
            </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        height: 400,
        width: 258,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50,
        backgroundColor: Colors.Colors.aliceBlue,
        borderRadius: 20,

    },

    imageContainer : {
        height: 344,
        width: 258,
        position: "relative"
    },
    image: {
        position: "absolute",
        height: "120%",
        width: "120%",
        top: 0,
        left: "-10%", // center horizontally
    },
    bubble: {
        position: "absolute",
        top: 10, // Lower and further to the left
        left: "70%", // Moving it to the left from the center
        transform: [{ translateX: -50 }],
        backgroundColor: "white",
        borderRadius: 30,
        padding: 8,
        width: 100, // Increased width
        height: 50, // Increased height
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
    }

});

export default HandsomeDan;
