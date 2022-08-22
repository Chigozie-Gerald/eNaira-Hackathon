type paperType = `A2` | `A3` | `A4` | `A5`;

export const paperSizes: { [key in paperType]: [number, number] } = {
  A2: [420, 594],
  A3: [297, 420],
  A4: [210, 297],
  A5: [148, 210],
};

export const getPaperSizes = (size: [number, number]): null | paperType => {
  let result = null;
  for (const key in paperSizes) {
    const value = paperSizes[key as keyof typeof paperSizes];
    if (size[0] === value[0] && size[1] === value[1]) {
      result = key as paperType;
      break;
    }
  }
  return result;
};

export const size: { holder: string; value: resize }[] = [
  { holder: `50%`, value: 50 },
  { holder: `75%`, value: 75 },
  { holder: `100%`, value: 100 },
  { holder: `125%`, value: 125 },
  { holder: `150%`, value: 150 },
  { holder: `200%`, value: 200 },
  { holder: `Fit Page`, value: `fit` },
  { holder: `Full`, value: `full` },
];

export const getResizeHolder = (data: resize): string => {
  console.log(data, `resize`);
  const result = size.find((obj) => {
    return obj.value === data;
  });
  if (result) {
    return result.holder;
  } else {
    return `${(data || 100).toString()}%`;
  }
};

export const mmToPxRatio = 3.7795275591;

export type resize = `full` | `fit` | number;
