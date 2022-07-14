import Mixpanel from 'react-native-mixpanel';

class Analytics {
  constructor() {
    this.mixpanel = (callback) =>
      Mixpanel.sharedInstanceWithToken("182ff0dda82b88092751395a0ca4684e")
        .then(() => {
          callback();
        })
        .catch((error) =>
          console.log("Failed to initialize Mixpanel: ", error)
        );
  }

  track = async (event) => {
    this.mixpanel(() => Mixpanel.track(event));
  };

  trackWithProperties = async (event, props) => {
    this.mixpanel(() => Mixpanel.trackWithProperties(event, props));
  };

  identify = async (unique_id) => {
    this.mixpanel(() => Mixpanel.identify(unique_id));
  };
}

export default new Analytics();
