import Stack from './Stack.js'
import {
  associativity,
  precedence,
  operators
} from './Enums.js'

class Calculator {
  constructor({
    debugMode = false
  }) {
    this.output = [];
    this.stack = new Stack();
    this.debugMode = debugMode;
    this.tempNumber = '';
    this.previousKey = '';
    this.display = '';
  }

  isOperator(key) {
    return key in operators;
  }

  isAssociative(key, type) {
    if (operators[key].associativity === type) {
      return true;
    }
    return false;
  }

  comparePrecedence(key1, key2) {
    return operators[key1].precedence - operators[key2].precedence;
  }

  isNumber(num) {
    return !isNaN(parseFloat(num));
  }

  /**
   * Uses the shunting-yard algorithm for parsing mathematical 
   * expressions written in infix notation to Reverse Polish Notation 
   * @param {*} key 
   */
  processInput(key) {
    if (this.isOperator(key)) {
      while (!this.stack.isEmpty() && this.isOperator(this.stack.peek())) {
        if ((this.isAssociative(key, associativity.LEFT) &&
            this.comparePrecedence(key, this.stack.peek()) <= 0) ||
          (this.isAssociative(key, associativity.RIGHT) &&
            this.comparePrecedence(key, this.stack.peek()) < 0)) {
          this.output.push(this.stack.pop());
          continue;
        }
        break;
      }
      this.stack.push(key);
    } else if (key === '(') {
      this.stack.push(key);
    } else if (key === ')') {
      while (!this.stack.isEmpty() && !(this.stack.peek() === '(')) {
        this.output.push(this.stack.pop());
      }
      this.stack.pop();
    } else if (this.isNumber(key)) {
      //this.tempNumber = key;
    }
  }

  isNumberAfterClosingBracket(key) {
    return (this.previousKey === ')' && this.isNumber(key));
  }

  isOpeningBracketAfterNumber(key) {
    return (key === '(' && this.isNumber(this.previousKey));
  }

  tempNumberAlreadyHasDot(key) {
    return (key === '.' && this.tempNumber.includes('.'));
  }

  equationStartsWithOperator(key) {
    return (this.isOperator(key) && this.previousKey === '');
  }

  equationStartsWithClosingBracket(key) {
    return (key === ')' && this.previousKey === '');
  }

  hasBadInput(key) {
    return (this.isNumberAfterClosingBracket(key) ||
      this.isOpeningBracketAfterNumber(key) ||
      this.tempNumberAlreadyHasDot(key) ||
      this.equationStartsWithOperator(key) ||
      this.equationStartsWithClosingBracket(key));
  }

  handleInput(key) {
    this.printStack('handleInput::start', 'stack', this.stack);
    this.printStack('handleInput::start', 'output', this.output);

    // handle bad input
    if (this.hasBadInput(key)) {
      return;
    }

    // replace operator if received more than one in a row
    if (this.isOperator(key) && this.isOperator(this.previousKey)) {
      this.stack.pop();
      this.display = this.display.slice(0, -1);
    }

    let tempDisplay = `${this.display}${key}`;

    // discard previous result if starting new equation with a digit, dot or bracket
    if ((this.isNumber(key) || !this.isOperator(key)) &&
      this.previousKey === '=') {
      this.output.pop();
      this.display = '';
    }

    // handle dot without preceding 0
    if (key === '.' && !this.isNumber(this.previousKey)) {
      this.tempNumber = '0.';
      this.display = `${this.display}${this.tempNumber}`;
      this.previousKey = key;
      return;
    }

    // check if we are adding a digit or a dot to a number
    if ((this.isNumber(key) || key === '.') &&
      (this.isNumber(this.previousKey) || this.previousKey === '.')) {
      this.tempNumber = `${this.tempNumber}${key}`;
      this.display = `${this.display}${key}`;
      this.previousKey = key;
      return;
    }

    // push number if not expecting anymore digits
    if (!this.isNumber(key) && this.isNumber(this.previousKey)) {
      this.output.push(this.tempNumber);
      this.tempNumber = '';
      tempDisplay = `${this.display}${key}`;
    } else if (this.isNumber(key)) {
      this.tempNumber = key;
      this.display = `${this.display}${key}`;
      this.previousKey = key;
      return;
    }

    // update display
    this.display = tempDisplay;

    // keep track of last key
    this.previousKey = key;

    // calculate
    if (key === '=') {
      this.display = this.getResult();
      return;
    }

    // reset
    if (key === 'AC') {
      this.reset();
      return;
    }

    // process
    this.processInput(key);

    this.printStack('handleInput::end', 'stack', this.stack);
    this.printStack('handleInput::end', 'output', this.output);
  }

  pushStackToOutput() {
    this.printStack('pushStackToOutput::start', 'stack', this.stack);
    this.printStack('pushStackToOutput::start', 'output', this.output);

    while (!this.stack.isEmpty()) {
      this.output.push(this.stack.pop());
    }

    this.printStack('pushStackToOutput::end', 'stack', this.stack);
    this.printStack('pushStackToOutput::end', 'output', this.output);
  }

  compute(operator, d1, d2) {
    let result;
    switch (operator) {
      case '+':
        result = d1 + d2;
        break;
      case '-':
        result = d1 - d2;
        break;
      case '*':
        result = d1 * d2;
        break;
      case '/':
        result = d1 / d2;
        break;
    }
    return result;
  }

  computeOutput() {
    this.printStack('computeOutput::start', 'computeStack', []);
    this.printStack('computeOutput::start', 'stack', this.stack);
    this.printStack('computeOutput::start', 'output', this.output);

    const computeStack = [];

    for (let key of this.output) {
      if (!this.isOperator(key)) {
        computeStack.push(key);
      } else {
        const d2 = parseFloat(computeStack.pop());
        const d1 = parseFloat(computeStack.pop());

        const result = this.compute(key, d1, d2);
        computeStack.push(result);
      }
    }

    this.printStack('computeOutput::end', 'computeStack', computeStack);
    this.printStack('computeOutput::end', 'stack', this.stack);
    this.printStack('computeOutput::end', 'output', this.output);

    return parseFloat(computeStack.pop());
  }

  getResult() {
    this.pushStackToOutput();
    const result = this.computeOutput();

    this.reset();
    this.previousKey = '=';
    this.output.push(`${result}`);

    return result;
  }

  reset() {
    this.stack.clear();
    this.output = [];
    this.display = '';
    this.previousKey = '';
    this.tempNumber = '';
  }

  printStack(funcName, stackName, stack) {
    if (this.debugMode) {
      console.log(`${funcName} ${stackName}: ${stack}`);
    }
  }
}

export default Calculator
