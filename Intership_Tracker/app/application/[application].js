import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { StyleSheet, Text, FlatList, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { readFile, saveListToDatabase } from '@/scripts/database';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const router = useRouter();
  const { application } = useLocalSearchParams();

  const [index, setIndex] = useState("-1");
  const [newCompany, setNewCompany] = useState("");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newExtraNotes, setNewExtraNotes] = useState("");
  const [dropDownVis, setDropDownVis] = useState(false);

  const statusData = [
    { label: 'PENDING', value: 'PENDING' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
    { label: 'INTERVIEW', value: 'INTERVIEW' },
  ];

  // IMPORT DATA FROM Database
  async function databaseHandler() {
    let databaseOutput = await readFile();
    let applicationList = application.split(" , ");
   
    for (let i = 0; i < databaseOutput.apps.length; i++) {
      const e = databaseOutput.apps[i];
      if (e.company === applicationList[0] && e.Job_title === applicationList[1] && e.status === applicationList[2]) {
        setNewCompany(e.company);
        setNewExtraNotes(e.extraNotes);
        setNewJobTitle(e.Job_title);
        setNewStatus(e.status);
        setIndex(i);
      }
    }
  }

  async function writeData(event) {
    try {
      let databaseOutput = await readFile();
      const newData = databaseOutput.apps[index];
      newData.company = newCompany;
      newData.Job_title = newJobTitle;
      newData.status = newStatus;
      newData.extraNotes = newExtraNotes;
      await saveListToDatabase(databaseOutput.apps);
      router.navigate("./" + newCompany);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }

  // set the title of the page
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `Application For "${application}"`, // Set or update the title here
      headerTintColor: "white",
      headerStyle: { backgroundColor: "black" },
    });
  }, [navigation]);

  // sets on exit and on enter hooks
  useFocusEffect(
    React.useCallback(() => {
      databaseHandler();
      return () => {};
    }, [])
  );

  return (
    <SafeAreaProvider style={styles.mainDiv}>
      <KeyboardAvoidingView
        style={styles.mainDiv}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust for iOS and Android
      >
        <SafeAreaView style={styles.innerDiv}>
          {/* TITLE CARD */}
          <Text style={[styles.text, styles.title]}>Edit Application Information</Text>

          {/* COMPANY */}
          <SafeAreaView style={styles.inputContainer}>
            <Text style={styles.text}>Company Name</Text>
            <TextInput
              placeholder="Enter Company"
              style={styles.inputStyle}
              value={newCompany}
              onChangeText={setNewCompany}
              placeholderTextColor="#D3D3D3" // Light gray placeholder
            />
          </SafeAreaView>

          {/* Status */}
          <SafeAreaView style={styles.inputContainer}>
            <Text style={styles.text}>Application Status</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setDropDownVis(!dropDownVis)} // Toggle dropdown visibility
            >
              <Text style={styles.dropdownButtonText}>Status: {newStatus || 'Select Status'}</Text>
            </TouchableOpacity>
            {dropDownVis && (
              <FlatList
                data={statusData}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setNewStatus(item.value);
                      setDropDownVis(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </SafeAreaView>

          {/* Job Title */}
          <SafeAreaView style={styles.inputContainer}>
            <Text style={styles.text}>Job Title</Text>
            <TextInput
              placeholder="Enter Job Title"
              style={styles.inputStyle}
              value={newJobTitle}
              onChangeText={setNewJobTitle}
              placeholderTextColor="#D3D3D3" // Light gray placeholder
            />
          </SafeAreaView>

          {/* Extra Notes */}
          <SafeAreaView style={styles.inputContainer}>
            <Text style={styles.text}>Extra Notes</Text>
            {/* Using ScrollView for the TextInput to allow for scrolling when text is long */}
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.textAreaContainer}>
              <TextInput
                placeholder="Enter Extra Notes"
                style={styles.textAreaStyle}
                value={newExtraNotes}
                multiline={true}
                onChangeText={setNewExtraNotes}
                placeholderTextColor="#D3D3D3" // Light gray placeholder
              />
            </ScrollView>
          </SafeAreaView>

          {/* Save Button */}
          <SafeAreaView style={styles.submitContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={writeData}>
              <Text style={styles.submitButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainDiv: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#121212',
    flex: 1,
  },
  innerDiv: {
    backgroundColor: '#1e1e1e',
    margin: 20,
    padding: 20,
    width: 350,
    borderRadius: 15,
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputStyle: {
    width: '100%',
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 16,
  },
  textAreaContainer: {
    paddingBottom: 20, // Adjust this padding to ensure the last part is visible
  },
  textAreaStyle: {
    width: '100%',
    minHeight: 100,
    maxHeight: 150,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  dropdownButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#444',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: 'white',
  },
  dropdownItem: {
    padding: 15,
    backgroundColor: '#444',
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'white',
  },
  submitContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    backgroundColor: '#ff6347',
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  },
});