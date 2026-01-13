const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelector(".buttons");

const operators = ["+", "-", "*", "/", "%"];

buttons.addEventListener("click", (e) => {
  const btn = e.target;
  if (!btn.dataset.value && !btn.dataset.action) return;

  if (btn.dataset.value) handleInput(btn.dataset.value);
  if (btn.dataset.action) handleAction(btn.dataset.action);
});

function handleInput(value) {
  const lastChar = display.value.slice(-1);

  if (operators.includes(value) && operators.includes(lastChar)) return;
  if (value === "." && lastChar === ".") return;

  display.value += value;
}

function handleAction(action) {
  if (action === "clear") {
    display.value = "";
    history.textContent = "";
  }

  if (action === "delete") {
    display.value = display.value.slice(0, -1);
  }

  if (action === "equals") calculate();
}

function calculate() {
  if (!display.value) return;

  try {
    history.textContent = display.value;
    display.value = Function(`"use strict"; return (${display.value})`)();
  } catch {
    display.value = "Error";
  }
}

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || operators.includes(e.key) || e.key === ".") {
    handleInput(e.key);
  }
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") display.value = display.value.slice(0, -1);
  if (e.key === "Escape") {
    display.value = "";
    history.textContent = "";
  }
});
