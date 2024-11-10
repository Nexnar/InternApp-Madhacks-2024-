import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';



import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function NewAppPage() {
  // get page param -> name the page
  const {id} = useLocalSearchParams();

  // general company information
  const [company, changeCompany] = useState("...");
  const [jobLocation, setJobLocation] = useState("...");
  const [jobDescription, setJobDescription] = useState("...");

  // application data
  const [appStatus, setAppStatus] = useState("...");
  const [applicationDate, setApplicationDate] = useState("...");

  // recruiter information
  const [recruiterName, setRecruiterName] = useState("...");
  const [recruiterEmail, setRecruiterEmail] = useState("...");



  // set the title of the page
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `Add Application`, // Set or update the title here
    });
  }, [navigation]);

  // sets on exit and on enter hooks
  useFocusEffect(
    React.useCallback(() => {

      return () => {
        // Cleanup code when the screen loses focus
        Alert.alert(
          "Saving Data!", // Title of the alert
          `company : ${company} \napplication date : ${applicationDate}\napplication status : ${appStatus}`, // Message
        );
      };
    }, [])
  );

  

  return (
    <SafeAreaProvider>
        {/* General Job information*/}
        <SafeAreaView>
            <Text style = {[styles.text, styles.title]}>Job Information</Text>
            <SafeAreaView>
                <Text style = {styles.text}>Enter Company Here</Text>
                <TextInput style = {[styles.text, styles.enterField]}>{company}</TextInput>
            </SafeAreaView>
            <SafeAreaView>
                <Text style = {styles.text}>Job Description</Text>
                <TextInput style = {[styles.text, styles.enterField]}>{jobDescription}</TextInput>
            </SafeAreaView>
            <SafeAreaView>
                <Text style = {styles.text}>Job Location</Text>
                <TextInput style = {[styles.text, styles.enterField]}>{jobLocation}</TextInput>
            </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView>
            <Text style = {[styles.text, styles.title]}>Application information</Text>
            <SafeAreaView>
                <Text style = {styles.text}>Enter Application Status Here</Text>
                <TextInput style = {[styles.text, styles.enterField]}>{appStatus}</TextInput>
            </SafeAreaView>
            <SafeAreaView>
                <Text style = {styles.text}>Enter Application Date Here</Text>
                <TextInput style = {[styles.text, styles.enterField]}>{appStatus}</TextInput>
            </SafeAreaView>
            <SafeAreaView>
                <Text style = {styles.text}>Enter Interview Date Here</Text>
                <TextInput style = {[styles.text, styles.enterField]}>{company}</TextInput>
            </SafeAreaView>
            
        </SafeAreaView>

        <SafeAreaView>
            <Text style = {[styles.text, styles.title]}>Recruiter Information</Text>
            <SafeAreaView>
                <Text style = {styles.text}>Recruiter Name</Text>
                <TextInput style = {[styles.text, styles.enterField]}>{company}</TextInput>
            </SafeAreaView>
            <SafeAreaView>
                <Text style = {styles.text}>Recruiter Email</Text>
                <TextInput style = {[styles.text, styles.enterField]}>{appStatus}</TextInput>
            </SafeAreaView>
            <SafeAreaView>
                <Text style = {styles.text}>Other information</Text>
                <TextInput style = {[styles.text, styles.enterField]}>{applicationDate}</TextInput>
            </SafeAreaView>
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
  enterField:{
    color: "black",
    backgroundColor: "white"
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