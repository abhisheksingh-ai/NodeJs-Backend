const fs = require("fs");

fs.readFile('./input.txt', 'utf-8', (err, data) => {
    //Error handling
    if (err) throw err;

    //Task 1: Reading the lowercase file

    //method 1
    const upperCaseData = data.toUpperCase();

    // //method 2
    // const newUppercaseData = data.split('\n').map((str) => str.toUpperCase()).join('\n');
    // console.log(newUppercaseData);

    // Task 2: writing in the file after uppercase conversion

    fs.writeFile('./output.txt', upperCaseData, (err, resutl) => {
        if (err) throw err
        console.log("Upper case conversion successfull");
    })

    //Task 3: counting the number of words
    
    const wordCount = data.split(/\s+/);
    //removing empty strings
    wordCount.filter((word) => word.length > 0);
    console.log("Total words" , wordCount.length);
})