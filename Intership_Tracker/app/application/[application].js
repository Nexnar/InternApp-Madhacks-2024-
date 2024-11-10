
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';



import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function TabTwoScreen() {
  // get page param -> name the page
  const {id} = useLocalSearchParams();

  // set the title of the page
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `Application For "${id}"`, // Set or update the title here
      
    });
  }, [navigation]);

  // sets on exit and on enter hooks
  useFocusEffect(
    React.useCallback(() => {
      // Code to run when the screen is focused
      Alert.alert(
        "Loading Data!", // Title of the alert
        "This is an alert message", // Message
      );

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
        <Text style = {[styles.text, styles.title]}>General Data</Text>
        <Text style = {styles.text}>Application for company : "{id}"</Text>
        <Text style = {styles.text}>Application Status : </Text>
        <Text style = {styles.text}>(As of)</Text>
      </SafeAreaView>
      <SafeAreaView style = {[styles.div]}>
        <Text style = {[styles.text, styles.title]}>Job Information</Text>
        <Text style = {styles.text}>Position : [ ]</Text>
        <Text style = {styles.text}>Recruiter Information: [ ]</Text>
        <Text style = {styles.text}>Interview Date: [ ]</Text>
        <Text style = {styles.text}>Interview Location: [ ]</Text>
        <Text style = {styles.text}>Details</Text>
        <TextInput style= {{backgroundColor:"white"}}>This is a test</TextInput>

        <Text style = {styles.text}>Link to application Portal</Text>
        <Text style = {styles.text}>Attach file</Text>
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
