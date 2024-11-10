import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View } from 'react-native';
import PieChart from '@/components/PieChart';
import TimeBarGraph from '@/components/chart';


export default function TabTwoScreen() {
  const chartData = [
    { value: 20, color: 'red' },
    { value: 20, color: 'blue' },
    { value: 60, color: 'green' },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style = {[styles.titleDiv, styles.div]}>
        <Text style={[styles.text, styles.title]}>
          Analytics
        </Text>
      </SafeAreaView>
      <SafeAreaView style = {[styles.bodyDiv, styles.div]}>
        <PieChart data = {chartData}/>
        <Text>                           </Text>
        <Text style={[styles.labelColor, styles.labelSize2]}>Total Applications Submitted: </Text>
        <Text style={[styles.greenColor, styles.labelSize]}>Accepted: </Text>
        <Text style={[styles.redColor, styles.labelSize]}>Rejected: </Text>
        <Text style={[styles.blueColor, styles.labelSize]}>Pending: </Text>
        <Text style={[styles.labelColor, styles.labelSize]}>Success Rate: </Text>
        <Text>                           </Text>
        <TimeBarGraph/>
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
  }
});
