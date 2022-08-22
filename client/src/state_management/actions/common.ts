import { resize } from "../../paperSizes";
import * as actionTypes from "../actionTypes";
import { cord, rect } from "../reducers/common";

export const setBoardFloatCord = (cord: cord) => ({
  type: actionTypes.SET_BOARD_FLOAT_CORD,
  payload: cord,
});

export const setSiteFloatCord = (cord: cord) => ({
  type: actionTypes.SET_SIDE_FLOAT_CORD,
  payload: cord,
});

export const setBoardPlacement = (rect: rect) => ({
  type: actionTypes.SET_BOARD_PLACEMENTS,
  payload: rect,
});

export const setPaperSize = (size: [number, number]) => ({
  type: actionTypes.SET_PAPER_SIZE,
  payload: size,
});

export const setResize = (data: resize) => ({
  type: actionTypes.SET_RESIZE,
  payload: data,
});
