export const generateOrderedArray = (count: number) => {
  const result: number[] = [];
  for (let i = 1; i <= count; i++) {
    if (i % 10 === 1) {
      result.push(Math.ceil(i / 10));
    }
  }
  return result;
};
