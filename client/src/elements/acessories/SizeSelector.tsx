import { useEffect, useRef, useState } from "react";
import "./SizeSelector.css";
import { ReactComponent as ExpandIcon } from "../../assets/triangle.svg";
import SvgHolder from "../../UI/SvgHolder/SvgHolder";
import { stateType } from "../..";
import { getResizeHolder, resize, size } from "../../paperSizes";
import { setResize } from "../../state_management/actions";
import { connect } from "react-redux";

const SizeSelector = ({
  setResize,
  resize,
}: {
  setResize: (data: resize) => void;
  resize: resize;
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setShowExtra(false);
      }
    };
    document.addEventListener("click", outSideClick);
    return () => {
      document.removeEventListener("click", outSideClick);
    };
  }, []);

  return (
    <div ref={listRef} className="sizeSelector">
      <div className={`inner ${showExtra ? `open` : ``}`}>
        <div
          onClick={(e) => {
            setShowExtra(!showExtra);
          }}
          className="item"
        >
          {getResizeHolder(resize)}
        </div>
        {showExtra && (
          <div className="item_wrapper scrollWheelSm">
            <div className="custom_wrapper">
              <div onMouseOver={(e) => {}} className="custom">
                <div className="floatContainer"></div>
                <div className="custom_size">Custom</div>
                <SvgHolder height={8} width={8}>
                  <ExpandIcon />
                </SvgHolder>
              </div>
            </div>
            {size.map((sizeObj, n) => {
              return (
                <div
                  onClick={() => setResize(sizeObj.value)}
                  key={n}
                  className="item"
                >
                  {sizeObj.holder}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: stateType) => ({
  resize: state.commonReducer.resize,
});

const mapDispatchToProps = (dispatch: any) => ({
  setResize: (data: resize) => dispatch(setResize(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SizeSelector);
