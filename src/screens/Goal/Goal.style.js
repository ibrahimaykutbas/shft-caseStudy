import { StyleSheet } from 'react-native';

import { width, height } from '../../theme/units';
import { colors } from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: height / 50,
    paddingHorizontal: width / 20,
  },
  backButton: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginLeft: -height / 30
    
  }
});
