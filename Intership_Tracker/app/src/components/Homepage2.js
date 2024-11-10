import React, { useState } from 'react';
import { useEffect } from 'react';
import { writeExampleDatabase, readFile } from '@/scripts/database';

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Task from './Task'; // Ensure this is the correct path
import { useRouter } from 'expo-router';

export default function Homepage({ navigateToNewPage }) {
  const router = useRouter();
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  // IMPORT DATA FROM Database
  async function databaseHandler(){
    //await writeExampleDatabase()
    let databaseOutput = await readFile() 
    let apps = [];


    databaseOutput.apps.forEach((e) => {
      console.log("for looping each title " + e.company)
      apps.push(e.company);
    })

    setTaskItems(apps)
  }
  // use effect to only run once
  useEffect(() => {
    databaseHandler();
  }, [])

  // Handle adding a task to the list
  const handleAddTask = () => {
    if (task.trim()) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      {/* TASK LIST */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Applications</Text>
          <View style={styles.items}>
            {/* Loop through the tasks and render each one */}
            {taskItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => {router.navigate(`/application/${item}`, {id: item})}}>
                <Task text={item} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Input and add task area */}
      <KeyboardAvoidingView behavior="padding" style={styles.writeTaskWrapper}>
        {/* TEXT INPUT*/}
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        {/* TEXT INPUT*/}
        <TouchableOpacity onPress={navigateToNewPage}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020', // Dark background to match your app theme
  },
  scrollContainer: {
    flexGrow: 1, // Ensures content is scrollable
    paddingBottom: 80, // Prevents the input from being overlapped by the keyboard
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Verdana',
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20, // Fix the bottom positioning
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 300,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
  },
});
