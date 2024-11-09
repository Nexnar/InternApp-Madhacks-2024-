
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { useEffect } from 'react';



import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {

  const {id} = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `Application For "${id}"`, // Set or update the title here
    });
  }, [navigation]);

  return (
    <SafeAreaProvider style = {styles.mainDiv}>
      <SafeAreaView style = {[styles.bodyDiv, styles.div]}>
        <Text style = {styles.text}>This application is by {id}</Text>
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
