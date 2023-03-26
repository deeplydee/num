import '../pages/index.css';

import {
  buttonNumRandomAction,
  buttonNumResetAction,
  outputDataResult,
  outputDataResultConsistently,
  arrResult,
} from '../utils/constants.js';

let arrR = [];

const generateNumRandom = () => {
  const numLength = document.querySelector('#length').value;
  const numMin = document.querySelector('#min').value;
  const numMax = document.querySelector('#max').value;

  console.log('random');

  let result = [];
  let random;
  let unique;
  let i;

  if (numLength <= numMax - numMin + 1) {
    while (result.length < numLength) {
      do {
        unique = true;
        random = randomInteger(numMin, numMax);
        for (i = 0; i < result.length; i++) {
          // console.log('первая генерация числа', random);
          if (random == result[i]) {
            // такое число уже было
            unique = false;
            break;
          }
        }
      } while (!unique); // повторить генерацию числа
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

  let resultDiv = document.createElement('div');
  resultDiv.className = 'previous-result__item';
  for (let j = 0; j < result.length; j++) {
    let resultSpan = document.createElement('span');
    resultSpan.className = 'num-item';
    resultSpan.textContent = result[j] + ' ';
    resultDiv.appendChild(resultSpan);
  }
  document.getElementById('results').prepend(resultDiv);

  result.sort(function(a, b) {
    return a - b;
  });

  outputDataResultConsistently.textContent = result.join(' ');

  console.log('outputDataResult.textContent', outputDataResult.textContent);
  arrR.push(outputDataResult.textContent);

  return result;

};

const resetNumRandom = () => {
  console.log('reset');

  outputDataResult.textContent = 'Numbers';
  outputDataResultConsistently.textContent = 'Consistently';
  arrR = [];
  arrResult.textContent = ' ';
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
