import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    color: colors.heading,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: fonts.text500
  },
});