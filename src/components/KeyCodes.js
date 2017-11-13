const digitKeyCodes = {
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
};

const operatorKeyCodes = {
  48: [{ key: ')', shiftKeyPressed: true }],
  56: [{ key: '*', shiftKeyPressed: true }],
  57: [{ key: '(', shiftKeyPressed: true }],
  187: [{ key: '+', shiftKeyPressed: true}, { key: '=', shiftKeyPressed: false}],
  109: [{ key: '-', shiftKeyPressed: true}],
  111: [{ key: '/', shiftKeyPressed: false}],
  191: [{ key: '/', shiftKeyPressed: false}],
  13: [{ key: '=', shiftKeyPressed: false}],
};

export { digitKeyCodes, operatorKeyCodes }
