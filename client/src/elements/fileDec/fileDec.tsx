import { ReactElement, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { stateType } from "../..";
import { getPaperSizes, paperSizes } from "../../paperSizes";
import { setPaperSize } from "../../state_management/actions";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import "./fileDec.css";

const FileDec = ({
  paperSize,
  setPaperSize,
}: {
  paperSize: [number, number];
  setPaperSize: (size: [number, number]) => void;
}) => {
  const minX = 100;
  const minY = 100;
  const containerRef = useRef<HTMLDivElement>(null);
  const [openExtra, setOpenExtra] = useState(false);
  const [y, setY] = useState(0);
  const [sizeX, setSizeX] = useState(paperSize[0] || minX);
  const [sizeY, setSizeY] = useState(paperSize[1] || minY);

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenExtra(false);
      }
    };

    document.addEventListener("click", outSideClick);

    return () => {
      document.removeEventListener("click", outSideClick);
    };
  }, []);

  return (
    <>
      <div className="fileDec cont">
        <div className="title">Paper</div>
        <div className="size_container">
          <div ref={containerRef} className="size">
            <div
              onClick={(e) => {
                setY(e.currentTarget.getBoundingClientRect().top);
                setOpenExtra(!openExtra);
              }}
              className={`inner ${openExtra ? `focused` : ``}`}
            >
              <span className="fileDec_type">
                {getPaperSizes(paperSize) || `Custom`}
              </span>
              <span className="fileDec_size">
                {paperSize[0]} x {paperSize[1]}
              </span>
            </div>
          </div>
        </div>
      </div>
      {openExtra && (
        <Floater y={y}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fileDec_list ${openExtra ? `` : `noShow`}`}
          >
            <div className="default_list">
              <div className="titleHead">Paper sizes</div>
              {Object.keys(paperSizes).map((key, n) => {
                const value = paperSizes[key as keyof typeof paperSizes];
                const width = value[0];
                const height = value[1];
                const selected =
                  value[0] === paperSize[0] && value[1] === paperSize[1];
                return (
                  <div
                    onClick={() => {
                      setOpenExtra(false);
                      setPaperSize(value);
                    }}
                    key={n}
                    className={`fileDec_file_list_wrapper ${
                      selected ? `selected` : ``
                    }`}
                  >
                    <div>{key}</div>
                    <div>
                      {width} x {height}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="fileDec_custom_file_size">
              <span className="titleHead">Custom Size</span>
              <div className="field_wrapper">
                <div className="x flex1">
                  <span>X</span>
                  <input
                    onChange={(e) => {
                      setSizeX(parseInt(e.target.value) || minX);
                    }}
                    onBlur={() => {
                      if (sizeX < minX) {
                        setSizeX(minX);
                      }
                    }}
                    type="number"
                    className="flex1"
                    value={sizeX}
                  />
                </div>
                <div className="y flex1">
                  <span>Y</span>
                  <input
                    onChange={(e) => {
                      setSizeY(parseInt(e.target.value) || minY);
                    }}
                    onBlur={() => {
                      if (sizeY < minY) {
                        setSizeY(minY);
                      }
                    }}
                    type="number"
                    className="flex1"
                    value={sizeY}
                  />
                </div>
                <div
                  onClick={() => {
                    setOpenExtra(false);
                    setPaperSize([sizeX, sizeY]);
                  }}
                  className="img_div_contain center fileDec_icon_wrapper"
                >
                  <CheckIcon />
                </div>
              </div>
            </div>
          </div>
        </Floater>
      )}
    </>
  );
};

const mapStateToProps = (state: stateType) => ({
  paperSize: state.commonReducer.paperSize,
});

const mapDispatchToProps = (dispatch: any) => ({
  setPaperSize: (size: [number, number]) => {
    dispatch(setPaperSize(size));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FileDec);

export const Floater = ({
  y,
  children,
}: {
  y: number;
  children: ReactElement;
}) => {
  return (
    <div
      style={{
        paddingTop: `calc(${y}px - 8px)`,
      }}
      className="sidebarFloat"
    >
      <div className="floatWrap inner scrollWheelSm">{children}</div>
    </div>
  );
};
