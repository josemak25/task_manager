
import React from "react";
import { Checkbox } from 'react-native-paper';
import { Text, View, ViewProps } from "react-native";


import { makeUseStyles } from "../../helpers/makeUseStyles";
import { generateRandomColor } from "../../helpers/generateRandomColor";


const tags = [...Array(3)].map(generateRandomColor);


export const Cards: React.FC<ViewProps> = props => {
    const { styles } = useStyles();
    const [checked, setChecked] = React.useState(false);
  
    return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.title} numberOfLines={1}>Client Review & Feedback</Text>
          <Text style={styles.subtitle} numberOfLines={1}>Crypto Wallet Redesign</Text>
        </View>

        <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
      </View>

      <View style={styles.borderline}></View>
            
      <View style={styles.timeContainer}>
          <View style={styles.time}>
            <Text style={styles.day}>Today</Text>
            <Text style={styles.timer}>10:00 PM-11:45 PM</Text>
          </View>

          <View style={styles.frontOvalTags}>
                {tags.map((backgroundColor, index) => (
                  <View
                    key={index}
                    style={[
                      styles.frontOvalTag,
                      { left: index * 20, backgroundColor },
                    ]}
                  />
                ))}
              </View>
      </View>
        
    </View>
    );
  };
  
  const useStyles = makeUseStyles(({fonts, isDarkMode, layout, edgeInsets,palette}) => ({
    container:{
      borderRadius: 10,
      paddingTop: edgeInsets.top / 1.5,
      paddingBottom: edgeInsets.bottom,
      paddingHorizontal: layout.gutter * 2,
      backgroundColor: palette.listBackground,
    },
    
    cardContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: edgeInsets.bottom,
    },
   

      title:{
        color: palette.text,
        fontSize: fonts.size.lg,
        fontFamily: fonts.variants.bold,
        opacity: isDarkMode ? 0.4 : 0.3,
        textDecorationLine: 'line-through',
        // marginVertical: layout.gutter / 1.5,
      },

      subtitle:{
        color: palette.text,
        opacity: isDarkMode ? 0.4 : 0.3,
        fontFamily: fonts.variants.medium,
      },

      borderline:{
        borderBottomWidth: 1,
        borderBottomColor: palette.hairlineColor
      },

      timeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: edgeInsets.top / 2,

        // justifyContent: 'space-between',
        
      },

      time:{
        flexDirection: 'row'
      },

      day:{
        color: palette.text,
      },

      timer:{
        marginLeft: 10,
        color: palette.text,
      },
      
      frontOvalTags: {
        height: 30,
        marginLeft: 40,
        flexDirection: "row",
        alignItems: "center",
      },

      frontOvalTag: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: "#fff",
        position: "absolute",
        borderRadius: 30 / 2,
      },

  }),
  );