/* eslint-disable max-lines */
/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Typography, Colors } from "../styles";
import BackButton from "../components/backButton";

const Settings = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={() => props.navigation.navigate("Home")} />
      </View>
      <View style={[styles.habitCounterBox, styles.habitLayout]}>
        <View style={[styles.habitCounterChild, styles.childPosition1]} />
        <Text style={[styles.text, styles.habitCountLabel]}>321</Text>
        <Text style={styles.totalHabitsTracked}>total habits tracked</Text>
      </View>

      <View style={[styles.settingOptions, styles.settingLayout]}>
        <View style={styles.settingLayout} />

        <View style={styles.nameEdit}>
          <Text style={[Typography.weightedHeader5, styles.text1FlexBox]}>
            Edit name
          </Text>
          <View style={[styles.name, styles.nameLayout]}>
            <View style={[styles.nameChild, styles.childPosition]} />
            <Text style={styles.winiboya}>winiboya</Text>
          </View>
        </View>

        <View style={styles.notifications}>
          <Text style={[Typography.weightedHeader5, styles.text1FlexBox]}>
            Push notifications
          </Text>
          <View style={[styles.toggle, styles.toggleLayout]}>
            <View style={[styles.toggleChild, styles.toggleLayout]} />
            <Image
              style={styles.toggleItem}
              resizeMode="cover"
              source="Ellipse 6.png"
            />
          </View>
        </View>

        <View style={[styles.goals]}>
          <Text style={[Typography.weightedHeader5, styles.text1FlexBox]}>
            My Habit Goals
          </Text>
          <Text style={[styles.forwardArrow, styles.text1FlexBox]}>{">"}</Text>
        </View>

        <View style={[styles.help]}>
          <Text style={[styles.text1, styles.text1FlexBox]}>{">"}</Text>
          <Text style={[Typography.weightedHeader5, styles.text1FlexBox]}>
            Help & Support
          </Text>
        </View>
        <View style={[styles.about, styles.helpLayout]}>
          <Text style={[Typography.weightedHeader5, styles.text1FlexBox]}>
            About Handsome Habits
          </Text>
          <Text style={[styles.text1, styles.text1FlexBox]}>{">"}</Text>
        </View>

        <View style={[styles.feedback, styles.feedbackLayout]}>
          <Image
            style={[styles.feedbackChild, styles.feedbackLayout]}
            resizeMode="cover"
            source="Rectangle 10.png"
          />
          <Text style={[styles.leaveFeedback, styles.text4FlexBox]}>
            Leave feedback!
          </Text>
        </View>

        <Image
          style={styles.separatorsIcon}
          resizeMode="cover"
          source="Separators.png"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  habitLayout: {
    height: 150,
    width: "100%",
    position: "absolute",
  },
  childPosition1: {
    borderRadius: 10,
    left: 0,
    top: 0,
  },
  habitCountLabel: {
    alignItems: "center",
    display: "flex",
    fontFamily: "OpenSans-Bold",
    fontWeight: "700",
  },
  settingLayout: {
    height: "100%",
    width: "100%",
    left: 0,
    position: "absolute",
  },
  text1FlexBox: {
    textAlign: "left",
    color: "#000",
    position: "absolute",
  },
  feedbackLayout: {
    height: 37,
    width: "100%",
    position: "absolute",
  },
  text4FlexBox: {
    textAlign: "center",
    color: "#fff",
    position: "absolute",
  },
  toggleLayout: {
    width: 65,
    height: 27,
    top: 0,
    position: "absolute",
  },
  nameLayout: {
    width: 87,
    height: 32,
    position: "absolute",
  },
  childPosition: {
    borderRadius: 5,
    left: 0,
    top: 0,
  },
  habitCounterChild: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    height: 130,
    width: 295,
    position: "absolute",
  },
  text: {
    top: 5,
    left: 85,
    fontSize: 63,
    width: 109,
    height: 92,
    textAlign: "right",
    color: "#000",
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  totalHabitsTracked: {
    top: 82,
    left: 49,
    fontSize: 20,
    width: 181,
    height: 29,
    fontFamily: "OpenSans-Regular",
    alignItems: "center",
    display: "flex",
    textAlign: "right",
    color: "#000",
    position: "absolute",
  },
  habitCounterBox: {
    top: 158,
    left: 65,
  },
  text1: {
    left: 300,
    fontSize: 21,
    fontFamily: "PasseroOne-Regular",
    top: 0,
  },
  forwardArrow: {
    // textAlign: "right",
    flexDirection: "row",
    justifyContent: "flex-end",
    left: 300,
    fontFamily: "PasseroOne-Regular",
    fontWeight: "700",
    fontSize: 21,
    color: "#000",
  },
  help: {
    top: 223,
    left: 34,
  },
  feedbackChild: {
    borderRadius: 10,
    left: 0,
    top: 0,
  },
  leaveFeedback: {
    top: 11,
    left: 52,
    justifyContent: "center",
    width: 157,
    height: 16,
    fontSize: 16,
    alignItems: "center",
    display: "flex",
    fontFamily: "OpenSans-Bold",
    fontWeight: "700",
  },
  feedback: {
    top: 471,
    left: 73,
  },
  goals: {
    top: 166,
    left: 34,
  },
  about: {
    top: 283,
    left: 34,
  },
  toggleChild: {
    borderRadius: 20,
    backgroundColor: "#0d3a4f",
    left: 0,
    width: 65,
  },
  toggleItem: {
    top: 3,
    left: 40,
    width: 21,
    height: 21,
    position: "absolute",
  },
  toggle: {
    left: 257,
  },
  notifications: {
    top: 118,
    height: 27,
    left: 34,
    position: "absolute",
  },
  nameChild: {
    backgroundColor: "#efe9d9",
    width: 87,
    height: 32,
    position: "absolute",
  },
  winiboya: {
    top: 6,
    left: 14,
    width: "auto",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    alignItems: "center",
    display: "flex",
    textAlign: "right",
    color: "#000",
    position: "absolute",
  },
  name: {
    left: 235,
    top: 0,
  },
  nameEdit: {
    top: 44,
    height: 32,
    width: 322,
    left: 34,
    position: "absolute",
  },
  separatorsIcon: {
    top: 86,
    left: 30,
    width: 334,
    height: 240,
    position: "absolute",
  },
  settingOptions: {
    top: 340,
    width: "100%",
    position: "absolute",
    backgroundColor: "#fff",
  },
  text4: {
    left: 7,
    fontSize: 25,
    fontFamily: "PassionOne-Regular",
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Colors.yellow,
    alignItems: "center",
    paddingTop: 65,
  },
});

export default Settings;
