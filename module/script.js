const { reverse, capitalizedFirstLetter, countVowels } = require('./operations.js');

//reverse a string 
const str = "abhishek"
console.log(reverse(str)); //kehsihba

//Capitalized first letter
const newstr = "hello World"
console.log(capitalizedFirstLetter(newstr)) // "hello World"

//Count vowel
const newstr2 = "abhishekSINGH"
console.log(countVowels(newstr2)) //4