import { getClothesPath, getEmotionPath } from "../services/AppearanceService";
import { StyleSheet, Image, View } from "react-native";
import { Colors } from "../styles";
import { body } from "../constants/resources";

const HandsomeDan = () => {

    const clothes = getClothesPath();
    const emotion = getEmotionPath();

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
        height: "115%",
        width: "115%",
        top: "2%",
        left: "-7.5%", // center horizontally
    },

});

export default HandsomeDan;
