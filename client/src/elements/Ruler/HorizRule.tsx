import { useState } from "react";
import { ReactComponent as PinIcon } from "../../assets/pin.svg";
import {
  artboard_wrapper_side_padding,
  artboard_wrapper_paddingLeft,
  artboard_wrapper_paddingRight,
  artboard_wrapper_paddingTop,
  rulerSize,
} from "../../paperSizes";
import "./Ruler.css";

const HorizRule = ({
  totalScrollHeight,
  totalScrollWidth,
  top,
  left,
}: {
  totalScrollHeight: number;
  totalScrollWidth: number;
  left: number;
  top: number;
}) => {
  const [leftLine, setLeftLine] = useState(false);
  const [rightLine, setRightLine] = useState(false);

  return (
    <div
      style={{
        height: rulerSize,
      }}
      className="rulers horiz"
    >
      <div
        style={{
          top: rulerSize,
          left: 0,
          right: 0,
          opacity: top > artboard_wrapper_paddingTop ? 1 : 0,
        }}
        className="shadow"
      ></div>

      <div
        style={{
          padding: `0 ${artboard_wrapper_side_padding + rulerSize}px`,
        }}
        className="roller"
      >
        <div
          style={{
            left: left * -1,
            width: totalScrollWidth,
          }}
          className="inner"
        >
          <div
            style={{ left: artboard_wrapper_paddingLeft + 0.5 - 8 }}
            className="artboard_pin_wrapper left"
          >
            <PinIcon
              onMouseDown={() => {
                setLeftLine(true);
              }}
              onMouseUp={() => {
                setLeftLine(false);
              }}
              className="artboard_pin img_div_contain"
            />
          </div>
          <div
            style={{ right: artboard_wrapper_paddingRight + 0.5 - 8 }}
            className="artboard_pin_wrapper right"
          >
            <PinIcon
              onMouseDown={() => {
                setRightLine(true);
              }}
              onMouseUp={() => {
                setRightLine(false);
              }}
              className="artboard_pin img_div_contain"
            />
          </div>
        </div>
        <div
          style={{
            left: left * -1,
            width: totalScrollWidth,
            height: totalScrollHeight,
          }}
          className="ruler_inner"
        >
          {leftLine && (
            <div
              style={{
                left: artboard_wrapper_paddingLeft,
              }}
              className="line left"
            ></div>
          )}
          {rightLine && (
            <div
              style={{
                right: artboard_wrapper_paddingRight,
              }}
              className="line right"
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizRule;
