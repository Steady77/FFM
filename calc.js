function calc(operator, a, b) {
   let result;

   if (typeof a !== 'number' || typeof b !== 'number') {
      return 'Error';
   }

   switch (operator) {
      case 'sum':
         result = a + b;
         break;
      case 'multi':
         result = a * b;
         break;
      case 'subtr':
         result = a - b;
         break;
      case 'divide':
         result = b !== 0 ? a / b : 'Division by zero';
         break;
      case 'pow':
         result = a ** b;
         break;
      case 'rem':
         result = a % b;
         break;
      default:      
         return 'Unknown operator';
   }

   if (result !== result) {
      return 'Result is not a number';
   }

   return result;
}

console.log(calc('pow', NaN, 5));
console.log(calc('divide', 2, 0));
console.log(calc('rem', 2, 0));
console.log(calc('subtr', 1, '3'));
console.log(calc(2, 1, 2));
console.log(calc());
