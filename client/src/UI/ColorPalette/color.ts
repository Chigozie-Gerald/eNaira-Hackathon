export type scheme = [number, number, number];

const topValue = 255;

export const colorArray: scheme[] = [
  [topValue, 0, 0],
  [topValue, topValue, 0],
  [0, topValue, 0],
  [0, topValue, topValue],
  [0, 0, topValue],
  [topValue, 0, topValue],
  [topValue, 0, 0],
];

const getBoundary = (
  y: number,
  height: number
): {
  boundary: [scheme | null, scheme | null];
  ratio: number;
  index: number;
} => {
  const div = colorArray.length - 1;
  const unit = height / div;
  const index_raw = y / unit;
  const index = Math.floor(index_raw) % div;
  const ratio = (y - index * unit) / unit;

  const first_boundary = !y || !ratio ? null : colorArray[index];
  const second_boundary: scheme | null =
    y === height || !ratio ? null : colorArray[index + 1];
  return { boundary: [first_boundary, second_boundary], ratio, index };
};

const getDif = (
  bound1: scheme,
  bound2: scheme
): { rgb_index: number; descend: boolean } => {
  let rgb_index = 0;
  let descend = true;
  for (let i = 0; i < bound1.length; i++) {
    const num1 = bound1[i];
    const num2 = bound2[i];
    if (num1 == num2) {
      continue;
    } else {
      rgb_index = i;
      descend = num1 > num2;
      break;
    }
  }
  return { rgb_index, descend };
};

const getRangeValue = (index: number, descend: boolean, ratio: number) => {
  const start = 0;
  const stop = topValue;
  const ratio_value = (stop - start) * ratio;
  return descend ? stop - ratio_value : start + ratio_value;
};

const getColorArray = (y: number, height: number): scheme => {
  const { boundary, index, ratio } = getBoundary(y, height);
  if (!ratio) {
    return colorArray[index];
  } else {
    // get the value that is different between boundaries
    const { descend, rgb_index } = getDif(boundary[0]!, boundary[1]!);
    const value = Math.round(getRangeValue(rgb_index, descend, ratio));
    let newValueArray: scheme = [...boundary[0]!];
    newValueArray[rgb_index] = value;
    // get the ratio
    //apply the ratio to the difference
    return newValueArray;
  }
};

/**
 * This is like a reLu equation but with an upper boundary
 * @param value This is the value to normalize
 * @param max The maximum result after normalization
 * @returns normalized value e.g if value is 10 and maximum is 8, returned value will be 8. If value is -10, return value will be 0
 */
const normalize = (value: number, max: number): number => {
  if (value < 0) {
    return 0;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
};

export const getColor = (y: number, height?: number): { array: scheme } => {
  if (height) {
    y = normalize(y, height);
    const array = getColorArray(y, height);
    return { array };
  } else {
    const array = colorArray[0];
    return { array };
  }
};

export const getOpacity = (y: number, height: number): number => {
  if (!height || height < 0) {
    height = 1;
  }
  y = normalize(y, height);
  return Number(Math.abs((y - height) / height).toFixed(2));
};

/**
 * Get the absolute value of a number
 * @param value This is the value whose absolute we want to get
 * @returns This returns a positive integer ignoring whether it is signed or unsigned e.g 10 will return 10. -10 will also return 10
 */
const abs = (value: number) => {
  return Math.abs(value);
};

export const cordColor = (
  x: number,
  y: number,
  height: number,
  width: number
): [number, number] => {
  const xBar = abs(x - width);
  const yBar = abs(y - height);
  const X = (xBar / width) * topValue;
  const Y = (yBar / height) * topValue;
  return [X, Y];
};

/**
 * This gets the highest and lowest numbers in an array
 * @param array This is an array of numbers.
 * @returns An object with keys biggest and smallest whose values are the biggest and smallest values in `array`
 */
const getRange = (array: scheme): { biggest: number; smallest: number } => {
  let biggest = array[0];
  let smallest = array[0];

  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    if (num < smallest) {
      smallest = num;
    }
    if (num > biggest) {
      biggest = num;
    }
  }

  return { biggest, smallest };
};

/**
 * Gets the indexes of the biggest and the smallest numbers in an array
 * @param array Array of numbers
 * @returns An object bearing the indexes of the biggest and smallest number.
 */
const getRangeIndex = (
  array: scheme
): { biggest: number; smallest: number } => {
  let biggest = 0;
  let smallest = 0;

  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    const checkSmall = array[smallest];
    const checkBig = array[biggest];

    if (num < checkSmall) {
      smallest = i;
    }
    if (num > checkBig) {
      biggest = i;
    }
  }

  return { biggest, smallest };
};

/**
 * Gets the root value of a color for a number at a particular index
 * @param value Any RGB value in a [255 x 255] plane
 * @param range smallest and biggest number in the RGB color array [`number`, `number`, `number`]
 * @returns Modified value transformed to range between 0 and 255. In other words, the root individual value
 */
const modify = (
  value: number,
  range: { smallest: number; biggest: number }
): number => {
  const { smallest, biggest } = range;

  return Math.round(
    topValue * ((value - smallest) / (biggest - smallest)) || 0
  );
};

/**
 * Get the top-right origin value of the color
 * @param modColor RGB color value
 * @returns The value of the color at the top-right origin
 */
const getRootColor = (modColor: scheme, Root: scheme) => {
  let color = modColor;

  const R = modColor[0];
  const G = modColor[1];
  const B = modColor[2];

  const range = getRange(modColor);

  //According to derived formula
  color = [modify(R, range), modify(G, range), modify(B, range)];

  const result = colorArray.find((arr, n) => {
    const R1 = color[0];
    const G1 = color[1];
    const B1 = color[2];

    const R2 = arr[0];
    const G2 = arr[1];
    const B2 = arr[2];

    return R1 === R2 && G1 === G2 && B1 === B2;
  });
  if (result) {
    return color;
  } else {
    return Root;
  }
};

/**
 * Function to transform an RGB (mid) value to new value based on x and y walks
 * @param rootMid The middle highest value in a 1x3 array of numbers
 * @param x The X walks (coordinates) on the number from the `bottom-right` origin
 * @param y The Y walks (coordinates) on the number from the `bottom-right` origin
 * @returns The new middle value taking into account the works
 */
const modifiedMidValue = (rootMid: number, x: number, y: number): number => {
  const frameX = topValue - rootMid; // Distance from left to right (Recall the right is 255)
  const frameY = rootMid; // Distance from top to bottom (Recall the bottom is 0)

  const X_move = x; // X value from the right of the frame
  const Y_move = topValue - y; // Y value from the top of the frame

  const X_bar = (X_move / topValue) * frameX; // Amount gain in the X direction (because a movement rightwards in the X direction indicates an increase)
  const Y_bar = (Y_move / topValue) * frameY * -1; // Amount lost in the Y direction (because a movement downwards in the Y direction indicates a reduction)

  return rootMid + X_bar + Y_bar;
};

/**
 * Get new color array based on X and Y position of the clicked color frame
 * @param X X value in a [255 x 255] plane with origin at bottom right. (This value must be **`modified`**)
 * @param Y Y value in a [255 x 255] plane with origin at bottom right
 * @param colorValue RGB color
 * @returns New RGB color array
 */
const frame_color_array = (
  X: number,
  Y: number,
  colorValue: scheme,
  Root: scheme
): { rgb: scheme; root: scheme } => {
  // Get origin
  let root = getRootColor(colorValue, Root);
  const rgb: scheme = [...root];

  const { biggest, smallest } = getRangeIndex(rgb);

  for (let i = 0; i < rgb.length; i++) {
    if (i === smallest) {
      rgb[i] = Math.round(X);
    } else if (i === biggest) {
      rgb[i] = Math.round(Y);
    } else {
      rgb[i] = Math.round(modifiedMidValue(rgb[i], X, Y));
    }
  }

  return { rgb, root };
};

/**
 * Ratio the `x` in terms of `y`
 * @param x X value to modify (cartisian plane values)
 * @param y Y value to use for modification (cartisian plane values)
 * @returns Modifies `x` value
 */
const modifyX = (x: number, y: number): number => {
  return (x / topValue) * y;
};

/**
 * Get the new RGB color based on where was clicked in the frame
 * @param x Distance between the left side of the frame and the `point` clicked on the frame in the horizontal axis
 * @param y Distance of between the top of frame to the `point` clicked on the frame in the vertical axis
 * @param height Height of plane
 * @param width Width of color frame
 * @param colorValue Initial color before click
 * @returns Returns new color `string` and new color array values `[number, number, number]`
 */
export const frame_color = (
  x: number,
  y: number,
  height: number,
  width: number,
  colorValue: scheme,
  root: scheme
): { array: scheme; root: scheme } => {
  y = normalize(abs(y - Math.floor(height)) /*inverse start points */, height);
  x = normalize(abs(x - Math.floor(width)) /*inverse start points */, width);

  const Y = (y / height) * topValue; // Transforms the Y value to fall between 0 and 255
  const X = modifyX(
    (x / width) *
      topValue /* Transforms the Y value to fall between 0 and 255 */,
    Y
  ); // Modify the transformed X value to fall between 0 and Y

  const frameObj = frame_color_array(X, Y, colorValue, root);
  const root_array = frameObj.root;
  const array = frameObj.rgb;

  return { array, root: root_array };
};

export const luminance = (rgb: scheme): boolean => {
  const R = rgb[0];
  const G = rgb[1];
  const B = rgb[2];
  const Y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  const least_bright = 0.6 * topValue;
  return Y >= least_bright;
};
