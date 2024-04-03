import { Colors } from "../styles";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from "prop-types";

const HorizontalSelect = (props) => {

    HorizontalSelect.propTypes = {
        label: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string),
        selectedOption: PropTypes.string,
        setSelectedOption: PropTypes.func,
      };
    return (

        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typesContainer}
        >
            {props.options.map((option, index) => (
            <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={[styles.typeButton, option === props.selectedOption && styles.selectedTypeButton]}
                onPress={() => props.setSelectedOption(option)}>
                <Text>
                {option}
                </Text>
            </TouchableOpacity>
            ))}
      </ScrollView>

);
}

const styles = StyleSheet.create({

    typesContainer: {
        flexDirection: "row",
        paddingRight: 10,
        paddingTop: 10,
        // width: "80%",
        paddingLeft: 0,
      },
    typeButton: {
        backgroundColor: Colors.Colors.columbiaBlue,
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderStyle: "dashed",
        borderColor: Colors.Colors.skyBlue,
        borderWidth: 2,
        margin: 5,
    },
    selectedTypeButton: {
        backgroundColor: Colors.Colors.skyBlue,
        borderColor: Colors.Colors.navy,
        borderStyle: "solid",

    },



});

export default HorizontalSelect;