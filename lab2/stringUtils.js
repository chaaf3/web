const { isEqual } = require("./arrayUtils");

function camelCase(str) {
    if (str === undefined) {
        throw new Error("bad inputs");
    }
    if (typeof(str) !== "string") {
        throw new Error("bad inputs");
    }
    if (str.length === 0) {
        throw new Error("bad inputs");
    }
    if (str.length == 1 && str.charAt(0) == ' ') {
        throw new Error("bad inputs");
    }
    str = str.toLowerCase();
    let modify = Array.from(str);
    while (modify[0] == ' ') {
        modify.splice(i, 1);
    }
    if (modify.length == 0) {
        throw new Error("bad inputs");
    }
    modify[0] = modify[0].toLowerCase()
    for (let i = 0; i < modify.length; i++) {
        if (modify[i] == ' ') {
            modify.splice(i, 1);
            if (modify[i] !== ' ') {
                modify[i] = modify[i].toUpperCase();
            }
        }
        else {
            modify[i].toLowerCase();
        }
    }
    return modify.join('');
}

// console.log(camelCase('my function rocks')); // Returns: "myFunctionRocks"
// console.log(camelCase('FOO BAR')); // Returns: "fooBar"
// console.log(camelCase("How now brown cow")); // Returns: "howNowBrownCow"
// console.log(camelCase()); // Throws Error
// console.log(camelCase('')); // Throws Error
// console.log(camelCase(123)); // Throws Error
// console.log(camelCase(["Hello", "World"])); // Throws Error


function replaceChar(str) {
    if (str === undefined) {
        throw new Error("bad inputs");
    }
    if (typeof(str) !== "string") {
        throw new Error("bad inputs");
    }
    if (str.length === 0) {
        throw new Error("bad inputs");
    }
    if (str.length == 1) {
        return str;
    }
    let modify = Array.from(str);
    while (modify[0] == ' ') {
        modify.splice(i, 1);
    }
    if (modify.length == 0) {
        throw new Error("bad inputs");
    }
    let modify2 = Array.from(str);
    let replacerlower = str.charAt(0).toLowerCase();
    let replacerupper = str.charAt(0).toUpperCase();
    let alternate = '*';
    for (let i = 1; i < str.length; i++) {
        if (str.charAt(i) == replacerupper || str.charAt(i) == replacerlower) {
            modify2[i] = alternate;
            if (alternate == '*') {
                alternate = '$';
            }
            else {
                alternate = '*';
            }
        }
    }
    return modify2.join('');
}
// console.log(replaceChar("Daddy")); // Returns: "Da*$y"
// console.log(replaceChar("Mommy")); // Returns: "Mo*$y" 
// console.log(replaceChar("Hello, How are you? I hope you are well")); // Returns: "Hello, *ow are you? I $ope you are well"
// console.log(replaceChar("babbbbble")); // Returns: "ba*$*$*le"
// console.log(replaceChar("")); // Throws Error
// console.log(replaceChar(123)); // Throws Error

function mashUp(str1, str2) {
    if (str1 === undefined || str2 === undefined) {
        throw new Error("bad inputs");
    }
    if (typeof(str1) !== "string" || typeof(str2) !== "string") {
        throw new Error("bad inputs");
    }
    if (str1.length < 2 || str2.length < 2) {
        throw new Error("bad inputs");
    }
    let modify = Array.from(str1);
    while (modify[0] == ' ') {
        modify.splice(i, 1);
    }
    if (modify.length == 0) {
        throw new Error("bad inputs");
    }
    modify = Array.from(str2);
    while (modify[0] == ' ') {
        modify.splice(i, 1);
    }
    if (modify.length == 0) {
        throw new Error("bad inputs");
    }
    let holder1 = Array.from(str1);
    let holder2 = Array.from(str2);
    holder1[0] = str2.charAt(0);
    holder1[1] = str2.charAt(1);
    holder2[0] = str1.charAt(0);
    holder2[1] = str1.charAt(1);
    return holder1.join('') + " " + holder2.join('');
}

module.exports = { camelCase, replaceChar, mashUp}; 
//console.log(mashUp("Patrick", "Hill")); //Returns "Hitrick Pall"
//console.log(mashUp("hello", "world")); //Returns "wollo herld"
// console.log(mashUp("Patrick", "")); //Throws error
// console.log(mashUp()); // Throws Error
// console.log(mashUp("John")); // Throws error
// console.log(mashUp ("h", "Hello")); // Throws Error
// console.log(mashUp ("h","e")); // Throws Error

