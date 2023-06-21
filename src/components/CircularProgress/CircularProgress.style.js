import { StyleSheet } from 'react-native';

import { width, height } from '../../theme/units';
import { colors } from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    marginTop: height / 50
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  percent: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 20,
    fontWeight: '600'
  },
  line: {
    height: height * 0.0009,
    backgroundColor: colors.BLACK,
    marginTop: height / 2.8,
    marginHorizontal: height / 20
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: height / 15,
  },
  label: {
    width: height / 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 100
  },
  choose: {
    width: height / 45,
    height: height / 45,
    borderRadius: height / 45,
    borderColor: colors.BLACK,
    borderWidth: height / 1000,
    marginBottom: height / 200,
  },
  activeChoose: {
    borderColor: colors.CORAL,
    borderWidth: height / 250,
  },
  labelText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.BLACK,
  },
  activeLabelText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.CORAL,
  }
});
