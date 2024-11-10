import React, { useEffect, useState } from 'react';
import { applicationFactory, writeToDatabase } from '@/scripts/database';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Alert, Linking } from 'react-native';

const NewApplication = ({ navigateBack }) => {
  const [status, setStatus] = useState('PENDING'); 
  const [showDropdown, setShowDropdown] = useState(false); // State to control visibility of dropdown
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [userLink, setUserLink] = useState('');

  const statusData = [
    { label: 'PENDING', value: 'PENDING' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
    { label: 'INTERVIEW', value: 'INTERVIEW'},
  ];

  const handleStatusSelect = (value) => {
    setStatus(value);      
    setShowDropdown(false);  // Close dropdown after selection
  };

  async function handleWritingData(){
    await writeToDatabase(applicationFactory(company, jobTitle, status));
    navigateBack();
  }

  const handleSubmit = () => {
    if (jobTitle === '' || company === '' || status === '') {
      Alert.alert('Error', 'Please fill out all fields', [{text: 'OK'}]);
    } else {
      handleWritingData();
    }
  };

  return (
    <View style={styles.container}>
      {/* Go Back Button at the top-left corner */}
      <TouchableOpacity onPress={navigateBack} style={styles.goBackButton}>
        <Text style={styles.goBackText}>{'X'}</Text>
      </TouchableOpacity>

      <Text style={styles.formLabel}>NEW APPLICATION</Text>

      {/* Form Inputs */}
      <TextInput 
        placeholder="Company Name" 
        style={styles.inputStyle} 
        value={company}
        onChangeText={setCompany} // Track the company input
        placeholderTextColor="gray" // Light gray placeholder
      />
      <TextInput 
        secureTextEntry={false} 
        placeholder="Job Title" 
        style={styles.inputStyle} 
        value={jobTitle}
        onChangeText={setJobTitle} // Track the job title input
        placeholderTextColor="gray" // Light gray placeholder
      />

      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
      >
        <Text style={styles.dropdownButtonText}>Status: {status}</Text>
      </TouchableOpacity>

      {/* Show Dropdown if visible */}
      {showDropdown && (
        <FlatList
          data={statusData}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleStatusSelect(item.value)}
            >
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Link Input Field */}
      <TextInput 
        placeholder="Job Link (Optional)" 
        style={styles.inputStyle} 
        value={userLink}
        onChangeText={setUserLink} // Track the link input
        placeholderTextColor="gray" // Light gray placeholder
      />

      {/* Autofill Button */}
      <TouchableOpacity style={styles.submitButtonAlt} onPress={() => {
        console.log(userLink); 
        RequestLinkData(userLink, setJobTitle, setCompany);
        setUserLink('');
      }}>
        <Text style={styles.submitButtonText}>Autofill with Link</Text>
      </TouchableOpacity>

      {/* Approved Sites Link */}
      <TouchableOpacity onPress={approvedSites}>
        <Text style={styles.hprlink}>(view compatible websites)</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

function approvedSites() {
  Alert.alert(
    'Working Sites',
    'Google.\n\nDiversityJobs.\n\nSimplyHired.',
    [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ],
    { cancelable: false }
  );
}

function RequestLinkData(link, setJobTitle, setCompany) {
  let jobBoard = '';

  let jobTitle = '';
  let company = '';
  let status = '';

  if (link == "https://www.google.com/about/careers/applications/jobs/results/") {
    Alert.alert('Error', 'Search page not supported, please submit a direct listing link from Google', [{text: 'OK'}]);
    return;
  } else if (link.startsWith("https://www.google.com/about/careers/applications/jobs/results/")) {
    jobBoard = "Google";
    company = "Google";
  } else if (link.startsWith("https://www.simplyhired.com/search?")) {
    Alert.alert('Error', 'Search page not supported, please submit a direct listing link from SimplyHired', [{text: 'OK'}]);
    return;
  } else if (link.startsWith("https://www.simplyhired.com/job/")) {
    jobBoard = "SimplyHired";
    company = "n/a"; 
  } else if (link.startsWith("https://diversityjobs.com/career/")) {
    jobBoard = "DiversityJobs";
  } else {
    Alert.alert('Error', 'Job not detected. Please enter a link from a supported job board', [{text: 'OK'}]);
    return;
  }

  let htmlResponse = '';
  try {
    fetch(link)
      .then(response => response.text()) 
      .then(html => {
        htmlResponse = html;
        const jobTitle = processHTMLtitle(htmlResponse, jobBoard);
        const company = processHTMLcompany(htmlResponse, jobBoard);
        setJobTitle(jobTitle);
        setCompany(company);
      });
  } catch (error) {
    console.error("err: " + error);
  }
}

function processHTMLtitle(srcHTML, jobBoard) {
  if (jobBoard == "Google") {
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = srcHTML.match(titleRegex);
    const pJobTitle = (match && match[1].trim()) ?? '';
    return pJobTitle;
  } else if (jobBoard == "SimplyHired") {
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = srcHTML.match(titleRegex);
    const pJobTitle = (match && match[1].trim()) ?? '';
    const dashCharIndex = pJobTitle.lastIndexOf('-');
    if (dashCharIndex === -1) {
      return '';
    }
    return pJobTitle.substring(0, dashCharIndex).trim();
  } else if (jobBoard == "DiversityJobs") {
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = srcHTML.match(titleRegex);
    const pJobTitle = (match && match[1].trim()) ?? '';
    const dashCharIndex = pJobTitle.lastIndexOf(' job in ');
    if (dashCharIndex === -1) {
      return '';
    }
    return pJobTitle.substring(0, dashCharIndex).trim();
  }
}

function processHTMLcompany(srcHTML, jobBoard) {
  if (jobBoard == "Google") {
    return "Google";
  } else if (jobBoard == "SimplyHired") {
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = srcHTML.match(titleRegex);
    const pCompany = (match && match[1].trim()) ?? '';
    const dashCharIndex = pCompany.lastIndexOf('-');
    const barCharIndex = pCompany.lastIndexOf('|');
    if (dashCharIndex === -1 || barCharIndex === -1) {
      return '';
    }
    const title = pCompany.substring(dashCharIndex + 1, barCharIndex).trim();
    return title;
  } else if (jobBoard == "DiversityJobs") {
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = srcHTML.match(titleRegex);
    const pCompany = (match && match[1].trim()) ?? '';
    const dashCharIndex = pCompany.lastIndexOf(' at ');
    const barCharIndex = pCompany.lastIndexOf(' | ');
    if (dashCharIndex === -1 || barCharIndex === -1) {
      return '';
    }
    const title = pCompany.substring(dashCharIndex + 4, barCharIndex).trim();
    return title;
  }
}

export default NewApplication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background color for the screen
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formLabel: {
    fontSize: 30,
    fontFamily: 'Roboto',
    color: '#fff',
    marginTop: 40,
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  dropdownButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#484848',
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 18,
    color: 'white',
  },
  dropdownItem: {
    padding: 15,
    backgroundColor: '#525252',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: 300,
  },
  dropdownItemText: {
    fontSize: 18,
    color: 'white',
  },
  goBackButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'black',
    borderRadius: 40,
    padding: 10,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackText: {
    fontSize: 18,
    color: '#fff',
  },
  hprlink: {
    color: 'white',
    paddingTop: 10
  },
  submitButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  submitButtonAlt: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#004dcf',
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  }
});
