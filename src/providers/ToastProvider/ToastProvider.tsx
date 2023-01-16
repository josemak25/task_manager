import React, { Fragment, PropsWithChildren } from "react";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";
import { makeUseStyles } from "../../helpers/makeUseStyles";

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { styles, edgeInsets, layout } = useStyles();

  const config: ToastConfig = {
    /*
  Overwrite 'success' type,
  by modifying the existing `BaseToast` component
*/
    success: (props) => (
      <BaseToast {...props} style={styles.container} text1Style={styles.text} />
    ),
  };

  return (
    <Fragment>
      {children}
      <Toast
        config={config}
        position="bottom"
        bottomOffset={edgeInsets.bottom + layout.gutter}
      />
    </Fragment>
  );
};

const useStyles = makeUseStyles(({ layout, palette, fonts }) => ({
  container: {
    width: 240,
    borderLeftWidth: 0,
    backgroundColor: palette.input,
    borderRadius: layout.gutter * 5,
  },
  text: {
    opacity: 0.7,
    textAlign: "center",
    color: palette.text,
    fontSize: fonts.size.md,
    fontFamily: fonts.variants.medium,
  },
}));
