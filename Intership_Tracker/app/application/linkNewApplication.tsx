import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Alert, Button} from 'react-native';
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
      title: `Link Application`, // Set or update the title here
      
    });
  }, [navigation]);

  // sets on exit and on enter hooks
  useFocusEffect(
    React.useCallback(() => {
      // Code to run when the screen is focused
      

      return () => {
        // Cleanup code when the screen loses focus
        
      };
    }, [])
  );

  
  // add variable code here?

  const [text, setText] = React.useState('');


  return (
    <SafeAreaProvider style = {styles.mainDiv}>
      
      <SafeAreaView style = {[styles.div]}>

        <Text style = {[styles.text, styles.title]}>Add Application by link:</Text>
        
        <TextInput 
          style= {{backgroundColor:"white"}}
          value={text}
          onChangeText={(newText) => setText(newText)}
          placeholder=' Paste Link Here '
        />
        
      </SafeAreaView>
      <SafeAreaView style = {[styles.div]}>

        <Button title="Press me" onPress={() => {
            
          if (text === '') {
            Alert.alert('Error', 'Please enter a link', [{text: 'OK'}]);
            return;
          } else { //if text is not empty
            RequestLinkData(text);
          }
        }} />
        
      </SafeAreaView>


    </SafeAreaProvider>

    
  );
}

function RequestLinkData(link: string) {
  console.log('Link provided: ' + link);

  let jobBoard = '';

  let jobTitle = '';
  let company = '';
  let status = '';

  //check if url is from supported domain
  if (link.startsWith("https://www.google.com/about/careers/applications/jobs/results/")) {
    jobBoard = "Google";
  } else {
    Alert.alert('Error', 'Job not detected. Please enter a link from a supported job board', [{text: 'OK'}]);
    return;
  }

  let htmlResponse = '';
  try {
    fetch(link)
      .then(response => response.text()) // get the response as text (HTML)
      .then(html => {
        //console.log(html); // log the HTML Data
        console.log("logging html..");
        htmlResponse = html;
        console.log("Job title: "+processHTML(htmlResponse, jobBoard));
      });
  } catch (error) {
    console.error("err: " + error);
  }
  
  
}

function processHTML(srcHTML: string, jobBoard: string) {
  if (jobBoard == "Google") {
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = srcHTML.match(titleRegex);
    const pJobTitle = (match && match[1].trim()) ?? '';

    const pEmployerKeyHTML1 = "class=RP7SMd";
    const position = srcHTML.search(pEmployerKeyHTML1);
    console.log(position);
    return pJobTitle
  }
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
    color: "black"
  },
  title:{
    fontSize: 30
  }
});
