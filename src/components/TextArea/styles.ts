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
    fontSize: 25,
    marginRight: 4,
    textAlign: 'center'
  }
});