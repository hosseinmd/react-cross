import { useMemo, useEffect, useRef } from "react";
import { createStore } from "@stately/core";
import { createHooks } from "@stately/hooks";

export function useFlattenStyle(style, deps) {
  return useMemo(() => style, deps);
}

/**
 * @template stylesT
 * @param {() => stylesT} styles
 * @param {any[]} deps
 * @returns {stylesT}
 */
export function useFlattenStyles(styles, deps) {
  return useMemo(() => styles(), deps);
}

/**
 * @deprecated use react-global-hooks
 * @template stateT , actionsT
 * @param {()=>stateT} initialState
 * @param {()=>actionsT} actions
 * @param {Array<keyof stateT>} sensitiveStateKeys
 * @param {()=>void} listener
 * @returns {[stateT,actionsT]}
 */
export function useLocalStore(
  initialState,
  actions,
  sensitiveStateKeys,
  listener,
) {
  const useStore = useMemo(() => {
    const localStore = createStore(initialState(), actions());
    return createHooks(localStore);
  }, []);
  return useStore(sensitiveStateKeys, listener);
}

export function useMount() {
  const ref = useRef({ isMounted: true }).current;
  useEffect(() => {
    return () => (ref.isMounted = true);
  }, []);
  return ref;
}

export function useNavigationEvents(
  navigation,
  { action, willFocus, didFocus, willBlur, didBlur },
) {
  useEffect(() => {
    const subsAction = action && navigation.addListener("action", action);
    const subsWillFocus =
      willFocus && navigation.addListener("willFocus", willFocus);
    const subsDidFocus =
      didFocus && navigation.addListener("didFocus", didFocus);
    const subsWillBlur =
      willBlur && navigation.addListener("willBlur", willBlur);
    const subsDidBlur = didBlur && navigation.addListener("didBlur", didBlur);
    return () => {
      subsAction && subsAction.remove();
      subsWillFocus && subsWillFocus.remove();
      subsDidFocus && subsDidFocus.remove();
      subsWillBlur && subsWillBlur.remove();
      subsDidBlur && subsDidBlur.remove();
    };
  }, []);
}
