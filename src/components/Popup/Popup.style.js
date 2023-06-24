import { StyleSheet } from 'react-native';

import { width, height } from '../../theme/units';
import { colors } from '../../theme/colors';

export default StyleSheet.create({
  container: {
    width: width / 1.2,
    height: height / 15,
    backgroundColor: colors.MINT,
    position: 'absolute',
    top: height / 20,
    zIndex: 9999,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height * 0.01
  },
  text: {
    color: colors.WHITE,
    fontWeight: 'bold',
  }
});
