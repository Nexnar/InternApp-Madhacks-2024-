import * as FileSystem from "expo-file-system";


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
  
export async function readFile(){
    try {
      const fileUri = FileSystem.documentDirectory + 'database.json';
      const content = await FileSystem.readAsStringAsync(fileUri);
      const jsonFormat = JSON.parse(content)
      console.log('File content:', jsonFormat);
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