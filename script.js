const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uc");
const lowercaseCheck = document.querySelector("#lc");
const numbersCheck = document.querySelector("#num");
const symbolsCheck = document.querySelector("#sym");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
// lets define initial values

let password ="";
let passwordLength = 10;
let checkCount = 0;
// set the color of the circle to grey.
handleSlider();
setIndicator("#ccc");
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText= passwordLength;
    const max = inputSlider.max;
    const min = inputSlider.min;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";
}   
function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    
}
function getRndInteger(min,max) {
    return Math.floor(Math.random() * (max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }
    //to make visible of copied span
    copyMsg.classList.add("active");
    setTimeout(
        ()=>{
            copyMsg.classList.remove("active");  //this is run after 2000 milli seconds of waits
        },1000);
}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
          checkCount++;
    })
    // special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange) 
    // only give reference to a specific function in event listener if function is already defined 
    // in addevent listener if the function is already defined then use only its name
})

inputSlider.addEventListener("input",(e)=>{
    console.log("working");
    passwordLength=e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click',()=>{
    console.log("working");
    if(passwordDisplay.value!=0){
        copyContent();
    }
})
// generate button 

generateBtn.addEventListener('click' , ()=>{
    console.log("working");
    if (checkCount == 0) {
        console.log("working0.1")
        return;
    }
    console.log("working1s");    
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
        console.log("working2s"); 
    }
    console.log("Starting the Journey");
    password="";  // delete old password
    let arrFunc = [];

    if(uppercaseCheck.checked)
        arrFunc.push(generateUpperCase);
        // here functions parenthesis is not use because we only its
        // reference ,not calling a function

    if(lowercaseCheck.checked)
        arrFunc.push(generateLowerCase);

    if(numbersCheck.checked)
        arrFunc.push(generateRandomNumber);

    if(symbolsCheck.checked)
        arrFunc.push(generateSymbol);



    console.log("Compulsory adddition done");
    for (let i = 0; i < arrFunc.length; i++) {
        password += arrFunc[i]();  // this call is concatenating the result of calling a function at index i of an array named arrFunc to the password string.
    }
    console.log("Remaining adddition done"); 
    for(let i=0; i<passwordLength-arrFunc.length;i++){
        let randIndex = getRndInteger(0,arrFunc.length);
        password +=arrFunc[randIndex]();
    }
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    passwordDisplay.value = password;
    console.log("UI adddition done");
    calcStrength();
})


