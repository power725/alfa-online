import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  container: {

  },
  infoBanner: {
    backgroundColor: COLOR.BAR_BACKGROUND_2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0.5
  },
  infoBannerText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1,
    height: 24
  },
  infoBannerEmpty: {
    height: 4
  },
  infoBottomContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 13,
    paddingHorizontal: 11,
    backgroundColor: COLOR.CARD_BACKGROUND_1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36
  },
  progressIcon: {
    position: 'absolute'
  },
  progressText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: -7
  },
  progressTextSmall: {
    fontSize: 14
  },
  infoBottomSeparator: {
    width: 2,
    borderRadius: 1,
    backgroundColor: COLOR.SEPARATOR_2,
    marginHorizontal: 10
  },
  infoBottomTextContainer: {
    flexShrink: 1,
    justifyContent: 'center'
  },
  infoBottomTextPrimary: {
    marginTop: 4,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1
  },
  infoBottomTextSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: COLOR.TEXT_PRIMARY_1,
    lineHeight: 17
  },
});
