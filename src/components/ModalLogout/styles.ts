import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  botoes: {
    width: '40%',
    height: 56
  },
  title:{
    fontFamily: fonts.title700,
    color: colors.heading,
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 4
  }
});