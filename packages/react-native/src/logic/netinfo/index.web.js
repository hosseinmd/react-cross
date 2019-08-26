const MODE_ONLINE = {
  type: "online",
  isConnected: true,
},
MODE_OffLINE = {
  type: "none",
  isConnected: false,
};

export const NetInfo = {
addEventListener(listener) {
  function online() {
    listener(MODE_ONLINE);
  }
  function offline() {
    listener(MODE_OffLINE);
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
fetch() {
  if (window.navigator.onLine) {
    return MODE_ONLINE;
  } else {
    return MODE_OffLINE;
  }
},
};
