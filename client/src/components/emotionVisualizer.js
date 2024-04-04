import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import PropTypes from "prop-types"; can add back once we actually do variable emotion

const EmotionVisualizer = () => {

  const [avatarLink, setAvatarLink] = useState(require("../assets/images/bulldog.png"));

  const fetchAvatar = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      if (!userJson) {
        console.log("No user data found");
        setAvatarLink(require("../assets/images/bulldog.png"));
        return;
      }

      const stringUser = decodeURIComponent(JSON.stringify(userJson));
      const StringUserObject = JSON.parse(stringUser);
      const userObject = StringUserObject.slice(1, -1);
      const parsedUserObject = JSON.parse(userObject);
      const college = parsedUserObject.college?.toLowerCase();

      switch (college) {
        case "pierson":
          setAvatarLink(require("../assets/images/piersonbulldog.png"));
          break;
        case "davenport":
          setAvatarLink(require("../assets/images/davenportbulldog.png"));
          break;
        case "morse":
          setAvatarLink(require("../assets/images/morsebulldog.png"));
          break;
        default:
          setAvatarLink(require("../assets/images/bulldog.png"));
      }
    } catch (error) {
      console.error("Error fetching or parsing user data:", error);
      setAvatarLink(require("../assets/images/bulldog.png"));
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <View style={styles.bulldogContainer}>
      <Image
        source={avatarLink}
        style={styles.bulldog}
      />
    </View>
  );
};

// WellnessBar.propTypes = {
//     emotion: PropTypes.any,
//   }; for julian :)

const styles = StyleSheet.create({
  bulldog: {
    margin: 30,
    width: 200,
    height: 300,
  },
  bulldogContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
    borderRadius: 20,
    width: 258,
    height: 384,
    bottom: 20,
    alignItems: "center",
    paddingTop: 40,
  },
});

export default EmotionVisualizer;
