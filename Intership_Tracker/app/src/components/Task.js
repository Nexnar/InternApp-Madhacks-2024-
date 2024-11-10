import { readFile, saveListToDatabase } from '@/scripts/database';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Task = (props) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true)

  async function handlePress(){
    const databaseData = await readFile();
    setIsVisible(false);
    const propsList = props.text.split(" , ");
    
    for(let i = 0; i < databaseData.apps.length; i++){
      const e = databaseData.apps[i];
      if(e.company === propsList[0] && e.Job_title === propsList[1] && e.status === propsList[2]){
        const outList = [...databaseData.apps.splice(0, i), ...databaseData.apps.splice(i+1)];
        console.log(outList)
        //Alert.alert("deleted : " + e.company + " " + e.Job_title)
        await saveListToDatabase(outList);
      }
    }

    router.navigate("/(tabs)")
  }

  function getSquareColors(){
    const propsList = props.text.split(" , ");
    if(propsList[2] === "INTERVIEW"){
      return <View style={[styles.square, styles.interview]}></View>
    } else if(propsList[2] === "ACCEPTED"){
      return <View style={[styles.square, styles.accepted]}></View>
    } else if(propsList[2] === "REJECTED"){
      return <View style={[styles.square, styles.rejected]}></View>
    } else {
      return <View style={[styles.square]}></View>
    }
  }

  return (
    isVisible && <View style={styles.item}>
      <View style={styles.itemLeft}>
        {
          getSquareColors()
        }
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.ex}>X</Text>
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
  accepted: {
    backgroundColor: "green",
    opacity: 1,

  },
  rejected: {
    backgroundColor: "red",
    opacity: 1,
  },
  pending: {
    backgroundColor: "fff",
    opacity: 1,
  },
  interview: {
    backgroundColor: "blue",
    opacity: 1,
  },

  itemText: {
    maxWidth: '90%',
  },
  ex: {
    width: 18,
    height: 30,
    textAlign: 'right',
    fontSize: 26,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Task;
