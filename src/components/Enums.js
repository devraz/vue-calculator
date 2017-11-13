const associativity = {
  LEFT: 0,
  RIGHT: 1,
};

const precedence = {
  LOW: 0,
  HIGH: 5,
};

const operators = {
  '+': {
    precedence: precedence.LOW,
    associativity: associativity.LEFT
  },
  '-': {
    precedence: precedence.LOW,
    associativity: associativity.LEFT
  },
  '*': {
    precedence: precedence.HIGH,
    associativity: associativity.LEFT
  },
  '/': {
    precedence: precedence.HIGH,
    associativity: associativity.LEFT
  },
};

export { associativity, precedence, operators }
