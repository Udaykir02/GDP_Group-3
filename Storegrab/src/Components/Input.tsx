import React from "react";
import { StyleSheet, TextInput } from "react-native";

import theme from "../styles/theme";

const Input = ({ shadowless, success, error, style, ...rest }: any) => {
  const inputStyles = [
    styles.input,
    style
  ];

  return (
    <TextInput
      placeholder="write something here"
      placeholderTextColor={theme.colors.lightGrey}
      style={inputStyles}
      {...rest}
    />
  );
};

Input.defaultProps = {
  shadowless: false,
  success: false,
  error: false
};

Input.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: theme.colors.border,
    height: 44,
    backgroundColor: '#FFFFFF'
  },
  success: {
    borderColor: theme.colors.success,
  },
  error: {
    borderColor: theme.colors.alertRed,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  }
});

export default Input;
