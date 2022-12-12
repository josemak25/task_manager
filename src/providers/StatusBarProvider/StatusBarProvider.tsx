import React, { Fragment, PropsWithChildren } from "react";
import { StatusBar } from "react-native";

import { useIsDarkMode } from "../../hooks/useIsDarkMode";

export const StatusBarProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const isDarkMode = useIsDarkMode();

  return (
    <Fragment>
      <StatusBar
        animated
        translucent
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      {children}
    </Fragment>
  );
};
