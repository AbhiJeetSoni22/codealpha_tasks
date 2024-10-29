let equal_pressed = 0;

let button_input = document.querySelectorAll(".input-button");
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("erase");
let darkSwitch = document.getElementById("dark-switch");

const root = document.querySelector(":root");

window.onload = () => {
  input.value = "";
};

// Event listener for number and operator buttons
button_input.forEach((button_class) => {
  button_class.addEventListener("click", () => {
    if (equal_pressed === 1) {
      input.value = "";
      equal_pressed = 0;
    }
    // Append only valid button values
    const value = button_class.value;
    if (/^[\d+\-*/.]$/.test(value)) {
      input.value += value;
    }
  });
});

// Evaluate the expression when equal button is clicked
equal.addEventListener("click", () => {
  equal_pressed = 1;
  let inp_val = input.value;

  // Only evaluate if input matches a valid mathematical expression
  if (/^[\d+\-*/.()]+$/.test(inp_val)) { 
    try {
      let solution = eval(inp_val);
      input.value = Number.isInteger(solution) ? solution : solution.toFixed(2);
    } catch (err) {
      alert("Invalid Input");
    }
  } else {
    alert("Invalid Input");
  }
});

// Clear all input
clear.addEventListener("click", () => {
  input.value = "";
});

// Erase the last character in the input
erase.addEventListener("click", () => {
  input.value = input.value.slice(0, -1);
});

// Toggle dark mode
darkSwitch.addEventListener("change", () => {
  if (darkSwitch.checked) {
    root.style.setProperty("--modeBG", "var(--darkBG)");
    root.style.setProperty("--modeColor", "var(--darkColor)");
  } else {
    root.style.setProperty("--modeBG", "var(--lightBG)");
    root.style.setProperty("--modeColor", "var(--lightColor)");
  }
});
