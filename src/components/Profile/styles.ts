import { StyleSheet } from "react-native";
import { colors, fonts } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  user: {
    flexDirection: 'row'
  },
  greeting: {
    fontFamily: fonts.title500,
    fontSize: 24,
    color: colors.heading,
    marginRight: 6
  },
  username: {
    fontFamily: fonts.title700,
    fontSize: 24,
    color: colors.heading
  },
  message: {
    fontFamily: fonts.text400,
    color: colors.highlight
  }
})