import { paperSizes, resize } from "../../paperSizes";
import * as actionTypes from "../actionTypes";

export type rect =
  | undefined
  | {
      bottom: number;
      height: number;
      left: number;
      right: number;
      top: number;
      width: number;
      x: number;
      y: number;
    };

export type floatWidget =
  | {
      top: number | string;
      left: number | string;
      bottom?: never;
      right?: never;
    }
  | {
      top: number | string;
      right: number | string;
      bottom?: never;
      left?: never;
    }
  | {
      bottom: number | string;
      left: number | string;
      top?: never;
      right?: never;
    }
  | {
      bottom: number | string;
      right: number | string;
      top?: never;
      left?: never;
    }
  | undefined;

export type cord = [number, number] | undefined;

const initialState: {
  boardFloatCord: cord;
  sideFloatCord: cord;
  boardPlacement: rect | null;
  paperSize: [number, number];
  resize: resize;
} = {
  boardFloatCord: undefined,
  sideFloatCord: undefined,
  boardPlacement: null,
  paperSize: paperSizes.A4,
  resize: 100,
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
): typeof initialState => {
  switch (action.type) {
    case actionTypes.SET_BOARD_FLOAT_CORD: {
      return {
        ...state,
        boardFloatCord: action.payload ? [...action.payload] : action.payload,
      };
    }
    case actionTypes.SET_SIDE_FLOAT_CORD: {
      return {
        ...state,
        sideFloatCord: action.payload ? [...action.payload] : action.payload,
      };
    }
    case actionTypes.SET_BOARD_PLACEMENTS: {
      return {
        ...state,
        boardPlacement: Object(action.payload),
      };
    }
    case actionTypes.SET_PAPER_SIZE: {
      return {
        ...state,
        paperSize: [...action.payload] as [number, number],
      };
    }
    case actionTypes.SET_RESIZE: {
      return {
        ...state,
        resize: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
