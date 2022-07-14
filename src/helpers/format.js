import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import I18n from '@locales';
require('moment/locale/sv');
moment.locale(DeviceInfo.getDeviceLocale().split('-')[0]);

class Format {
  static dateTime(date, format = 'DD MMM YYYY HH:mm') {
    return moment(date).format(format);
  }

  static date(date, format = 'DD MMM YYYY') {
    return moment(date).format(format);
  }

  static time(date, format = 'HH:mm') {
    return moment(date).format(format);
  }

  static calendar(date) {
    return moment(date).calendar(null, {
      sameDay: `[${I18n.t('placeholder.today')}]`,
      nextDay: `[${I18n.t('placeholder.tomorrow')}]`,
      nextWeek: 'dddd',
      lastDay: `[${I18n.t('placeholder.yesterday')}]`,
      lastWeek: `[${I18n.t('placeholder.last')}] dddd`,
      sameElse: 'DD MMM'
    });
  }

  static getFullAddressString(address)
  {
    var addressString = "";
    if (address.Name)
    {
      addressString = address.Name;
    }
    if (address.StreetName)
    {
      var adderStart = "";
      var adderEnd = "";
      if (addressString)
      {
        adderStart = " (";
        adderEnd = ")";
      }

      var adderCity = "";
      if (address.City)
      {
        adderCity = ", " + address.City;
      }
      addressString += adderStart + (address.StreetName + " " + address.StreetNumber).trim() + adderCity + adderEnd;
    }
    return addressString;
  }

  static getStreetName(address)
  {
    var addressString = (address.StreetName + " " + address.StreetNumber).trim();
    if (address.City)
    {
      addressString += ", " + address.City;
    }
    return addressString;
  }

}

export { Format };
