import { StyleSheet } from "react-native";
import { colors, fonts } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24
  },
  title: {
    fontFamily: fonts.title700,
    color: colors.heading,
    fontSize: 18
  },
  subtitle: {
    fontFamily: fonts.text400,
    color: colors.highlight,
    fontSize: 13
  }
});