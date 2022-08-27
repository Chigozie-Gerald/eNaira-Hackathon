import { ReactComponent as PinIcon } from "../../assets/pin.svg";
import { artboard_wrapper_paddingTop, rulerSize } from "../../paperSizes";
import "./Ruler.css";

const VertRule = ({
  totalScrollHeight,
  top,
  left,
}: {
  totalScrollHeight: number;
  left: number;
  top: number;
}) => {
  return (
    <div
      style={{
        width: rulerSize,
        paddingTop: rulerSize + artboard_wrapper_paddingTop,
      }}
      className="rulers vert"
    >
      <div
        style={{
          left: rulerSize,
          top: 0,
          bottom: 0,
          opacity: left > artboard_wrapper_paddingTop ? 1 : 0,
        }}
        className="shadow"
      ></div>
      <div
        style={{
          top: top * -1,
          height: totalScrollHeight,
        }}
        className="inner"
      ></div>
    </div>
  );
};

export default VertRule;
