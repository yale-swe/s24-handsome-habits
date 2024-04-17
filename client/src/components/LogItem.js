import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../styles";

const LogItem = ({ title, duration, time, tags, onDelete, duration_unit }) => {
  // Format the date and time from the backend response
  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateToCompare = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    let datePart = "";

    if (dateToCompare.getTime() === today.getTime()) {
      datePart = "Today";
    } else if (dateToCompare.getTime() === yesterday.getTime()) {
      datePart = "Yesterday";
    } else {
      datePart = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart}, ${timePart}`;
  };

  return (
    <View style={styles.logItem}>
      <View style={styles.infoContainer}>
        <View>
          <View style={styles.titleAndTagContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.tagsContainer}>
              {tags.map((tag, index) =>
                tag !== "" ? (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag.toLowerCase()}</Text>
                  </View>
                ) : null,
              )}
            </View>
          </View>
          <View>
            {duration != null ? (
              <Text
                style={styles.details}
              >{`${duration} ${duration_unit} | ${formatDateAndTime(time)}`}</Text>
            ) : (
              <Text style={styles.details}>{formatDateAndTime(time)}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
          testID="deleteButton"
        >
          <Icon name="trash-can-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logItem: {
    height: 68,
    width: 332,
    backgroundColor: Colors.Colors.lightBeige,
    borderRadius: 10,
    padding: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  titleAndTagContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    height: 68,
    width: 327,
  },
  details: {
    color: "black",
    fontSize: 14,
    fontFamily: "OpenSans-Italic",
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tag: {
    backgroundColor: Colors.Colors.columbiaBlue,
    borderRadius: 5,
    width: "auto",
    paddingHorizontal: 3,
    alignItems: "center",
    marginLeft: 12,
    height: 16,
  },
  tagText: {
    color: "black",
    fontSize: 10,
    paddingBottom: 5,
    fontFamily: "OpenSans-Bold",
    paddingLeft: 3,
    paddingRight: 3,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingRight: 30,
  },
});

export default LogItem;
