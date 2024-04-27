import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, ScrollView,Text, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { Typography, Colors, Buttons } from "../styles";
import BackButton from "../components/backButton";
import { getTotalHabits } from "../services/habitService";
import { CASLogout } from "../services/authenticationUtil";
import  {
  LoginWithActiveSession,
} from "../services/authenticationUtil";
import { useAuth } from "../components/authContext";


// eslint-disable-next-line
const Settings = (props) => {

  const [totalHabits, setTotalHabits] = useState("-");
  const [userName, setUserName] = useState('Handsome Pal');

  const fetchName = async () => {
    try {
      const user = await LoginWithActiveSession();
      if (user) {
        var userData = await user.data;
        userData = decodeURIComponent(JSON.stringify(userData.user));
      } else {
        console.error("No user data found");
      }

      const stringUser = decodeURIComponent(JSON.stringify(userData));
      const StringUserObject = JSON.parse(stringUser);
      const userObject = StringUserObject.slice(1, -1);
      const parsedUserObject = JSON.parse(userObject);
      const name = parsedUserObject.first_name.toLowerCase();

      setUserName(name);
      
    } catch (error) {
      console.error("Error fetching or parsing user data:", error);
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchHabits = async () => {
        const total = await getTotalHabits();
        setTotalHabits(total);
      };

      fetchHabits();
      fetchName();
    }, [])
  );

  const { setIsAuthenticated } = useAuth();


  const handleLogout = async () => {
    CASLogout();
    setIsAuthenticated(false);
    props.navigation.navigate("Login");
    
  };

  

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
        <ScrollView>
        <View style={styles.lowerBox}>
        <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.menuItem}>
              <Text style={Typography.settingMenuName}>Name</Text>
              <View style={styles.nameContainer}>
              <Text style={Typography.defaultFont }>{userName}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Text style={Typography.settingMenuItem}>My Habit Goals</Text>
              <Text style={Typography.settingMenuArrow }>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Text style={Typography.settingMenuItem}>Help & Support</Text>
              <Text style={Typography.settingMenuArrow }>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Text style={Typography.settingMenuItem}>About Handsome Habits</Text>
              <Text style={Typography.settingMenuArrow }>{">"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        </ScrollView>
        <View style={styles.lowerBox}>
          <TouchableOpacity
            onPress={() => handleLogout()
            }
            style={styles.logButton}
            >
            <Text style={styles.logButtonText}>Log out</Text>
          </TouchableOpacity>
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
    padding: 12,
  },
  construction: {
    margin: 15,
    width: 255,
    height: 230,
  },
  menuItem: {
    padding: 20,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', 
    width: 350,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  logButtonText: {
    color: "white",
    ...Typography.header4,
  },
  logButtonContainer: {
    alignItems: "center",
  },
  logButton: {
    backgroundColor: Colors.Colors.navy,
    ...Buttons.logButton,
  },
  nameContainer:
  {
    width: "auto",
    padding: 7,
    backgroundColor: Colors.Colors.lightBeige,
    borderRadius: 7,
  }
});

export default Settings;
