
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { readFile, saveListToDatabase } from '@/scripts/database';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function TabTwoScreen() {
  // get page param -> name the page
  console.log(useLocalSearchParams())
  const {application} = useLocalSearchParams();
  const [applicationData, setApplicationData] = useState("test");

  const [index, setIndex] = useState("-1")
  const [applicationsList, setApplicationsList] = useState([]);
  const [newCompany, setNewCompany] = useState("");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newExtraNotes, setNewExtraNotes] = useState("");


   // IMPORT DATA FROM Database
   async function databaseHandler(){
    let databaseOutput = await readFile() 


    for(let i = 0; i < databaseOutput.apps.length; i++){
      const e = databaseOutput.apps[i];
      if( e.company === application){
        setApplicationData(e);
        setIndex(i)
      }
    }

  }

  async function writeData(){
    let databaseOutput = await readFile() 
    const data = applicationData;
    data.company = newCompany;
    data.Job_title = newJobTitle;
    data.status = newStatus;
    data.extraNotes = newExtraNotes;
    console.log("new data " + data)
    databaseOutput.apps[index] = applicationData;
    await saveListToDatabase(databaseOutput.apps);
    
  }


  // use effect to only run once
  useEffect(() => {
    databaseHandler();
  }, [])


// saving the data
useEffect(() => {
  setNewCompany(applicationData.company)
  setNewExtraNotes(applicationData.extraNotes)
  setNewJobTitle(applicationData.Job_title)
  setNewStatus(applicationData.status)
}, [applicationData])


  // set the title of the page
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `Application For "${application}"`, // Set or update the title here
      
    });
  }, [navigation]);

  // sets on exit and on enter hooks
  /*
   React.useCallback(() => {
      return () => {
        // Cleanup code when the screen loses focus
        writeData();
      };
    }, [])
  );useFocusEffect(
  */
   

  

  return (
    <SafeAreaProvider style = {styles.mainDiv}>
      
      <SafeAreaView style = {[styles.div]}>
        <Text style = {[styles.text, styles.title]}>Job Information</Text>
        <Text style = {styles.text}>Application for company : "{applicationData.company}"</Text>
        <Text style = {styles.text}>Application Status : {applicationData.status}</Text>
        <Text style = {styles.text}>Position : {applicationData.Job_title}</Text>
        <Text style = {styles.text}>Details : {applicationData.extraNotes}</Text>
        <TextInput 
        placeholder="Company" 
        style={styles.inputStyle} 
        value= {newExtraNotes}
        multiline = {true}
        numberOfLines={5}
        onChange={setNewExtraNotes}
        />
      </SafeAreaView>

      <SafeAreaView style = {[styles.div]}>
        <TouchableOpacity style={styles.submitButton} onPress={writeData}>
          <Text style={styles.submitButtonText}>Save Changes</Text>
        </TouchableOpacity>
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
  },
  inputStyle: {
    marginTop: 5,
    width: 300,
    height: 100,
    paddingHorizontal: 10,
    borderRadius: 2,
    backgroundColor: 'white',
    textAlignVertical:"top"
  },
  submitButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
