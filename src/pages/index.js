import '../pages/index.css';

import {
  buttonNumRandomAction,
  buttonNumResetAction,
  outputDataResult,
  outputDataResultConsistently,
} from '../utils/constants.js';

const generateNumRandom = () => {
  const numLength = document.querySelector('#length').value;
  const numMin = document.querySelector('#min').value;
  const numMax = document.querySelector('#max').value;

  console.log('random');

  let result = [];
  let random;
  let unic;
  let i;

  if (numLength <= numMax - numMin + 1) {
    while (result.length < numLength) {
      do {
        unic = true;
        random = randomInteger(numMin, numMax);
        for (i = 0; i < result.length; i++) {
          // console.log('первая генерация числа', random);
          if (random == result[i]) {
            // такое число уже было
            unic = false;
            break;
          }
        }
      } while (!unic); // повторить генерацию числа
      // console.log('повторная генерацию числа', random);
      result.push(random);
    }
  } else {
    outputDataResult.textContent = 'Error';
    outputDataResultConsistently.textContent = 'Error';
    return;
  }

  console.log('result', result);
  outputDataResult.textContent = result.join(' ');

  result.sort(function(a, b) {
    return a - b;
  });

  outputDataResultConsistently.textContent = result.join(' ');
  return result;
};

const resetNumRandom = () => {
  console.log('reset');

  outputDataResult.textContent = 'Numbers';
  outputDataResultConsistently.textContent = 'Consistently';
};

const randomInteger = (min, max) => {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

buttonNumRandomAction.addEventListener('click', evt => {
  evt.preventDefault();
  generateNumRandom();
});

buttonNumResetAction.addEventListener('click', () => {
  resetNumRandom();
});
