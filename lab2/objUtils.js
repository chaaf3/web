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

function makeArrays(arr) {
    let answer = [];
    if (arr === undefined) {
        throw new Error("bad inputs");
    }
    else if (!Array.isArray(arr)) {
        throw new Error("bad inputs");
    }
    else if (arr.length < 2) {
        throw new Error("bad inputs");
    }
    for (let x of arr) {
        if (typeof x != "object") {
            throw new Error("bad inputs");
        }
        else if (Object.keys(x).length === 0) {
            throw new Error("bad inputs");
        }
    }
    for (let i of arr) {
        for (let y in i) {
            let holder = [y, i[y]];
            answer.push(holder);
        }
    }
    return answer;
}

// const first = { x: 2, y: 3};
// const second = { a: 70, x: 4, z: 5 };
// const third = { x: 0, y: 9, q: 10 };

// const firstSecondThird = makeArrays([first, second, third]);
// // [ ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
// console.log(firstSecondThird);
// const secondThird = makeArrays([second, third]);
// // [ ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
// console.log(secondThird);
// const thirdFirstSecond = makeArrays([third, first, second]);
// // [  ['x',0], ['y',9], ['q',10], ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5] ]
// console.log(thirdFirstSecond);


function isDeepEqual(obj1, obj2) {
    if (obj1 == undefined || obj2 == undefined) {
        throw new Error("bad inputs");
    }
    if (typeof obj1 !== "object" || typeof obj2 !== "object") {
        throw new Error("bad inputs");
    }
    return objectChecker(obj1, obj2);
}
// const first = {a: 2, b: 3};
// const second = {a: 2, b: 4};
// const third = {a: 2, b: 3};
// const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
// const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
// console.log(isDeepEqual(first, second)); // false
// console.log(isDeepEqual(forth, fifth)); // true
// console.log(isDeepEqual(forth, third)); // false
//console.log(isDeepEqual({}, {})); // true
//console.log(isDeepEqual(second, third));

function computeObject(object, func) {
    if (object == undefined || func == undefined) {
        throw new Error("bad inputs");
    }
    if (typeof object != "object" || typeof func != "function") {
        throw new Error("bad inputs");
    }
    let holder = Object.values(object);
    for (let x of holder) {
        if (typeof x != "number") {
            throw new Error("bad inputs");
        }
    }
    for (let x in object) {
        object[x] = func(object[x]);
    }
    return object;
}
//console.log(computeObject({ a: 3, b: 7, c: 5 }, n => n * 2));
/* Returns:
{
  a: 6,
  b: 14,
  c: 10
}
*/




module.exports = {makeArrays, isDeepEqual, computeObject };