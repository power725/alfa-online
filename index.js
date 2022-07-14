import { AppRegistry } from "react-native";
import { Navigation } from "react-native-navigation";

import { name as appName } from "./app.json";
import App from "./src/App";

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
    },
    layout: {
      orientation: ["portrait"],
    },
    animations: {
      push: {
        content: {
          x: {
            from: 2000,
            to: 0,
            duration: 600,
          },
        },
      },
      pop: {
        content: {
          x: {
            from: 0,
            to: 2000,
            duration: 600,
          },
        },
      },
      setRoot: {
        enabled: true,
        x: {
          from: 2000,
          to: 0,
          duration: 400,
        },
      },
      setStackRoot: {
        enabled: true,
      },
    },
  });
});

AppRegistry.registerComponent(appName, () => App);
