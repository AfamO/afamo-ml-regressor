console.log("Hello World! Welcome to JS Review");
//alert("Hello World! Welcome to JS Review");

function takeOrder() {    
    console.log("Taking Order");
    console.log("Processing Ordder");
    console.log("Completed Order");
}

// Declaration of different variable types
const firstName = "Afam"
const lastName = "Okonkwo"
const val = 34;
let isMale = true;
// Concatenation of strings
const fullName = firstName+ " "+lastName;
console.log("My fullName is "+fullName);

const arr = [
    'AfamO',
    function() { console.log("Welcome to my JS Review") },
    true,
    20
]
arr[1]()
console.log(arr[3])

const x = 42;
const explicitConversion = String(x);
const implicitConversio = x + "";
const numberType = Number(implicitConversio)
const float = parseFloat(implicitConversio)

console.log("x data type is "+typeof(x)+", explicit conversion =="+typeof(explicitConversion)
+ " implicit =="+typeof(implicitConversio)+" number=="+typeof(numberType)+" float conversion=="+typeof(float)
+" Actual value=="+float)

const A = 42;
let test = (A === '42') // strict equality operator checks for both value and type
console.log(test);
const B = 22;
console.log(A==B) //loose equality operator checks for value only and performs type coercion if necessary
console.log(A <= B)
let testA = (A <= 42) // Comparison operators return boolean values (true or false) based on the comparison of operands
let testB = (A === '42')  // Strict equality operator checks for both value and type, so this will return false because A is a number and '42' is a string
console.log(testA && testB) // Logical AND (&&) operator returns true if both operands are true, otherwise it returns false. In this case, testA is true but testB is false, so the result will be false.
console.log(testA || testB) // Logical OR (||) operator returns true if at least one of the operands is true, otherwise it returns false. In this case, testA is true and testB is false, so the result will be true.
console.log(!testA) // Logical NOT (!) operator negates the value of testA. Since testA is true, !testA will return false. If testA were false, !testA would return true. This operator is often used to invert boolean values or to check for falsy conditions.

/**
 * Ternary operator
 */
let age = 42;
let canDrive = age > 16 ? "yes" : "no";
console.log("Can you drive? "+canDrive);

/**
 * If else statement
 */
let minimumAge = 18;
let myAge = 42;
// Check if the person is eligible to vote based on their age
if(myAge < minimumAge) {
    console.log("You are not eligible to vote")
}
else {
    console.log("Please do go ahead and cast your vote")
}
/**
 * Switch statement
 */
let quartile = 25;
// Determine the quartile based on the value of 'quartile' variable
switch(quartile) {
    case 25:
        console.log("First quartile");
        break;
    case 50:
        console.log("Second quartile");
        break;
    case 75:
        console.log("3rd Quartile");
        break;
    default:
        console.log("You are in the 4th quartile")
}

/** Loops
 */
// For loop
// Loop through numbers 0 to 4 and print the index
for( let i = 0; i < 5; i++){
        console.log("My index is "+i)
}
// Declare an array of different data types
const arrr = [
    'AfamO',
    function() { console.log("Welcome to my JS Review") },
    true,
    20
]
// Loop through each element in the array and print its value
for ( let val of arrr) { 
    console.log("My val is "+val);
}

// Loop through each element in the array and print its value using forEach method
arr.forEach((val)=>console.log("My val is "+val))

// Object Literals
const myObj = {
    name: "Afam Okonkwo",
    age: 30,
    isMale: true
}
// Loop through each key in the object and print its key and value
for (let key in myObj)  console.log(`My key is ${key} and value is ${myObj[key]}`)

/**
 * Functions
 */
// functions- by declaration

function addTwoNumbers(a, b) {
    return a + b;
}
// function by expression
const addtwoNumbers = function(a, b) {
    return a + b;
}
console.log(addTwoNumbers(2,3));
console.log(addtwoNumbers(2,4));

/**
 *  ES 6 Reviews: Arrow Functions, Template Literal,  Filter and Map
 */
// arrow functions
const greet = () => console.log("Hello World!")
const logger = (val) => console.log("Logged DATA:: "+val);
const sum = (a, b) => a + b;
logger("ERROR 121-System shut down")
// Template Literals
const name = "Afam Okonkwo";
age = 30;
const message = `My name is ${name} and I am ${age} years old.`;
console.log(message);
console.log(`my sum is ${sum(2,3)}`);
greet();
// Declare array of numbers
const nums = [1,2,3,4,5,6,7,8,9];
// Map - Transform each element in the array and return a new array
const squared = nums.map((val) => val*2);
console.log(`Squared===${squared}`);

// Filter - Filter elements in the array based on a condition and return a new array
// I want to filter out the even numbers from the nums array
const evenNums = nums.filter((val) =>val % 2==0);
console.log("Even nums:::"+evenNums)
