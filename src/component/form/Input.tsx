import React from 'react';
import { View, ViewProps } from "react-native";

import {FormValues} from '../../../types/form'
import { makeUseStyles } from "../../helpers/makeUseStyles";

export const Input: React.FC<FormValues> = ({label, error, name, date,...props}) => {
    const { styles } = useStyles();

    return(
        <View style={styles.container}>

        </View>
    );
}


const useStyles = makeUseStyles(({ }) => ({
    container: {
      marginBottom: 20,
    },
  
  }));