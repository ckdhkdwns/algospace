export default function getSum(a: number, b: number) {
  let min = Math.min(a, b); // a와 b 중 작은 값
  let max = Math.max(a, b); // a와 b 중 큰 값
  let sum = 0;

  for (let i = min; i <= max; i++) {
    // 작은 값부터 큰 값까지
    sum += i; // 더하기
  }
  return sum;
}
