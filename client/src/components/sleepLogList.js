import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import LogItem from "./LogItem.js";
import { deleteHabit} from "../services/habitService.js";
import { Typography, Colors } from "../styles";

const SleepLogList = ({ sleep }) => {

    const [sleepList, setSleep] = useState(sleep);

    useEffect(() => {
        setSleep(sleep);
    }, [sleep]);

    const handleDelete = async (id) => {
        const success = await deleteHabit(id);
        if (success) {
          const updatedSleep = sleepList.filter(sleeping_session => sleeping_session._id !== id);
          setSleep(updatedSleep);
        }
      };

    const isNap = (sleeping_session) => {
        if (sleeping_session.details.sleep.is_nap){
            return ["nap", sleeping_session.details.sleep.quality_of_sleep];
        }
        else{
            return [sleeping_session.details.sleep.quality_of_sleep];
        }
    };
  return (
    <View style={{width: "auto", flex: 1}}>
      <ScrollView >
          <View style={{padding: 20}}>
            {sleepList && sleepList.length > 0 ? (
              sleepList.map((sleeping_session, index) => (
                <View key={sleeping_session._id} style={{ marginBottom: index === sleepList.length - 1 ? 0 : 20 }}>
                  <LogItem
                    title={sleeping_session.title}
                    duration={sleeping_session.details.sleep.sleep_duration}
                    time={sleeping_session.date_and_time}
                    tags={isNap(sleeping_session)}
                    onDelete={() => handleDelete(sleeping_session._id)}
                    duration_unit={sleeping_session.details.sleep.sleep_duration > 1 ? ("hours"):("hour")}
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
export default SleepLogList;
