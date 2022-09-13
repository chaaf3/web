let myForm = document.getElementById('formId');
let textInput = document.getElementById('number');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('attempts');
// let frmLabel = document.getElementById('formLabel');

function inputChecker(test) {
    if (test == 0) {
        return true;
    }
    if (!test || typeof test != "number") {
        return false;
    }
    return true;
}
function isPrime(number) {
    if (number < 0) {
        return false;
    }
    if (number == 0 || number == 1 || number == 2) {
        return true;
    }
    let holder = 2;
    while (holder < number) {
        if (number % holder == 0) {
            return false;
        }
        holder++;
    }
    return true;
}

if (myForm) {
  myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let num = parseInt(textInput.value.trim())
    if (inputChecker(num)) {
    //   textInput.classList.remove('inputClass');
      errorDiv.hidden = true;
    //   frmLabel.classList.remove('error');
      let li = document.createElement('li');
      li.innerHTML = num;
      if (isPrime(num)) {
        li.innerHTML = `${num} is a prime number`;
        li.classList.add("is-prime")
      }
      else {
        li.innerHTML = `${num} is NOT a prime number`;
        li.classList.add("not-prime")
      }
      myUl.appendChild(li);
      myForm.reset();
      textInput.focus();
    } else {
      textInput.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'You must enter a valid value';
      frmLabel.className = 'error';
      textInput.focus();
    }
  });
}