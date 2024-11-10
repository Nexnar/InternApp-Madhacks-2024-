import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View } from 'react-native';
import PieChart from '@/components/PieChart';
import TimeBarGraph from '@/components/chart';
import { writeExampleDatabase, readFile } from '@/scripts/database';
import { useFocusEffect, useRouter } from 'expo-router';

export default function TabTwoScreen() {
  
  const [a, setA] = useState(0);
  const [r, setR] = useState(0);
  const [p, setP] = useState(0);
  const [i, setI] = useState(0);
  const [t, setT] = useState(0);

  async function databaseHandler(){
    let databaseOutput = await readFile()
    
    databaseOutput.apps.forEach((e) => {
      setT(num => {return num + 1});
      if(e.status === "ACCEPTED"){
        setA(num => {return num + 1});
      }
      else if(e.status === "REJECTED"){
        setR(num => {return num + 1});
      }
      else if(e.status === "PENDING"){
        setP(num => {return num + 1});
      }
      else if(e.status === "INTERVIEW"){
        setI(num => {return num + 1});
      }
    })
  }
  
  useFocusEffect(
    React.useCallback(() => {
      setA(0)
      setR(0)
      setP(0)
      setI(0)
      setT(0)



      databaseHandler();
        return () => {
        };
      }, [])
    );

  const chartData = 
  [{value: a, color: "green"},
    {value: r, color: "red"},
    {value: i, color: "blue"},
    {value: p, color: "gray"}
  ]
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style = {[styles.titleDiv, styles.div]}>
        <Text style={[styles.text, styles.title]}>
          Analytics
        </Text>
      </SafeAreaView>
      <SafeAreaView style = {[styles.bodyDiv, styles.div]}>
        <Text>                      </Text>
        <TimeBarGraph Edata={[a, r, i, p, t]}/>
        <Text style={[styles.labelColor, styles.labelSize2]}>Total Applications Submitted: {t}</Text>
        <Text style={[styles.greenColor, styles.labelSize]}>Accepted: {a}</Text>
        <Text style={[styles.redColor, styles.labelSize]}>Rejected: {r}</Text>
        <Text style={[styles.blueColor, styles.labelSize]}>Interview: {i}</Text>
        <Text style={[styles.grayColor, styles.labelSize]}>Pending: {p}</Text>
        <Text style={[styles.labelColor, styles.labelSize]}>Success Rate: {a / (a + r) * 100} %</Text>
        <Text>                           </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  div:{
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  titleDiv:{
    flex: 1,
    backgroundColor:"gray",
    color: "white"
  },
  bodyDiv:{
    flex: 10
  },
  pieDiv:{
    flex: 6
  },
  textDiv:{
    flex: 3
  },
  text:{
    color: "white"
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  labelSize:{
    fontSize: 10,
    fontWeight: 'bold'
  },
  labelSize2:{
    fontSize: 20
  },
  labelColor:{
    color: "black"
  },
  labelDiv:{
    flex: 1
  },
  greenColor:{
    color: "green"
  },
  redColor:{
    color: "red"
  },
  blueColor:{
    color: "blue"
  },
  grayColor:{
    color: "gray"
  }
});
