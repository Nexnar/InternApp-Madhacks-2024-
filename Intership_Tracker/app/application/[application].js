
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { readFile } from '@/scripts/database';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function TabTwoScreen() {
  // get page param -> name the page
  console.log(useLocalSearchParams())
  const {application} = useLocalSearchParams();
  const [applicationData, setApplicationData] = useState("");


   // IMPORT DATA FROM Database
   async function databaseHandler(){
    let databaseOutput = await readFile() 
  
    databaseOutput.apps.forEach((e) => {
      console.log("for looping each title " + e.company)
      if(e.company === application){
        setApplicationData(e);
        return;
      }
    })
  }


  // use effect to only run once
  useEffect(() => {
    databaseHandler();
  }, [])
  // set the title of the page
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `Application For "${application}"`, // Set or update the title here
      
    });
  }, [navigation]);

  // sets on exit and on enter hooks
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Cleanup code when the screen loses focus
        Alert.alert(
          "Saving Data!", // Title of the alert
          "This is an alert message", // Message
        );
      };
    }, [])
  );

  

  return (
    <SafeAreaProvider style = {styles.mainDiv}>
      
      <SafeAreaView style = {[styles.div]}>
        <Text style = {[styles.text, styles.title]}>Job Information</Text>
        <Text style = {styles.text}>Application for company : "{applicationData.company}"</Text>
        <Text style = {styles.text}>Application Status : {applicationData.status}</Text>
        <Text style = {styles.text}>Position : {applicationData.Job_title}</Text>
        <Text style = {styles.text}>Details : {applicationData.extraNotes}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  div:{
    textAlign: "left",
    alignContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    
  },
  mainDiv:{
    
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
