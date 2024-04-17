import { getClothesPath, getEmotionPath } from "../services/AppearanceService";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Image, View } from "react-native";
import { Colors } from "../styles";
import { body } from "../constants/resources";
import React, { useEffect, useState } from "react";

const HandsomeDan = () => {

    const [clothes, setClothes] = useState({});
    const [emotion, setEmotion] = useState(null);

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

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={body} style={styles.image} />
                <Image source={emotion} style={styles.image} />
                <Image source={clothes.top} style={styles.image} />
                <Image source={clothes.bottom} style={styles.image} />
                {clothes.accessories && <Image source={clothes.accessories} style={styles.image} />}
            </View>
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

});

export default HandsomeDan;
