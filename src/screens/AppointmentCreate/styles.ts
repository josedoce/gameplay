import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.title700,
    color: colors.heading
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 32
  },
  select: {
    width: '100%',
    height: 68,
    flexDirection: 'row',
    borderColor: colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingRight: 25,
    overflow: 'hidden'
  },
  image: {
    width: 64,
    height: 68,
    backgroundColor: colors.secondary50,
    borderWidth: 1,
    borderRadius: 8
  },
  selectBody: {
    flex: 1,
    alignItems: 'center'
  },
  field: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  column: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    marginRight: 4,
    fontSize: 15,
    fontFamily: fonts.text500,
    color: colors.highlight
  },
  caracteresLimit: {
    fontFamily: fonts.text400,
    fontSize: 13,
    color: colors.highlight
  },
  footer: {
    marginVertical: 20,
    marginBottom: 56
  }
});