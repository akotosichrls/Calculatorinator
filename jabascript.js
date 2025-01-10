let shouldClearDisplay = false; // clear display on the next input

// event listener to initialize functionality after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display"); // reference to the calculator display
  const buttons = document.querySelectorAll("input[type='button']"); // select all button elements

  // click event listeners to each button
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.value; // get value of the clicked button

      // clear the display if the flag is set and the button is not "C", "CE", "=" or a memory function
      if (
        shouldClearDisplay &&
        !["C", "CE", "="].includes(value) &&
        !isMemoryFunction(value)
      ) {
        display.value = "";
        shouldClearDisplay = false;
      }

      // handle "=" button: calculate and display the result
      if (value === "=") {
        calculateResult();
      }
      // handle "C" button: clear entire display
      else if (value === "C") {
        display.value = "";
      }
      // handle "CE" button: clear last character in the display
      else if (value === "CE") {
        display.value = display.value.slice(0, -1);
      }
      // handle "%" button: calculate percentage
      else if (value === "%") {
        calculatePercentage();
      }
      // append button value to the display unless it's a memory function
      else if (!isMemoryFunction(value)) {
        if (value === "÷") display.value += "/"; // replace ÷ with /
        else if (value === "x") display.value += "*"; // replace x with *
        else display.value += value; // append other values
      }
    });
  });
});

// check if a button is a memory function
function isMemoryFunction(value) {
  return ["MC", "MR", "M+", "M-", "MS", "Mv"].includes(value); // returns true for memory-related buttons
}

// initialize the memory variable
let memory = 0;

// Memory Clear: clears the stored memory value
function memoryClear() {
  memory = 0;
  alert("Memory cleared.");
}

// Memory Recall: displays stored memory value
function memoryRecall() {
  document.getElementById("display").value = memory;
}

// Memory Add: adds current display value to the stored memory
function memoryAdd() {
  const displayValue = parseFloat(document.getElementById("display").value); // Parse display value as a number
  if (!isNaN(displayValue)) {
    memory += displayValue;
    alert(`Added to memory: ${displayValue}`);
  } else {
    alert("Invalid input. Please enter a valid number.");
  }
}

// Memory Subtract: subtracts current display value from the stored memory
function memorySubtract() {
  const displayValue = parseFloat(document.getElementById("display").value);
  if (!isNaN(displayValue)) {
    memory -= displayValue;
    alert(`Subtracted from memory: ${displayValue}`);
  } else {
    alert("Invalid input. Please enter a valid number.");
  }
}

// Memory Save: overwrites stored memory with current display value
function memorySave() {
  const displayValue = parseFloat(document.getElementById("display").value);
  if (!isNaN(displayValue)) {
    memory = displayValue;
    alert(`Memory saved: ${displayValue}`);
  } else {
    alert("Invalid input. Please enter a valid number.");
  }
}

// Memory View: shows current stored memory value with alert box
function memoryShow() {
  alert(`Memory value: ${memory}`);
}

// convert current display value to a specified base (BIN, OCT, HEX)
function convertToBase(base) {
  const display = document.getElementById("display");
  const displayValue = parseInt(display.value, 10); // parse input as an integer (base 10)

  if (isNaN(displayValue)) {
    alert("Invalid input. Please enter a valid integer.");
    return;
  }

  // convert display value to the specified base
  if (base === 2) {
    display.value = displayValue.toString(2); // convert to binary
  } else if (base === 8) {
    display.value = displayValue.toString(8); // convert to octal
  } else if (base === 16) {
    display.value = displayValue.toString(16).toUpperCase(); // convert to hexadecimal (uppercase)
  }
}

// add event listeners for base conversion buttons (BIN, OCT, HEX)
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("input[type='button']");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.value;

      if (value === "BIN") {
        convertToBase(2);
      } else if (value === "OCT") {
        convertToBase(8);
      } else if (value === "HEX") {
        convertToBase(16);
      }
    });
  });
});

// calculate percentage of the current display value
function calculatePercentage() {
  const display = document.getElementById("display");
  if (display.value) {
    display.value = parseFloat(display.value) / 100; // divide by 100 to calculate percentage
    shouldClearDisplay = true; // clear display on next input
  }
}

// calculate result
function calculateResult() {
  const display = document.getElementById("display");
  try {
    // replace custom operators with valid JavaScript operators and evaluate the expression
    display.value = eval(display.value.replace(/÷/g, "/").replace(/x/g, "*"));
    shouldClearDisplay = true; // clear display on next input
  } catch (error) {
    display.value = "Error";
    shouldClearDisplay = true;
  }
}
