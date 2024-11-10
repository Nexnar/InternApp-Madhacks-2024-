import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Homepage from './src/components/Homepage2'; // Ensure this is the correct path
import NewApplication from './src/components/newApplication'; // Import the new application page

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home'); // Tracks which page is being shown

  // Function to switch to a new page (when a task is pressed)
  const navigateToNewPage = () => {
    setCurrentPage('NewPage');
  };

  // Navigate back to Homepage
  const navigateBack = () => {
    setCurrentPage('Home');
  };

  return (
    <View style={styles.container}>
      {currentPage === 'Home' ? (
        <Homepage navigateToNewPage={navigateToNewPage} />
      ) : currentPage === 'NewPage' ? (
        <NewApplication navigateBack={navigateBack} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020', // Consistent background color
  },
});
