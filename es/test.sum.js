function sum(num1, num2) {
  const arry1 = Array.from(num1).map((item) => +item);
  const arry2 = Array.from(num2).map((item) => +item);
  const maxLen = Math.max(arry1.length, arry2.length) + 1;
  const result = [];
  let flag = false;
  for (let i = 0; i < maxLen; i++) {
    const n1_last = arry1[arry1.length - 1 - i] || 0;
    const n2_last = arry2[arry2.length - 1 - i] || 0;
    const sum = n1_last + n2_last + (flag ? 1 : 0);
    if (sum > 9) {
      flag = true;
    } else {
      flag = false;
    }
    if (sum) {
      result.unshift(sum % 10);
    }
  }
  return result.join("");
}

const n6 = sum("20367831", "1214319186");
console.log(n6);
console.log(20367831 + 1214319186);
