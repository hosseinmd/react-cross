import { Vibration } from "react-native";
export const vibrate = {
  alarm(status) {
    status
      ? Vibration.vibrate([0, 200, 200, 200])
      : Vibration.vibrate([0, 500]);
  },
  shock() {
    Vibration.vibrate([0, 200]);
  },
};
