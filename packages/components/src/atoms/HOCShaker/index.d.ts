import { ComponentType,ComponentPropsWithRef, ExoticComponent } from "react";

declare function HOCShaker<T extends ComponentType<any>>(WrappedComponent: T
): ExoticComponent<ComponentPropsWithRef<T>> & ExoticComponent<{
  allowShake: boolean;
}>;

export {HOCShaker};
