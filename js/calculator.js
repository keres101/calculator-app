class Calc {
  constructor({ screen, screenCom }) {
    this.screen = screen;
    this.screen_op = screenCom;
    this.lastKey = "num";
    this.trunk = "0";
    this.op = null;
  }
  parseText(text, key, end = false) {
    if (key == "." && /\./.test(text)) return "false";
    let finalText = text.replace(/^0(?!.)/, "");
    if (finalText == "" && key == ".") finalText = "0";
    finalText = finalText + key;
    if (end) {
      finalText = finalText.replaceAll(/(?<=\.[1-9]*)0*$/g, "");
      finalText = finalText.replace(/\.$/, "");
    }
    return finalText;
  }
  getLastKey() {
    return this.lastKey;
  }
  addScreen(value) {
    this.lastKey = "num";
    let resultParse = this.parseText(this.screen.textContent, value);
    if (resultParse === "false") return;
    this.screen.textContent = resultParse;
  }
  resetScreen(value, lkey = "num", end = false) {
    this.lastKey = lkey;
    const resultParse = this.parseText("", value, end);
    this.screen.textContent = resultParse;
    return resultParse;
  }
  operate(op) {
    this.screen_op.textContent = op;
    if (this.lastKey != "op" && this.lastKey != "op_resolve") {
      if (this.op == null) {
        this.op = op;
        this.trunk = this.screen.textContent;
        this.lastKey = "op";
      } else {
        let resultOp = this.resolve_op(
          this.op,
          this.trunk,
          this.screen.textContent
        );
        this.trunk = this.resetScreen(`${resultOp}`, "op_resolve", true);
        this.op = op;
      }
    } else {
      this.op = op;
      this.lastKey = "op";
    }
  }
  result() {
    if (this.op != null && this.lastKey != "op") {
      let resultOp = this.resolve_op(
        this.op,
        this.trunk,
        this.screen.textContent
      );
      this.resetScreen(`${resultOp}`, "result", true);
      this.trunk = 0;
      this.op = null;
      this.screen_op.textContent = "=";
    }
  }
  reset() {
    this.screen.textContent = "0";
    this.trunk = 0;
    this.op = null;
    this.lastKey = "num";
    this.screen_op.textContent = "";
  }
  delete() {
    const act = this.screen.textContent;
    if (this.lastKey == "result") {
      this.screen.textContent = "0";
      this.screen_op.textContent = "";
    } else if (this.lastKey == "op_resolve") {
      this.screen.textContent = "0";
      this.trunk = "0";
      this.op = null;
      this.screen_op.textContent = "";
      this.lastKey = "num";
    } else {
      if (act.length > 1)
        this.screen.textContent = this.screen.textContent.slice(0, -1);
      else this.screen.textContent = "0";
    }
  }
  resolve_op(op, num1, num2) {
    const result_op = eval(`${num1} ${op} ${num2}`);
    return result_op.toFixed(4);
  }
}

export { Calc };
