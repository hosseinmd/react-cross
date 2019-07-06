export const NetInfo = {
  addEventListener(eventName = "connectionChange", listener) {
    function online() {
      listener({ type: "online" });
    }
    function offline() {
      listener({ type: "none" });
    }

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
    return {
      remove: () => {
        window.removeEventListener("online", online);
        window.removeEventListener("offline", offline);
      },
    };
  },
  getConnectionInfo() {
    return { type: window.navigator.onLine ? "online" : "none" };
  },
};
