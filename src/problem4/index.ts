function sum_to_n_a(n: number): number {
  let sum: number = 0;
  for (let index = 1; index <= n; index++) {
    sum += index;
  }
  return sum;
}

function sum_to_n_b(n: number): number {
  let sum: number = 0;
  let index: number = 1;
  while (index <= n) {
    sum += index;
    index++;
  }
  return sum;
}

function sum_to_n_c(n: number): number {
  let sum: number = 0;
  let index: number = 1;
  do {
    sum += index;
    index++;
  } while (index <= n);
  return sum;
}

const sumA = sum_to_n_a(5);
const sumB = sum_to_n_b(5);
const sumC = sum_to_n_c(5);

console.log("sum_to_n_a: ", sumA);
console.log("sum_to_n_b: ", sumB);
console.log("sum_to_n_c: ", sumC);
