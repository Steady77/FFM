function calc(operator, a, b) {
   
   if (typeof a !== 'number' || typeof b !== 'number') {
      return 'Error';
   }

   const operations = {
      sum: a + b,
      mult: a * b,
      sub: a - b,
      div: b === 0 ? 'Divided by zero' : a / b,
      pow: a ** b,
      rem: a % b,
   };
   
   if (operations[operator] !== operations[operator]) {
      return 'Result is not a number';
   }
   
   if (operator in operations) {
      return operations[operator];
   } else {
      return 'Unknown operator';
   }
}


console.log(calc('pow', NaN, 5));
console.log(calc('div', 5, 0));
console.log(calc('rem', 5, '6'));
console.log(calc('', 5, 3));
console.log(calc());
