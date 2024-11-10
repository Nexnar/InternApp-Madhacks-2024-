
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { StyleSheet, Text, FlatList, TextInput, Alert, TouchableOpacity} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { readFile, saveListToDatabase } from '@/scripts/database';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function TabTwoScreen() {
  // get page param -> name the page
  const router = useRouter();
  console.log(useLocalSearchParams())
  const {application} = useLocalSearchParams();
  //const [applicationData, setApplicationData] = useState("test");

  const [index, setIndex] = useState("-1")
  const [newCompany, setNewCompany] = useState("");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newExtraNotes, setNewExtraNotes] = useState("");
  const [dropDownVis, setDropDownVis] = useState(false);

  const statusData = [
    { label: 'PENDING', value: 'PENDING' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
    { label: 'INTERVIEW', value: 'INTERVIEW'},
  ];


   // IMPORT DATA FROM Database
   async function databaseHandler(){
    let databaseOutput = await readFile() 


    for(let i = 0; i < databaseOutput.apps.length; i++){
      const e = databaseOutput.apps[i];
      if( e.company === application){
        setNewCompany(e.company)
        setNewExtraNotes(e.extraNotes)
        setNewJobTitle(e.Job_title)
        setNewStatus(e.status)
        setIndex(i)
      }
    }

  }

  async function writeData(event){
    //event.persist()
    try{
      let databaseOutput = await readFile() 
      const newData = databaseOutput.apps[index];
      newData.company = newCompany;
      newData.Job_title = newJobTitle;
      newData.status = newStatus;
      newData.extraNotes = newExtraNotes;
      await saveListToDatabase(databaseOutput.apps);
      router.navigate("./" + newCompany)
    } catch (error){
      console.error('Error reading file:', error);
    }
  }


  // 

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
    databaseHandler();
      return () => {
      };
    }, [])
  );
   

  

  return (
    <SafeAreaProvider style = {styles.mainDiv}>
      {/* TITLE CARD */}
      <Text style = {[styles.text, styles.title]}>Application Information</Text>
      
      {/* COMPANY */}
      <SafeAreaView style = {[styles.div]}>
        <Text style = {styles.text}>Company Name"</Text>
        <TextInput 
        placeholder="Company" 
        style={styles.smallInputStyle} 
        value= {newCompany}
        multiline = {false}
        onChangeText={setNewCompany}
        />
      </SafeAreaView>

      {/* Status */}
      <SafeAreaView style = {[styles.div]}>
        <Text style = {styles.text}>Application Status</Text>
        <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropDownVis(!dropDownVis)} // Toggle dropdown visibility
      >
        <Text style={styles.dropdownButtonText}>Status: {newStatus}</Text>
      </TouchableOpacity>
        {
          dropDownVis && (
            <FlatList
          data={statusData}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => setNewStatus(item.value)}
            >
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
          )
        }
      </SafeAreaView>
      <SafeAreaView style = {[styles.div]}>
        <Text style = {styles.text}>Job Title</Text>
        <TextInput 
        placeholder="job title" 
        style={styles.smallInputStyle} 
        value= {newJobTitle}
        multiline = {false}
        onChangeText={newJobTitle}
        />
      </SafeAreaView>
      <SafeAreaView style = {[styles.div]}>
        <Text style = {styles.text}>Extra Notes:</Text>
        <TextInput 
        placeholder="extraNotes" 
        style={styles.inputStyle} 
        value= {newExtraNotes}
        multiline = {true}
        numberOfLines={5}
        onChangeText={setNewExtraNotes}
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
  smallInputStyle: {
    marginTop: 5,
    width: 300,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 2,
    backgroundColor: 'white',
    textAlignVertical:"center"
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

  dropdownButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 18,
    color: 'white',
  },
  // Dropdown item style
  dropdownItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: 300,
  },
  dropdownItemText: {
    fontSize: 18,
    color: '#356859',
  },
});