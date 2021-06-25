import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../global/styles/theme';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 234,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 30
  },
  members: {
    marginLeft: 24,
    marginTop: 27,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.title700,
    color: colors.heading,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fonts.text400,
    color: colors.heading,
    lineHeight: 21,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: getBottomSpace()
  }
});