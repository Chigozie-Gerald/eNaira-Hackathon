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
