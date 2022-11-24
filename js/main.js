import { Calc } from "./calculator.js";
const keyboard = document.getElementById("calculator_keyboard");
keyboard.addEventListener("click", e => {
  const btn = e.target;
  if (btn.classList.contains("calc-btn")) {
    connector(btn.value);
  }
});
window.addEventListener("keypress", e => {
  const kp = e.key;
  if (/[0-9+-/*.(Enter)]/.test(kp)) {
    connector(kp);
  }
});
window.addEventListener("keydown", e => {
  if (e.key == "Escape" || e.key == "Backspace") {
    connector(e.key);
  }
});
const screen = document.getElementById("calculator_screen");
const screenCom = document.getElementById("calc_screen_com");
const calc = new Calc({ screen, screenCom });
function connector(value) {
  if (/[0-9.]/.test(value)) {
    if (
      calc.getLastKey() == "op" ||
      calc.getLastKey() == "result" ||
      calc.getLastKey() == "op_resolve"
    )
      calc.resetScreen(value);
    else calc.addScreen(value);
  } else if (/[+\-*/x]/.test(value)) {
    calc.operate(value);
  } else if (value == "Enter") {
    calc.result();
  } else if (value == "reset" || value == "Escape") {
    calc.reset();
  } else if (value == "delete" || value == "Backspace") {
    calc.delete();
  }
}
