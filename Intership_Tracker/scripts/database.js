import * as FileSystem from "expo-file-system";

let counter = 0;



export async function createDatabase() {
    const fileUri = FileSystem.documentDirectory + 'database.json';
    const content = '{"apps" : []}'
  
    try {
      await FileSystem.writeAsStringAsync(fileUri, content);
      console.log('File written successfully!');
    } catch (error) {
      console.error('Error writing file:', error);
    }
  
  }
  
export async function checkFilesSystem(){
    try {
      const directoryUri = FileSystem.documentDirectory;
      const fileList = await FileSystem.readDirectoryAsync(directoryUri);
      return (await fileList.indexOf("database.json") != -1);
    } catch (error) {
      console.error('Error reading directory:', error);
      return false;
    }
    return false;
  }

export async function setUpDatabase(){
  try{
    const fileUri = FileSystem.documentDirectory + 'database.json';
    const fileData = await FileSystem.readAsStringAsync(fileUri);
    const jsonData = JSON.parse(fileData);
  } catch (error){
    console.error('Error reading file:', error);
  }
}
  
export async function readFile(){
    try {
      const fileUri = FileSystem.documentDirectory + 'database.json';
      const content = await FileSystem.readAsStringAsync(fileUri);
      const jsonFormat = JSON.parse(content)
      //console.log('File content:', jsonFormat);
      return jsonFormat;
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
}

export async function writeToDatabase(input){
    console.log("New input " + input)
    try {
        const fileUri = FileSystem.documentDirectory + 'database.json';
        const content = await FileSystem.readAsStringAsync(fileUri);
        const jsonFormat = JSON.parse(content)
        jsonFormat.apps.push(input);
        console.log('File content:', jsonFormat);
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(jsonFormat));
      } catch (error) {
        console.error('Error reading file:', error);
        return null;
      }
}
export async function saveListToDatabase(list){
  try {
    const fileUri = FileSystem.documentDirectory + 'database.json';
    console.log('File content:', {"apps" : list});
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify({"apps" : list}));
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

export async function writeExampleDatabase(){

  let content = {
    apps: []
  };
  content.apps.push(applicationFactory("Roblox", "Scammer", "Applied", "nothing"))
  content.apps.push(applicationFactory("John Deer", "Engineer", "Note Applied", "must apply by the 25th"))
  content = JSON.stringify(content);
  console.log(content);

  const fileUri = FileSystem.documentDirectory + 'database.json';
  

  try {
    await FileSystem.writeAsStringAsync(fileUri, content);
    console.log('File written successfully!');
  } catch (error) {
    console.error('Error writing file:', error);
  }
}

export function applicationFactory(company, title, status, extraNotes){
  return {
    "company" : company,
    "Job_title" : title,
    "status" : status,
    "extraNotes" : extraNotes
  }
}