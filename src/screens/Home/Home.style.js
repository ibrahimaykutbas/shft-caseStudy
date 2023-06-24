import { StyleSheet } from 'react-native';

import { width, height } from '../../theme/units';
import { colors } from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  share: {
    marginTop: height / 70,
    marginRight: height / 50,
    alignSelf: 'flex-end'
  }
});
