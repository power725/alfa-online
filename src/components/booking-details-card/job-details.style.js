import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  container: {
    paddingLeft: 20
  },
  row: {
    flexDirection: 'row'
  },
  tagsContainer: {
    flex: 1,
    flexWrap: 'wrap'
  },
  tagSpace: {
    // width: 15
  },
  tag: {
    marginTop: 10,
    marginRight: 14,
  },
  tagIcon: {
    marginHorizontal: 7,

  },
  tagTextContainer: {
    flexDirection: 'row'
  },
  tagText: {
    flex: 1,
    marginTop: 5,
    fontSize: 11,
    lineHeight: 13,
    color: COLOR.TEXT_PRIMARY_1,
    textAlign: 'center'
  },
  priceContainer: {
    marginRight: -2
  },
  priceTag: {
    marginTop: 10,
    height: 36,
    paddingHorizontal: 10,
    backgroundColor: COLOR.BAR_BACKGROUND,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    justifyContent: 'center'
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1
  },
  priceTextSmall: {
    fontSize: 14,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1
  }
});
