import { readFile, saveListToDatabase } from '@/scripts/database';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true)

  async function handlePress(){
    const databaseData = await readFile();
    setIsVisible(false);
    const propsList = props.text.split(" , ");
    console.log(propsList)
    
    for(let i = 0; i < databaseData.apps.length; i++){
      const e = databaseData.apps[i];
      if(e.company === propsList[0] && e.Job_title === propsList[1] && e.status === propsList[2]){
        const outList = [...databaseData.apps.splice(0, i), ...databaseData.apps.splice(i+1)];
        await saveListToDatabase(outList);
      }
    }

    router.navigate("/(tabs)")
  }

  return (
    isVisible && <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.circular} ></View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '90%',
  },
  circular: {
    width: 20,
    height: 20,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default Task;
