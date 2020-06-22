const singleDigitNumberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const wordsForNumbersBetweenNineAndTwenty = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const wordsForTens = [
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const wordForHundred = "hundred";

class NumberLengthCalculator {
  constructor(number) {
    const numberOfDigits = `${number}`.length;

    let writtenNumber = "";
    if (numberOfDigits < 2) {
      writtenNumber = this.getWordForNumberWithOneDigit(number);
    } else if (numberOfDigits < 3) {
      writtenNumber = this.getWordForNumberWithTwoDigits(number);
      // It's a number between 99 and 1000
    } else if (numberOfDigits < 4) {
      writtenNumber = this.getWordForNumberWithThreeDigits(number);
    }
    console.log(
      `The number ${number} is written as '${writtenNumber}' and has ${writtenNumber.length} characters!`
    );
  }

  getWordForNumberWithOneDigit(number) {
    if (`${number}`.length !== 1) {
      throw "You specified an invalid number!";
    }

    return singleDigitNumberWords[number - 1];
  }

  getWordForNumberWithTwoDigits(number) {
    if (`${number}`.length !== 2) {
      throw "You specified an invalid number!";
    }

    let writtenNumber = "";
    if (number > 9 && number < 20) {
      writtenNumber = wordsForNumbersBetweenNineAndTwenty[number - 10];
      // It's a number between 19 and 100
    } else {
      const secondDigit = ~~`${number}`[1];
      // These are combinations of tens and single digits
      // The first written number in the tens array is twenty, whose first digit is 2. So when the first digit is 2 we need the index 0
      const tenIndex = ~~`${number}`[0] - 2;
      if (secondDigit > 0) {
        const singleDigitIndex = ~~`${number}`[1] - 1;
        writtenNumber = `${wordsForTens[tenIndex]} ${singleDigitNumberWords[singleDigitIndex]}`;
      } else {
        writtenNumber = `${wordsForTens[tenIndex]}`;
      }
    }

    return writtenNumber;
  }

  getWordForNumberWithThreeDigits(number) {
    if (`${number}`.length !== 3) {
      throw "You specified an invalid number!";
    }

    let writtenNumber = "";
    // The first word for a hundred is the word for a single digit number (eg. two hundred)
    const singleDigitIndex = ~~`${number}`[0] - 1;
    console.log(singleDigitIndex);
    writtenNumber = `${singleDigitNumberWords[singleDigitIndex]} ${wordForHundred}`;

    // If the two last digits are not two zeros, we need more words!
    const lastTwoDigitsNumber = ~~`${number}`.substring(1);
    if (lastTwoDigitsNumber > 0) {
      if (`${lastTwoDigitsNumber}`.length > 1) {
        writtenNumber = `${writtenNumber} and ${this.getWordForNumberWithTwoDigits(
          lastTwoDigitsNumber
        )}`;
      } else {
        writtenNumber = `${writtenNumber} and ${this.getWordForNumberWithOneDigit(
          lastTwoDigitsNumber
        )}`;
      }
    }

    return writtenNumber;
  }
}
