import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 95,
    backgroundColor: colors.secondary40,
    color: colors.heading,
    borderRadius: 8,
    fontFamily: fonts.text400,
    letterSpacing: 1,
    fontSize: 13,
    marginRight: 4,
    borderWidth: 1,
    borderColor: colors.secondary50,
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top'
  }
});