
import React, {useState} from "react";
import { Button, TextInput } from 'react-native-paper';
import { View, Text, SectionList } from "react-native";

import { DATA } from "../../component/categories/Data";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootTabScreenProps } from "../../../types/navigation";

export const NewTaskScreen: React.FC<RootTabScreenProps<"NewTask">> = ({}) => {
  const { styles } = useStyles();
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
 

  return (
    <View style={styles.container}>
     <View style={styles.inputContainer}>
       <Text style={styles.inputText}>Name</Text>
        <TextInput
             mode="outlined"
            value={name}
            style={styles.input}
            onChangeText={name => setName(name)}
          />
     </View>

     <View style={styles.inputContainer}>
      <Text style={styles.inputText}>Date</Text>
        <TextInput
             mode="outlined"
            value={date}
            style={styles.input}
            onChangeText={date => setDate(date)}
          />
     </View>

     <View style={styles.dateContainer}>
        <View style={styles.startdate}>
          <Text style={styles.inputText}>Start Time </Text>
          <View style={styles.start}>
            <TextInput
               mode="outlined"
              value={startDate}
              style={styles.input}
              onChangeText={startDate => setStartDate(startDate)}
              />
            <Text style={styles.inputHour}>PM</Text>
            </View>
        </View>

        <View style={styles.endDate}>
          <Text style={styles.inputText}>End Time </Text>
          <View style={styles.end}>
            <TextInput
              mode="outlined"
              value={endDate}
              style={styles.input}
              onChangeText={endDate => setEndDate(endDate)}
            />
            <Text style={styles.inputHour}>PM </Text>
          </View>
        </View>
     </View>

     <View>
        <Text style={styles.inputText}>Description</Text>
        <Text style={styles.text}>Build an e-commerce website about hand made furniture</Text>
     </View>
      
      <View>
        <Text style={styles.inputText}>Add Category</Text>

        <TextInput
          mode="outlined"
          style={styles.addCategory}
          right={<TextInput.Icon icon="plus-circle" />}
          // onPress={handlePress}
        />
      </View>

      <View style={styles.cardContainer}>
    
      </View>
     
      <Button 
       mode="contained" 
       style={styles.button}
       onPress={() => console.log('Pressed')}
       >
       Create a new task
      </Button>

    </View>
  );
};

const useStyles = makeUseStyles(({layout, palette, fonts, edgeInsets }) => ({
  container: {
    flex: 1,
    paddingTop: edgeInsets.top,
    paddingBottom: edgeInsets.bottom,
    backgroundColor: palette.background,
    paddingHorizontal: layout.gutter * 2,
  },

  inputContainer:{
    marginVertical: layout.gutter/ 2
  },

  inputText:{
    color: palette.text,
    fontSize: fonts.size.default,
    marginVertical: layout.gutter,
  },

  input:{
    borderWidth: 0,
    borderRadius: 15,
    outlineStyle: 'none',
    borderBottomWidth: 0,
    paddingHorizontal: layout.gutter - 2,
    backgroundColor: palette.listBackground
  },

  dateContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: layout.gutter * 2,
  },

  startdate:{
  },
  
  start:{
    alignItems: 'center',
    flexDirection: 'row'
  },
  
  inputHour:{
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: palette.text,
    fontSize: fonts.size.default,
  },

  endDate:{

  },

  end:{
    alignItems: 'center',
    flexDirection: 'row'
  },

  text: {
    color: palette.text,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.bold,
  },

  addCategory:{
    backgroundColor: palette.hairlineColor
  },

  cardContainer:{
    borderRadius: 10,
    paddingHorizontal: layout.gutter * 3,
    backgroundColor: palette.hairlineColor
  },

  button:{
    padding: 10,
    marginTop: layout.gutter,
    backgroundColor: palette.addNew
  },
}));
