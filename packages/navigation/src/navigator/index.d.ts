import React from "react";

export interface NavigatorProps {
  statusBarContentColor: "light-content" | "dark-content";
  /**
   * `platform android`
   */
  statusBarBackgroundColor: string;
}

declare class Navigator extends React.PureComponent<NavigatorProps> {}
export default Navigator;
