import Stack from './Stack.js'
import { associativity, precedence, operators } from './Enums.js'

class Calculator {
  constructor({ debugMode = false }) {
    this.output = [];
    this.stack = new Stack();
    this.debugMode = debugMode;
    this.dotMode = false;
    this.tempNumber = 0;
  }

  isOperator(key) {
    return key in operators;
  }

  isAssociative(key, type) {
    if (!this.isOperator(key)) {
      throw new Error(`Invalid key: ${key}`);
    }
    if (operators[key].associativity === type) {
      return true;
    }
    return false;
  }

  comparePrecedence(key1, key2) {
    if (!this.isOperator(key1) || !this.isOperator(key2)) {
      throw new Error(`Invalid keys: ${key1} ${key2}`);
    }
    return operators[key1].precedence - operators[key2].precedence;
  }

  handleInput(key) {
    this.printStack('handleInput::start', 'stack', this.stack);
    this.printStack('handleInput::start', 'output', this.output);
    if(this.dotMode && !isNaN(key)) {
        this.tempNumber = parseFloat(`${this.tempNumber}${key}`);
        return this.tempNumber;
    } else if(this.dotMode) {
        this.dotMode = false;
        this.output.push(this.tempNumber);
    } 
    
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
    } else if (key === '.') { 
        this.dotMode = true;
        this.tempNumber = `${this.output.pop()}.`;
    } else {
      this.output.push(key);
      return key;
    }
    this.printStack('handleInput::end', 'stack', this.stack);
    this.printStack('handleInput::end', 'output', this.output);
    return null;
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
    const computeStack = [];
    this.printStack('computeOutput::start', 'computeStack', computeStack);
    this.printStack('computeOutput::start', 'stack', this.stack);
    this.printStack('computeOutput::start', 'output', this.output);
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
    return this.computeOutput();
  }

  reset() {
    this.stack.clear();
    this.output = [];
  }

  printStack(funcName, stackName, stack) {
    if (this.debugMode) {
      console.log(`${funcName} ${stackName}: ${stack}`);
    }
  }
}

export default Calculator
