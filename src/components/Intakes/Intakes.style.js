import { StyleSheet } from 'react-native';

import { width, height } from '../../theme/units';
import { colors } from '../../theme/colors';

export default StyleSheet.create({
  container: {
    width: width,
    height: height / 2.7,
    backgroundColor: colors.POWDER_BLUE,
    position: 'absolute',
    bottom: 0,
    borderTopStartRadius: height / 30,
    borderTopEndRadius: height / 30,
  },
  line: {
    width: width / 3,
    height: height / 100,
    backgroundColor: colors.WHITE,
    marginVertical: height / 50,
    borderRadius: height / 100,
    alignSelf: 'center'
  },
  intakeContainer: {
    height: height / 20,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    marginHorizontal: width / 20,
    marginBottom: height / 50,
    borderRadius: height / 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width / 20
  }
});
