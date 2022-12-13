import React from "react";
import { View, Text,  } from "react-native";
import { Button,  Badge } from 'react-native-paper';

import {Cards }from "../../component/card/Cards"
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";

export const HomeScreen: React.FC<RootTabScreenProps<"Home">> = ({}) => {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
          <View style={styles.schedule}>
            <View style={styles.titleContainer}>
               <Text style={styles.title}>Today's Task</Text>
               <Text style={styles.subtitle}>Tuesday, 13 December</Text>
            </View>

            <Button 
                icon="plus" 
                mode="contained"
                style={styles.button}
                onPress={() => console.log('Pressed')}>
                New Task
            </Button>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.list}>
              <Text style={styles.listItem}>All</Text>
              <Badge style={styles.badge}>365</Badge>
            </View>

            <View style={styles.list}>
              <Text style={styles.listItem}>Open</Text>
              <Badge style={styles.badge}>35</Badge>
            </View>

            <View style={styles.list}>
              <Text style={styles.listItem}>Closed</Text>
                <Badge style={styles.badge}>19</Badge>
            </View>
          </View>

          <Cards/>
    </View>
  );
};

const useStyles = makeUseStyles(({isDarkMode, palette,layout, fonts, edgeInsets }) => ({
  container: {
    flex: 1,
    paddingTop: edgeInsets.top,
    paddingBottom: edgeInsets.bottom,
    paddingHorizontal: layout.gutter * 2,
    backgroundColor: palette.homeBackground,
  },

  schedule:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  titleContainer:{
    
  },

  title: {
    color: palette.text,
    fontSize: fonts.size.xlg,
    fontWeight: fonts.weight.bold,
  },

  subtitle:{
    color: palette.text,
    fontSize: fonts.size.md,
    opacity: isDarkMode ? 0.4 : 0.3,
    marginVertical: layout.gutter - 1.5,
  },

  button:{
    borderRadius: 10,
    color: palette.text,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.addNew,
    marginVertical: layout.gutter - 1.5,
  },

  listContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: edgeInsets.top,
    justifyContent: 'space-between',
    paddingBottom: edgeInsets.bottom,
  },

  list:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  listItem:{
    color: palette.text,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,
    opacity: isDarkMode ? 0.4 : 0.3,
   
  },

  circleCounter:{
    width: 25,
    height: 25,
    marginLeft: 10,
    borderRadius: 15,
    alignItems: 'center',
    color: palette.text,
    backgroundColor: palette.addNew
  },


  badge:{
    alignItems: 'center',
    justifyContent: 'center',
    color: palette.lightText,
  },
}));
