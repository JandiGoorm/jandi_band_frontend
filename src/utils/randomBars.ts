const colorOptions = [
  "#fdd",
  "#def",
  "#e6f7eb",
  "#d0eaf8",
  "#ffe4b5",
  "#f0e68c",
  "#d8bfd8",
];

const getRandomHeight = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomColor = (): string =>
  colorOptions[Math.floor(Math.random() * colorOptions.length)];

export const randomBars = (count: number = 4) => {
  return Array.from({ length: count }).map(() => ({
    height: getRandomHeight(40, 90),
    color: getRandomColor(),
  }));
};
