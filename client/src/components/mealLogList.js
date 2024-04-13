import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import LogItem from "./LogItem.js";
import { deleteHabit} from "../services/habitService.js";
import { Typography, Colors } from "../styles";

const MealLogList = ({ meals }) => {

    const [mealList, setMeals] = useState(meals);

    useEffect(() => {
        setMeals(meals);
    }, [meals]);

    const handleDelete = async (id) => {
        const success = await deleteHabit(id);
        if (success) {
          const updatedMeals = mealList.filter(meal => meal._id !== id);
          setMeals(updatedMeals);
        }
      };

    const isHealthy = (meal) => {
        if (meal.details.eating.healthy_meal) {
            return ["healthy", meal.details.eating.eating_tag];
        }
        else {
            return [meal.details.eating.eating_tag];
        }
    };

  return (
    <View style={{width: "auto", flex: 1}}>
      <ScrollView >
          <View style={{padding: 20}}>
            {mealList && mealList.length > 0 ? (
              mealList.map((meal, index) => (
                <View key={meal._id} style={{ marginBottom: index === mealList.length - 1 ? 0 : 20 }}>
                  <LogItem
                    title={meal.title}
                    duration={null}
                    time={meal.date_and_time}
                    tags={isHealthy(meal)}
                    onDelete={() => handleDelete(meal._id)}
                    duration_unit={null}
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
export default MealLogList;
