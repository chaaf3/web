const objUtils = require('./objUtils');
const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');

//mean

try {
    const meanOne = arrayUtils.mean([1, 2, 3]); // Returns: 2
    console.log('mean passed successfully');
} catch (e) {
   console.error('mean failed test case');
}
try {
    // Should Fail
    const meanTwo = arrayUtils.mean("hello there");
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

//median squared

try {
    const medianOne = arrayUtils.medianSquared([1, 2, 3]); // Returns: 4
    console.log('medianSquared passed successfully');
} catch (e) {
   console.error('medianSquared failed test case');
}
try {
    // Should Fail
    const medianTwo = arrayUtils.medianSquared("hello there");
    console.error('medianSquared did not error');
 } catch (e) {
    console.log('medianSquared failed successfully');
 }

 //maxElement

 try {
    const maxOne = arrayUtils.maxElement([1, 2, 3]); // Returns: 3
    console.log('maxElement passed successfully');
} catch (e) {
   console.error('maxElement failed test case');
}
try {
    // Should Fail
    const maxTwo = arrayUtils.maxElement([]);
    console.error('maxElement did not error');
 } catch (e) {
    console.log('maxElement failed successfully');
 }

 //fill

 try {
    const fillOne = arrayUtils.fill(7);
    console.log('fill passed successfully');
} catch (e) {
   console.error('fill failed test case');
}
try {
    // Should Fail
    const fillTwo = arrayUtils.fill(-5);
    console.error('fill did not error');
 } catch (e) {
    console.log('fill failed successfully');
 }

 //countRepeating
 try {
    const repeatingOne = arrayUtils.countRepeating([]); 
    console.log('countRepeating passed successfully');
} catch (e) {
   console.error('countRepeating failed test case');
}
try {
    // Should Fail
    const repeatingTwo = arrayUtils.countRepeating("writing a sentence");
    console.error('countRepeating did not error');
 } catch (e) {
    console.log('countRepeating failed successfully');
 }

 //isEqual

 try {
    const equalOne = arrayUtils.isEqual([5,4,3], [5,4,3]); 
    console.log('isEqual passed successfully');
} catch (e) {
   console.error('isEqual failed test case');
}
try {
    // Should Fail
    const equalTwo = arrayUtils.isEqual();
    console.error('isEqual did not error');
 } catch (e) {
    console.log('isEqual failed successfully');
 }
 
 //camelCase

 try {
    const camelOne = stringUtils.camelCase("writing test cases IS fun"); 
    console.log('camelCase passed successfully');
} catch (e) {
   console.error('camelCase failed test case');
}
try {
    // Should Fail
    const camelTwo = stringUtils.camelCase([1,3,4]);
    console.error('camelCase did not error');
 } catch (e) {
    console.log('camelCase failed successfully');
 }

 //replaceChar

 try {
    const replaceOne = stringUtils.replaceChar("Autotrader"); 
    console.log('replaceChar passed successfully');
} catch (e) {
   console.error('replaceChar failed test case');
}
try {
    // Should Fail
    const replaceTwo = stringUtils.replaceChar("");
    console.error('replaceChar did not error');
 } catch (e) {
    console.log('replaceChar failed successfully');
 }
 
 //mashUp

 try {
    const mashOne = stringUtils.mashUp("auto", "trader"); 
    console.log('mashUp passed successfully');
} catch (e) {
   console.error('mashUp failed test case');
}
try {
    // Should Fail
    const mashTwo = stringUtils.mashUp("example");
    console.error('mashUp did not error');
 } catch (e) {
    console.log('mashUp failed successfully');
 }

 // makeArrays

 try {
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    
    const makeArraysOne = objUtils.makeArrays([first, second, third]);

    console.log('makeArrays passed successfully');
} catch (e) {
   console.error('makeArrays failed test case');
}
try {
    // Should Fail
    const arraysTwo = objUtils.makeArrays("cars The Moveie");
    console.error('makeArrays did not error');
 } catch (e) {
    console.log('makeArrays failed successfully');
 }

 //isDeepEqual

 try {
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    
    const deepOne = objUtils.isDeepEqual(second, third);

    console.log('isDeepEqual passed successfully');
} catch (e) {
   console.error('isDeepEqual failed test case');
}
try {
    // Should Fail
    const deepTwo = objUtils.isDeepEqual(1, 2);
    console.error('isDeepEqual did not error');
 } catch (e) {
    console.log('isDeepEqual failed successfully');
 }

//computeObject

try {
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    
    const compOne = objUtils.computeObject(first, n => n+3);

    console.log('computeObject passed successfully');
} catch (e) {
   console.error('computeObject failed test case');
}
try {
    // Should Fail
    const compTwo = objUtils.computeObject(first, second);
    console.error('computeObject did not error');
 } catch (e) {
    console.log('computeObject failed successfully');
 }
 