import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    backgroundColor: colors.secondary40,
    color: colors.heading,
    borderRadius: 8,
    fontFamily: fonts.text400,
    fontSize: 13,
    marginRight: 4,
    textAlign: 'center'
  }
});