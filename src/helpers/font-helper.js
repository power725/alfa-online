import _ from 'lodash';

const Mukta = {
  "100":        { fontFamily: "Mukta-ExtraLight" },
  "100italic":  { fontFamily: "Mukta-ExtraLight" },
  "200":        { fontFamily: "Mukta-Light" },
  "200italic":  { fontFamily: "Mukta-Light" },
  "300":        { fontFamily: "Mukta-Light" },
  "300italic":  { fontFamily: "Mukta-Light" },
  "400":        { fontFamily: "Mukta-Regular" },
  "400italic":  { fontFamily: "Mukta-Regular" },
  "500":        { fontFamily: "Mukta-Medium" },
  "500italic":  { fontFamily: "Mukta-Medium" },
  "600":        { fontFamily: "Mukta-Semibold" },
  "600italic":  { fontFamily: "Mukta-Semibold" },
  "700":        { fontFamily: "Mukta-Bold" },
  "700italic":  { fontFamily: "Mukta-Bold" },
  "800":        { fontFamily: "Mukta-ExtraBold" },
  "800italic":  { fontFamily: "Mukta-ExtraBold" },
  "900":        { fontFamily: "Mukta-ExtraBold" },
  "900italic":  { fontFamily: "Mukta-ExtraBold" },
}

function FontHelper(fontParams) {
  var {fontFamily, fontWeight, fontStyle} = fontParams;

  fontFamily = fontFamily || 'Mukta';
  fontWeight = fontWeight || '400';
  fontStyle = fontStyle || ''

  if (fontFamily == 'Mukta') {
    return {
      ..._.omit(fontParams, ['fontFamily', 'fontWeight', 'fontStyle']),
      ...Mukta[fontWeight + fontStyle]
    };
  }
  else {
    return fontParams;
  }
}

export { FontHelper };
