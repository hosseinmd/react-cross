export default {
  updateNavigationOptions: (store, navigatorRef) => {
    console.log(navigatorRef);
    const { state } = navigatorRef._navigation;
    const childKey = state.routes[state.index].key;
    const activeNav = navigatorRef._navigation.getChildNavigation(childKey);
    const navigationOptions = navigatorRef._navigation.router.getScreenOptions(
      activeNav,
    );
    store.setState({ navigationOptions });
  },
};
