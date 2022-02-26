import { useState } from 'react';

const CalculatorBody = () => {
  const [calcState, setCalcState] = useState(0);
  const [displayVal, setDisplayVal] = useState('0');
  const [isPositiveNum, setIsPositiveNum] = useState(true);
  const [finalSum, setFinalSum] = useState('');

  const handleClick = ({ target: { classList } }) => {
    const displayVals = displayVal.split('');
    //CLEAR
    if (classList[1] === 'clear') {
      setCalcState(0);
      setDisplayVal('0');
      setFinalSum('');
      setIsPositiveNum(true);
    }
    //IF WE ARE AT ZERO STATE IE: CALC AFTER CLEAR
    if (calcState === 0 && classList[0] === 'grey') {
      setCalcState(1);
      setDisplayVal(calcKeysRefObj[classList[1]][0]);
    }
    //IF WE ARE INPUTTING FIRST NUMBER
    if (calcState === 1 && classList[0] === 'grey' && displayVals.length < 7) {
      setDisplayVal((currVal) => {
        return currVal + calcKeysRefObj[classList[1]][0];
      });
    }
    //IF WE ARE PRESSING + - x ÷
    if (
      calcState === 1 &&
      classList[0] === 'orange' &&
      classList[1] !== 'equals'
    ) {
      setFinalSum((curr) => {
        setCalcState(2);
        return curr + displayVal + calcKeysRefObj[classList[1]][2];
      });
    }
    //IF WE ARE MIDWAY THROUGH A CALCULATION
    if (calcState === 2 && classList[0] === 'grey') {
      setCalcState(1);
      setDisplayVal((currVal) => {
        return calcKeysRefObj[classList[1]][0];
      });
    }
    //IF WE PRESS %
    if (calcState === 1 && classList[1] === 'percent') {
      const result = eval(displayVal / 100);
      setDisplayVal(result.toString());
    }
    //IF WE PRESS +/-
    if (calcState === 1 && classList[1] === 'plusMinus') {
      if (isPositiveNum) {
        setIsPositiveNum(false);
        setDisplayVal((current) => {
          return '-' + current;
        });
      } else {
        setIsPositiveNum(true);
        setDisplayVal(displayVal.substring(1));
      }
    }
    //IF WE PRESS =
    if (classList[1] === 'equals') {
      const result = eval(finalSum + displayVal).toString();
      const posStatus = result[0];
      setFinalSum('');
      if (posStatus === '-') setIsPositiveNum(false);
      else setIsPositiveNum(true);
      if (result.length > 7) {
        setDisplayVal('e');
        setCalcState(3);
      } else {
        setDisplayVal(result);
        setCalcState(1);
      }
    }
  };

  const calculatorKeys = [
    'clear',
    'plusMinus',
    'percent',
    'divide',
    'seven',
    'eight',
    'nine',
    'multiply',
    'four',
    'five',
    'six',
    'subtract',
    'one',
    'two',
    'three',
    'add',
    'zero',
    'decimalPoint',
    'equals',
  ];

  const calcKeysRefObj = {
    clear: ['AC', 'dark-grey', 'clear'],
    plusMinus: ['+/-', 'dark-grey', 'invert'],
    percent: ['%', 'dark-grey', '%'],
    divide: ['÷', 'orange', '/'],
    seven: ['7', 'grey', 7],
    eight: ['8', 'grey', 8],
    nine: ['9', 'grey', 9],
    multiply: ['x', 'orange', '*'],
    four: ['4', 'grey', 4],
    five: ['5', 'grey', 5],
    six: ['6', 'grey', 6],
    subtract: ['-', 'orange', '-'],
    one: ['1', 'grey', 1],
    two: ['2', 'grey', 2],
    three: ['3', 'grey', 3],
    add: ['+', 'orange', '+'],
    zero: ['0', 'grey', 0],
    decimalPoint: ['.', 'grey', '.'],
    equals: ['=', 'orange', '='],
  };

  return (
    <section className='calc-body'>
      <div key='display' className='display charcoal'>
        {displayVal}
      </div>
      {calculatorKeys.map((key) => {
        return (
          <div
            key={key}
            onClick={handleClick}
            className={`${calcKeysRefObj[key][1]} ${key} keys`}
          >
            {calcKeysRefObj[key][0]}
          </div>
        );
      })}
    </section>
  );
};

export default CalculatorBody;
