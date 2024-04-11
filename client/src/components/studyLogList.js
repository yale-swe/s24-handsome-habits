import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import LogItem from "./LogItem.js";
import { deleteHabit} from "../services/habitService.js";
import { Typography, Colors } from "../styles";

const StudyLogList = ({ study }) => {

    const [studyList, setStudy] = useState(study);

    useEffect(() => {
        setStudy(study);
    }, [study]);

    const handleDelete = async (id) => {
        const success = await deleteHabit(id);
        if (success) {
          const updatedStudy = studyList.filter(study_session => study_session._id !== id);
          setStudy(updatedStudy);
        }
      };

  return (
    <View style={{width: "auto", flex: 1}}>
      <ScrollView >
          <View style={{padding: 20}}>
            {studyList && studyList.length > 0 ? (
              studyList.map((study_session, index) => (
                <View key={study_session._id} style={{ marginBottom: index === studyList.length - 1 ? 0 : 20 }}>
                  <LogItem
                    title={study_session.title}
                    duration={study_session.details.study.study_duration}
                    time={study_session.date_and_time}
                    tags={[study_session.details.study.study_productivity]}
                    onDelete={() => handleDelete(study_session._id)}
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
export default StudyLogList;
