import React from "react";
import {Link} from "expo-router";
import { Image, StyleSheet, Text,View, Platform, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  return (
    <SafeAreaProvider style = {{flexDirection: "column"}}>

      <SafeAreaView style = {[styles.titleDiv, styles.div]}>
        <Text style={[styles.text, styles.title]}>Application List</Text>
      </SafeAreaView>
      
      <SafeAreaView style = {styles.bodyDiv}>
        <Link href = {{pathname: "../application/application", params: {id:"test"}}} style = {styles.text}> test </Link>
        <Link href = {{pathname: "../application/application", params: {id:"bob"}}} style = {styles.text}> bob </Link>
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
    backgroundColor:"purple",
    color: "white"
  },
  bodyDiv:{
    flex: 11
  },
  text:{
    color: "white"
  },
  title:{
    fontSize: 30
  }
});
