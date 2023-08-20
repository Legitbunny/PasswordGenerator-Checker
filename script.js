const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNum]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const copyBtn = document.querySelector("[data-copy]");
const cpyBtn = document.querySelector("[data-cpy]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '`~!@#$%^&*()_-+=[]{}|:;",./<>?';

//by default values -- initially
let password = "";
let passwordLength = 8;
let checkCount = 0;
handleSlider();
//set strength circle to grey
setIndicator("#ccc");

//set password length
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  //or kuch bhi karna h?? -- slider
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //shadow
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
  //see notes
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function calcStrength() {
  let hasLower = false;
  let hasUpper = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numberCheck.checked) hasNum = true;
  if (symbolCheck.checked) hasSym = true;

  if (hasLower && hasUpper && (hasNum || hasSym) && passwordLength >= 8) {
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

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }

  //to make copy span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(shufflePassword) {
  //Fisher Yates Method
  for (let i = shufflePassword.length - 1; i > 0; i--) {
    //random j, finding out random j using random function
    const j = Math.floor(Math.random() * (i + 1));

    //swapping values of I & J index
    const temp = shufflePassword[i];
    shufflePassword[i] = shufflePassword[j];
    shufflePassword[j] = temp;
  }

  //add element after shuffling
  let str = "";
  shufflePassword.forEach((el) => (str += el));
  return str;
}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  //special condition - suppose if we select that want 1 digit pwd - check box count is greater than pwd length in that case we need to update the password length to check count
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

generateBtn.addEventListener("click", () => {
  //none of the cheeck box are selected
  if (checkCount == 0) {
    alert("Select at least one checkbox to generate password")
    return;
  }

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  //journey to find new password

  //remove old pwd
  password = "";

  //put the stuff mentioned by checkboxes
  // if(uppercaseCheck.checked){
  //     password += generateUpperCase();
  // }

  // if(lowercaseCheck.checked){
  //     password += generateLowerCase();
  // }

  // if(numberCheck.checked){
  //     password += generateRandomNumber();
  // }

  // if(symbolCheck.checked){
  //     password += generateSymbol();
  // }

  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }

  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }

  if (numberCheck.checked) {
    funcArr.push(generateRandomNumber);
  }

  if (symbolCheck.checked) {
    funcArr.push(generateSymbol);
  }

  //cumpolsary addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  //remaining addition
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    password += funcArr[randIndex]();
  }

  //pwd shuffle - bcs if we check all the 4 boxes 1st char will be upper case\
  //, 2nd will be lowercase, 3rd will be number and 4th will be symbol in
  // order to avoid that we're shuffling the pwd
  password = shufflePassword(Array.from(password));

  //show in UI
  passwordDisplay.value = password;

  //calculate strength
  calcStrength();
});

// Javascript code for password checker

const pwdInp = document.querySelector("[data-pwdInput]");

//set default color
// setColor("#ccc");

function calclen() {
  return pwdInp.value.length;
}

//show length in UI
const slider = document.querySelector("[data-chkSlider]");
slider.disabled=true;
const pwdLength = document.querySelector("[data-len]");

let pwd = "";
let pwdlen = 0;
slider.value = 0;
slider.style.backgroundSize = "0% 100%"
//lenDisplay();

function lenDisplay() {
  pwdlen = calclen();
  slider.value = pwdlen;
  pwdLength.innerText = pwdlen;

  const min = slider.min;
  const max = slider.max;
  slider.style.backgroundSize = ((pwdlen - min) * 100) / (max - min) + "% 100%";
}

pwdInp.addEventListener("input", (e) => {
  pwd = e.target.value;
  lenDisplay();
  calcStren();
});

const a = document.getElementById("uc");
a.disabled=true;
a.checked = false;

function uCCheck(str) {
  if (/[A-Z]/.test(str)) {
    if (!a.checked) {
      a.checked = true;
    }
    return true;
  }
}

const b = document.getElementById("lc");
b.disabled=true;
b.checked = false;

function lCCheck(str) {
  if (/[a-z]/.test(str)) {
    if (!b.checked) {
      b.checked = true;
    }
    return true;
  }
}

const c = document.getElementById("num");
c.disabled=true;
c.checked = false;

function numCheck(str) {
  if (/\d/.test(str)) {
    if (!c.checked) {
      c.checked = true;
    }
    return true;
  }
}

const symele = document.getElementById("sym");
symele.disabled=true;
symele.checked = false;

function symCheck(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (specialChars.test(str)) {
    if (!symele.checked) {
      symele.checked = true;
    }
    return true;
  }
}

const indi = document.querySelector("[data-indic]");

//default color
setColor("#ccc");

function setColor(col) {
  indi.style.backgroundColor = col;
  indi.style.boxShadow = `0px 0px 12px 1px ${col}`;
}

function calcStren() {
  let hasUC = false;
  let hasLC = false;
  let hasNm = false;
  let hasSm = false;

  pwd = pwdInp.value;

  hasUC = uCCheck(pwd);
  hasLC = lCCheck(pwd);
  hasNm = numCheck(pwd);
  hasSm = symCheck(pwd);

  if (hasUC && hasLC && hasNm && hasSm && pwdlen >= 8) {
    setColor("#0f0");
  } else if ((hasLC || hasUC) && (hasNm || hasSm) && pwdlen >= 6) {
    setColor("#ff0");
  } else {
    setColor("#f00");
  }
}

const cpyMsg = document.querySelector("[data-cpyMsg]");

async function cpyClipboard() {
  try {
    await navigator.clipboard.writeText(pwdInp.value);
    cpyMsg.innerText = "Copied";
  } catch (e) {
    cpyMsg.innerText = "Failed";
  }

  //to make copy span visible
  cpyMsg.classList.add("active");

  setTimeout(() => {
    cpyMsg.classList.remove("active");
  }, 2000);
}

cpyBtn.addEventListener("click", () => {
  if (pwdInp.value) {
    cpyClipboard();
  } else {
    alert("There is no input given !!");
  }
});

const check = document.getElementById("op-1");
const gene = document.getElementById("op-2");
const chker = document.getElementById("checker");
const genr = document.getElementById("generator");
chker.style.display = "none";

gene.addEventListener("click", () => {
  chker.style.display = "block";
  genr.style.display = "none";
});
check.addEventListener("click", () => {
  chker.style.display = "none";
  genr.style.display = "block";
});
