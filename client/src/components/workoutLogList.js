import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import WorkoutLogItem from "./workoutLogItem.js";
import { deleteHabit} from "../services/habitService.js";

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
    <ScrollView>
      <View style={{ padding: 20 }}>
        {workoutList.map((workout, index) => (
        <View key={workout._id} style={{ marginBottom: index === workoutList.length - 1 ? 0 : 20 }}>
          <WorkoutLogItem
            key={workout._id}
            title={workout.title}
            duration={workout.details.workout.workout_duration}
            time={workout.date_and_time}
            tags={[workout.details.workout.workout_tag, workout.details.workout.workout_intensity]} // Assuming it's an array
            onDelete={() => handleDelete(workout._id)}
          />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WorkoutLogList;