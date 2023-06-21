import { StyleSheet } from 'react-native';

import { width, height } from '../../theme/units';

export default StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    width: height / 2,
    height: height / 2,
    alignSelf: 'center'
  }
});
