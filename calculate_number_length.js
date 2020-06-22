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

const wordsForNumbersBetweenTenAndNineteen = [
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
const wordForThousand = "thousand";

class NumberLengthCalculator {
  calculateNumberOfLettersInWrittenNumber(number) {
    const numberOfDigits = `${number}`.length;

    let writtenNumber = "";
    writtenNumber = this.getWordForNumber(number);
    const writtenNumberWithoutHyphensOrWhitespace = `${writtenNumber.replace(
      /[\s-]+/g,
      ""
    )}`;

    console.log(
      `The number ${number} is written as '${writtenNumber}' and has ${writtenNumberWithoutHyphensOrWhitespace.length} characters!`
    );

    return writtenNumberWithoutHyphensOrWhitespace.length;
  }

  calculateNumberOfLettersInWrittenNumbersBetween(start, end) {
    let numberOfLetters = 0;
    for (let i = start; i < end + 1; i++) {
      numberOfLetters += numberLengthCalculator.calculateNumberOfLettersInWrittenNumber(
        i
      );
    }
    return numberOfLetters;
  }

  getWordForNumber(number) {
    let writtenNumber = "";
    switch (`${number}`.length) {
      case 1:
        writtenNumber = this.getWordForNumberWithOneDigit(number);
        break;
      case 2:
        writtenNumber = this.getWordForNumberWithTwoDigits(number);
        break;
      case 3:
        writtenNumber = this.getWordForNumberWithThreeDigits(number);
        break;
      case 4:
        writtenNumber = this.getWordForNumberWithFourDigits(number);
        break;
      default:
        throw "Getting the word for a number with this many digits is not supported!";
    }
    return writtenNumber;
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
      writtenNumber = wordsForNumbersBetweenTenAndNineteen[number - 10];
      // It's a number between 21 and 99
    } else {
      const secondDigit = ~~`${number}`[1];
      // These are combinations of tens and single digits
      // The first written number in the tens array is twenty, whose first digit is 2. So when the first digit is 2 we need the index 0
      const tenIndex = ~~`${number}`[0] - 2;
      if (secondDigit > 0) {
        const singleDigitIndex = ~~`${number}`[1] - 1;
        // Numbers between 21 and 99 always have a hyphen '-'
        writtenNumber = `${wordsForTens[tenIndex]}-${singleDigitNumberWords[singleDigitIndex]}`;
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
    // The first word for a hundred is always the word for a single digit number (eg. two hundred, three hundred)
    const singleDigitIndex = ~~`${number}`[0] - 1;
    writtenNumber = `${singleDigitNumberWords[singleDigitIndex]} ${wordForHundred}`;

    // If the two last digits are not two zeros, it means we need to append the word for a two or one digit word (we use the same logic to keep stuff DRY!)
    const lastTwoDigitsNumber = ~~`${number}`.substring(1);
    if (lastTwoDigitsNumber > 0) {
      writtenNumber = `${writtenNumber} and ${this.getWordForNumber(
        lastTwoDigitsNumber
      )}`;
    }

    return writtenNumber;
  }

  getWordForNumberWithFourDigits(number) {
    if (`${number}`.length !== 4) {
      throw "You specified an invalid number!";
    }

    let writtenNumber = "";
    // The first word for a thousand is always the word for a single digit number (eg. two thousand, three thousand)
    const singleDigitIndex = ~~`${number}`[0] - 1;
    writtenNumber = `${singleDigitNumberWords[singleDigitIndex]} ${wordForThousand}`;

    // If the three last digits are not three zeros, it means we need to append the word for a three digit, two digit or one digit word
    const lastThreeDigitsNumber = ~~`${number}`.substring(1);
    if (lastThreeDigitsNumber > 0) {
      writtenNumber = `${writtenNumber}, ${this.getWordForNumber(
        lastThreeDigitsNumber
      )}`;
    }

    return writtenNumber;
  }
}
