import { Typography, Colors } from "../styles";
import { StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";

const TitleInput = (props) => {

    TitleInput.propTypes = {
        value: PropTypes.any,
        onChangeText: PropTypes.func,
      };
    return (
        <TextInput
            style={styles.titleInput}
            placeholder="Title"
            value={props.value}
            onChangeText={props.onChangeText}
      />

);
}

const styles = StyleSheet.create({

    titleInput: {
        backgroundColor: Colors.Colors.lightYellow,
        ...Typography.header4,
        textAlign: "left",
        height: 50,
        padding: 10,
      },


});

export default TitleInput;