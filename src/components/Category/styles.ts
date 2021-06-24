import { StyleSheet } from "react-native";
import { colors, fonts } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8
  },
  content: {
    width: 100,
    height: 116,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  checked: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    backgroundColor: colors.primary,
    
    
    borderRadius: 3
  },
  check: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 12,
    height: 12,
    backgroundColor: colors.secondary100,
    borderColor: colors.secondary50,
    borderWidth: 2, 
    borderRadius: 3
  },
  title: {
    fontFamily: fonts.title700,
    color: colors.heading,
    fontSize: 15
  }
})