import { Navigation } from 'react-native-navigation';
import { debounce } from 'lodash';

export const pushScreen = () => debounce((componentId, params) => {
  params.component && (params.component.passProps = { ...params.component.passProps, commandType: 'Push' } );
  Navigation.push(componentId, params);
}, 1000, { leading: true, trailing: false });

export const resetScreen = () => debounce((componentId, params) => {
  Navigation.setStackRoot(componentId, params);
}, 1000, { leading: true, trailing: false });
