import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text, Image } from "react-native";
import { Typography, Colors } from "../styles";
import BackButton from "../components/backButton";
import { getTotalHabits } from "../services/habitService";

// eslint-disable-next-line
const Settings = (props) => {

  const [totalHabits, setTotalHabits] = useState("-");

  useFocusEffect(
    useCallback(() => {
      const fetchHabits = async () => {
        const total = await getTotalHabits();
        setTotalHabits(total);
      };

      fetchHabits();
    }, [])
  );

  return (
    <View style={styles.container}>
        <View style={styles.upperBox}>
            <View style={styles.backButtonContainer}>
                <BackButton onPress={() => props.navigation.navigate("Home")} />
            </View>
            <View style={styles.trackedHabitcontainer}>
                <Text style={Typography.trackedHabit}>{totalHabits}</Text>
                <Text style={Typography.trackedHabitText}> total habits tracked</Text>
            </View>
        </View>
        <View style={styles.lowerBox}>
            <Text style={Typography.header3}> Page under construction..</Text>
                <Image
                source={require("../assets/images/under_construction.png")}
                style={styles.construction}
                >
            </Image>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Typography.defaultFont,
    backgroundColor: "white",
  },
  backButtonContainer: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  upperBox: {
    paddingTop: 65,
    width: "auto",
    minHeight: 330,
    borderRadius: 10,
    zIndex: 1,
    backgroundColor: Colors.Colors.yellow,
    alignItems: "center",
  },
  lowerBox: {
    flex: 1,
    width: "auto",
    backgroundColor:"white",
    borderRadius: 10,
    padding: 35,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    zIndex: 0,
  },
  trackedHabitcontainer: {
    width: 295,
    height: 130.13,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.Colors.lightBeige,
    padding: 18,
  },
  construction: {
    margin: 15,
    width: 255,
    height: 230,
  },
});

export default Settings;
