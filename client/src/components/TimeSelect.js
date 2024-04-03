import { Buttons, Typography, Colors } from "../styles";
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from 'react-native-date-picker';


const TimeSelect = (props) => {

    // Get the formatted current time
    const getTime = () => {

    // Get the current time
    const date = new Date(props.date);

    // Format the time as such "12:00pm"
    let formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase();

    return formattedTime;
  }

    TimeSelect.propTypes = {
        date: PropTypes.any,
        setDate: PropTypes.func,
        open: PropTypes.bool,
        setOpen: PropTypes.func,
        dateIsConfirmed: PropTypes.bool,
        setIsConfirmed: PropTypes.func,
      };
    return (
        <>
            <DatePicker
            mode="time"
            modal open={props.open}
            date={props.date}
            // onDateChange={props.setDate}
            onConfirm={(date) => {
                props.setOpen(false)
                props.setDate(date)
                props.setIsConfirmed(true)
              }}
              onCancel={() => {
                props.setOpen(false)
                props.setIsConfirmed(false)
              }}
             />
            <TouchableOpacity style={styles.smallInput} onPress={() => props.setOpen(true)}>
                <Text style={{ color: props.dateIsConfirmed ? 'black' : 'grey' }}>{getTime()}</Text>
            </TouchableOpacity>
        </>
        
        
);
} 

const styles = StyleSheet.create({

    smallInput: {
        backgroundColor: Colors.Colors.columbiaBlue,
        borderRadius: 5,
        height: 25,
        marginStart: 10,
        textAlign: "center",
        paddingStart: 10,
        paddingEnd: 10,
        justifyContent: "center",
      },



});

export default TimeSelect;