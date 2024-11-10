import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const { id } = useLocalSearchParams();  // Get page param (id)
  const navigation = useNavigation();  // For navigation options

  useEffect(() => {
    navigation.setOptions({
      title: `Link Application`, // Set the title for the screen
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when the screen is focused
      return () => {
        // Cleanup code when screen loses focus
      };
    }, [])
  );

  // State for user input and link processing
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle submit when user presses button
  const handleSubmit = async () => {
    if (text === '') {
      Alert.alert('Error', 'Please enter a link', [{ text: 'OK' }]);
      return;
    }

    setLoading(true); // Set loading state to true while fetching

    try {
      await RequestLinkData(text);
    } catch (error) {
      console.error('Error processing link:', error);
      Alert.alert('Error', 'Failed to process the link. Please try again.', [{ text: 'OK' }]);
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <SafeAreaProvider style={styles.mainDiv}>
      <SafeAreaView style={[styles.div]}>
        <Text style={[styles.text, styles.title]}>Add Application by link:</Text>

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(newText) => setText(newText)}
          placeholder="Paste Link Here"
        />
      </SafeAreaView>

      <SafeAreaView style={[styles.div]}>
        <Button
          title={loading ? 'Processing...' : 'Submit'}
          onPress={handleSubmit}
          disabled={loading}  // Disable button while processing
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Function to request link data and extract job details
async function RequestLinkData(link) {
  console.log('Link provided:', link);

  // Check if the URL is from a supported domain
  if (!link.startsWith('https://www.google.com/about/careers/applications/jobs/results/')) {
    Alert.alert('Error', 'Job not detected. Please enter a link from a supported job board', [{ text: 'OK' }]);
    return;
  }

  try {
    // Fetch the HTML response of the job link
    const response = await fetch(link);
    const html = await response.text();

    // Process HTML to extract job information
    const jobTitle = processHTML(html, 'Google');
    if (jobTitle) {
      Alert.alert('Job Detected', `Job Title: ${jobTitle}`, [{ text: 'OK' }]);
    } else {
      Alert.alert('Error', 'Job title could not be extracted. Please try another link.', [{ text: 'OK' }]);
    }
  } catch (error) {
    console.error('Error fetching the link:', error);
    Alert.alert('Error', 'Failed to fetch the link. Please check your internet connection or the URL.', [{ text: 'OK' }]);
  }
}

// Function to process HTML response and extract job title (Google example)
function processHTML(srcHTML, jobBoard) {
  if (jobBoard === 'Google') {
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = srcHTML.match(titleRegex);
    return match ? match[1].trim() : null;
  }
  return null;
}

const styles = StyleSheet.create({
  div: {
    textAlign: 'left',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  mainDiv: {
    flex: 1,
  },
  titleDiv: {
    flex: 1,
    backgroundColor: 'purple',
    color: 'white',
  },
  bodyDiv: {
    flex: 11,
  },
  text: {
    color: 'black',
  },
  title: {
    fontSize: 30,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    fontSize: 16,
  },
});
