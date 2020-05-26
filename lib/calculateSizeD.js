//require node module
const {
    execSync
} = require('child_process');


const calculateSizeD = itemFullStaticPath => {

    //escape spaces , tabs, etc
    const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g, '\ ');

    const commandOutput = execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString();

    console.log(commandOutput);

    //remove spaces , tabs ,etc
    let filesize = commandOutput.replace(/\s/g, '');
    console.log("filesize : ", filesize);
    //split filesize using the '/' seperator
    filesize = filesize.split('C');

    //human size is the first item of the array
    //  filesize = filesize[0];
    filesize = filesize[0];

    console.log("filesize : ", filesize);

    //unit
    let filesizeUnit = filesize.replace(/\d|\./g, '');
    console.log("filesize unit : ", filesizeUnit[0]);

    //size number
    const filesizeNumber = parseFloat(filesize.replace(/[a-z]/i, ''));
    console.log("filesize num: ", filesizeNumber);

    const units = "BKMGT";


    //Note: Depending upon the system we have to *  1024 or 1000
    //B 10B -> 10 bytes (1000^0)
    //K 10B -> 10*1000 bytes (1000^1)
    //M 10B -> 10*1000*1000 bytes (1000^2)
    //G 10B -> 10*1000*1000*1000 bytes (1000^3)
    //T 10B -> 10*1000*1000*1000*1000 bytes (1000^4)

    const filesizeBytes = filesizeNumber * Math.pow(1000, units.indexOf(filesizeUnit));

    console.log("filesize bytes : ", filesizeBytes);
    console.log("***************", filesize);
    return [filesize, filesizeBytes];
};

module.exports = calculateSizeD;
