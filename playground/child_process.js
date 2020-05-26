//To Calculate the Folder Size using the Child Process module .

const {execSync} = require('child_process');

try{
    const result = execSync
    (`du -sh "/c/Users/Lenovo/Desktop/WEB DEVELOPMENT COURSE/WebsitesProjects/12.OnlineFileExplorerApp/playground"`).toString() ;
        console.log(result);
}catch(err){
    console.log(`Error: ${err}`);
}