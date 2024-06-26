import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import LogItem from "./LogItem.js";
import { deleteHabit} from "../services/habitService.js";
import { Typography, Colors } from "../styles";

const WorkoutLogList = ({ workouts }) => {

    const [workoutList, setWorkouts] = useState(workouts);

    useEffect(() => {
        setWorkouts(workouts);
    }, [workouts]);

    const handleDelete = async (id) => {
        const success = await deleteHabit(id);
        if (success) {
          const updatedWorkouts = workoutList.filter(workout => workout._id !== id);
          setWorkouts(updatedWorkouts);
        }
      };

  return (
    <View style={{width: "auto", flex: 1}}>
      <ScrollView >
          <View style={{padding: 20}}>
            {workoutList && workoutList.length > 0 ? (
              workoutList.map((workout, index) => (
                <View key={workout._id} style={{ marginBottom: index === workoutList.length - 1 ? 0 : 20 }}>
                  <LogItem
                    title={workout.title}
                    duration={workout.details.workout.workout_duration}
                    time={workout.date_and_time}
                    tags={[workout.details.workout.workout_tag, workout.details.workout.workout_intensity]}
                    onDelete={() => handleDelete(workout._id)}
                    duration_unit={"minutes"}
                    />
                  </View>
              ))
            ) : (
              <View style={styles.empty_container}>
              <Text style={Typography.header5}>Your log is currently empty, my good pal! Get to it!</Text>
              </View>
              )}
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  empty_container: {
    height: 90,
    width: 330,
    backgroundColor: Colors.Colors.lightBeige,
    borderRadius: 10,
    padding: 23,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 1,
  },
})
export default WorkoutLogList;
