import { makeUseStyles } from "../helpers/makeUseStyles";

export const useIsDarkMode = () => {
  const { isDarkMode } = useStyles();

  return isDarkMode;
};

const useStyles = makeUseStyles(() => ({}));
