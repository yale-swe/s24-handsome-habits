import { Colors } from "../styles";
import { StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";

const DescriptionInputs = (props) => {

    DescriptionInputs.propTypes = {
        value: PropTypes.any,
        onChangeText: PropTypes.func,
      };
    return (
        <TextInput
                  style={[styles.descriptionInput]}
                  multiline={true}
                  placeholder="Description"
                  value={props.value}
                  onChangeText={props.onChangeText}
        />
    );
}

const styles = StyleSheet.create({

    descriptionInput: {
        backgroundColor: Colors.Colors.lightYellow,
        borderRadius: 5,
        textAlign: "left",
        textAlignVertical: "top",
        height: 125,
        paddingTop: 10,
        paddingLeft: 10,
        // paddingBottom: 10,
        paddingRight: 10,
      },

});

export default DescriptionInputs;
