import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default {
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    marginHorizontal: 40,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  paginatiionDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLOR.PAGINATION_DOT,
    marginHorizontal: 2
  },
  activePaginationDot: {
    backgroundColor: COLOR.PAGINATION_DOT_ACTIVE
  }
};
