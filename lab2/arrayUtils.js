function mean(arr) {
    let summer = 0;
    // make sure that the input is an array
    // make sure it has only numbers
    // add the sum of the squares
    // Implement question 1 here
    if (arr === undefined) {
        throw new Error("bad inputs");
    }
    
    else if (!Array.isArray(arr)) {
        throw new Error("bad inputs");
    }
    else if (arr.length === 0) {
        throw new Error("bad inputs");
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] != "number") {
                throw new Error("bad inputs");
            }
        }
        arr.forEach(element => summer += (element));
        return summer / arr.length;
    }
}
//console.log(mean([1, 2, 3])); // Returns: 2
//console.log(mean([])) // throws an error
//console.log(console.log(mean("banana"))); // throws an error
//console.log(mean(["guitar", 1, 3, "apple"])); // throws an error
//console.log(mean()); // throws an error

function medianSquared(arr) {
    let summer = 0;
    // make sure that the input is an array
    // make sure it has only numbers
    // add the sum of the squares
    // Implement question 1 here
    if (arr === undefined) {
        throw new Error("bad inputs");
    }
    
    else if (!Array.isArray(arr)) {
        throw new Error("bad inputs");
    }
    else if (arr.length === 0) {
        throw new Error("bad inputs");
    }
    else {
        if (arr.length == 1) {
            return arr[i] * arr[i];
        }
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] != "number") {
                throw new Error("bad inputs");
            }
        }
        if (arr.length % 2 == 0) {
            var lower = arr[Math.floor(arr.length / 2)];
            var upper = arr[Math.ceil(arr.length / 2)];
            return ((lower + upper) / 2) * ((lower + upper) / 2);
        }
        else {
            return arr[Math.ceil(arr.length/2)] * arr[Math.ceil(arr.length/2)];
        }
    }
}
//console.log(medianSquared([4, 1, 2])); // Returns: 4
//console.log(medianSquared([])) // throws an error
// console.log(medianSquared("banana")); // throws an error
// console.log(medianSquared(1,2,3)); // throws an error
// console.log(medianSquared(["guitar", 1, 3, "apple"])); // throws an error
// console.log(medianSquared()); // throws an error

function maxElement(arr) {
    let max = 0;
    let index = 0;
    // make sure that the input is an array
    // make sure it has only numbers
    // add the sum of the squares
    // Implement question 1 here
    if (arr === undefined) {
        throw new Error("bad inputs");
    }
    
    else if (!Array.isArray(arr)) {
        throw new Error("bad inputs");
    }
    else if (arr.length === 0) {
        throw new Error("bad inputs");
    }
    else {
        if (arr.length == 1) {
            return arr[i] * arr[i];
        }
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] != "number") {
                throw new Error("bad inputs");
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            index = i;
        }
    }
    let answer = {};
    answer[max] = index;
    return answer;
}

//console.log(maxElement([5, 6, 7, 7, 7, 7])); // Returns: {'7': 2}
// maxElement(5, 6, 7); // throws error
// maxElement([]); // throws error
// maxElement(); // throws error
// maxElement("test"); // throws error
// maxElement([1,2,"nope"]); // throws error


function fill(end, value) {
    let answer = [];
    if (end === undefined) {
        throw new Error("bad inputs");
    }
    if (typeof end != "number") {
        throw new Error("bad inputs");
    }
    if (end <= 0) {
        throw new Error("bad inputs");
    }
    if (value === undefined) {
        for (let i = 0; i < end; i++) {
            answer.push(i);
        }
    }
    else {
        for (let i = 0; i < end; i++) {
            answer.push(value);
        }
    }
    return answer;
}

// console.log(fill(6)); // Returns: [0, 1, 2, 3, 4, 5]
// console.log(fill(3, 'Welcome')); // Returns: ['Welcome', 'Welcome', 'Welcome']
// console.log(fill()); // Throws error
// console.log(fill("test")); // Throws error
// console.log(fill(0)); // Throws Error
// console.log(fill(-4)); // Throws Error

function countRepeating(arr) {
    let answer = {};
    if (arr === undefined) {
        throw new Error("bad inputs");
    }
    
    else if (!Array.isArray(arr)) {
        throw new Error("bad inputs");
    }
    else if (arr.length === 0) {
        return answer;
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].toString();
            if (answer[arr[i]] === undefined) {
                answer[arr[i]] = 1;
            }
            else {
                answer[arr[i]] += 1;
            }
        }
        for (let x in answer) {
            if (answer[x] < 2) {
                delete answer[x];
            }
        }
        return answer;
    }
}

// console.log(countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]));
// /* Returns: 
// {
//   "7": 2,
//   true: 3,
//   "Hello": 2,
// }
// */

// console.log(countRepeating("foobar"));  //throws an error
// countRepeating() //throws an error
// console.log(countRepeating([])); //returns {}
// console.log(countRepeating({a: 1, b: 2, c: "Patrick"})); //throws an error


function arrayChecker(arr1, arr2) {
    if (!(Array.isArray(arr1) && Array.isArray(arr2))) {
        return false;
    }
    if (arr1.length != arr2.length) {
        return false;
    }
    arr1 = arr1.sort();
    arr2 = arr2.sort();
    if (arr1.length == 0 && arr2.length == 0) {
        return true;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (typeof arr1[i] !== typeof arr2[i]) {
            return false;
        }
        else if (Array.isArray(arr1[i])) {
            if (arrayChecker(arr1[i], arr2[i]) == false) {
                return false;
            }
        }
        else if (typeof arr1[i] == "object") {
            if (objectChecker(arr1[i], arr2[i]) == false) {
                return false;
            }
        }

        else if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}
function objectChecker(obj1, obj2) {
    if (!(typeof obj1 == "object" && typeof obj2 == "object")) {
        return false;
    }
    if (Object.keys(obj1).length != Object.keys(obj2).length) {
        return false;
    }
    if (Object.keys(obj1).length == 0) {
        return true;
    }
    let holder1 = Object.keys(obj1);
    let holder2 = Object.keys(obj2);
    for (let i = 0; i < holder1.length; i++) {
        holder1 = holder1.sort();
        holder2 = holder2.sort();
        if (holder1[i] !== holder2[i]) {
            return false;
        }
        else if (Array.isArray(obj1[holder1[i]])){
            if (arrayChecker(obj1[holder1[i]], obj2[holder2[i]]) == false) {
                return false;
            }
        }
        else if (typeof obj1[holder1[i]] == "object"){
            if (objectChecker(obj1[holder1[i]], obj2[holder2[i]]) == false) {
                return false;
            }
        }
        else if (obj1[holder1[i]] !== obj2[holder2[i]]) {
            return false;
        }
    }
    return true;
}
function isEqual(arrayOne, arrayTwo) {
    if (arrayOne === undefined || arrayTwo === undefined) {
        throw new Error("bad inputs");
    }
    
    else if (!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) {
        throw new Error("bad inputs");
    }
    return arrayChecker(arrayOne, arrayTwo);
}

// console.log(isEqual([1, 2, 3], [3, 1, 2])); // Returns: true
// console.log(isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z'])); // Returns: true
// console.log(isEqual([1, 2, 3], [4, 5, 6])); // Returns: false
// console.log(isEqual([1, 3, 2], [1, 2, 3, 4])); // Returns: false
// console.log(isEqual([1, 2], [1, 2, 3])); // Returns: false
// console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]])); // Returns: true
// console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]])); // Returns: false

module.exports = {mean, medianSquared, maxElement, fill, countRepeating, isEqual};