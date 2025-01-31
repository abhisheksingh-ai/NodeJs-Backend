function reverse(str) {
    return str
        .split('')
        .reverse()
        .join('');
}

function capitalizedFirstLetter(str) {
    return str
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    return str
        .toLowerCase()
        .split('')
        .filter((char) => vowels.includes(char))
        .length;
}

module.exports = {
    reverse,
    capitalizedFirstLetter,
    countVowels,
}