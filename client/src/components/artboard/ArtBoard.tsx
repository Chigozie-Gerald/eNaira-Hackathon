import React, { useMemo, useState } from "react";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { stateType } from "../..";
import FloatWidget from "../../elements/floatWidget/FloatWidget";
import { mmToPxRatio, resize } from "../../paperSizes";
import {
  setBoardFloatCord,
  setBoardPlacement,
} from "../../state_management/actions";
import { cord, rect } from "../../state_management/reducers/common";
import "./ArtBoard.css";

const rulerSize = 16;
const padding = 16 * 6;
const paddingTop = 16 * 1;

const ArtBoard = ({
  setCoordinates,
  setBoardPlacement,
  paperSize,
  resize,
}: {
  setCoordinates: (cord: cord) => void;
  setBoardPlacement: (rect: rect) => void;
  paperSize: [number, number];
  resize: resize;
}) => {
  const [height, setHeight] = useState<number | null>(null);
  const [totalHeight, setTotalHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState<number>();
  const [top, setTop] = useState<number>();

  useEffect(() => {
    const getRect = () => {
      const rect = boardRef.current?.getBoundingClientRect();
      setBoardPlacement(rect);
    };
    getRect();
    window.addEventListener("resize", getRect);

    return () => {
      window.addEventListener("resize", getRect);
    };
  }, [setBoardPlacement]);

  useEffect(() => {
    const handleDimensions = () => {
      setHeight(artboardHeight());
      setTotalHeight(artboardTotalHeight());
      setWidth(artboardWidth());
    };
    handleDimensions();
    draw();
    window.addEventListener("resize", handleDimensions);
    return () => {
      window.removeEventListener("resize", handleDimensions);
    };
  }, []);

  const artboardHeight = (): number | null => {
    const height = boardRef.current?.getBoundingClientRect().height;
    const topPad = window.getComputedStyle(boardRef.current!)?.paddingTop;
    const bottomPad = window.getComputedStyle(boardRef.current!)?.paddingBottom;
    if (height && topPad && bottomPad) {
      const innerHeight = height - (parseInt(topPad) + parseInt(bottomPad));
      return innerHeight;
    } else {
      return null;
    }
  };

  const artboardTotalHeight = (): number | null => {
    const height = boardRef.current?.scrollHeight;
    if (height) {
      return height;
    } else {
      return null;
    }
  };

  const artboardWidth = (): number | null => {
    const width = boardRef.current?.getBoundingClientRect().width;
    const leftPad = window.getComputedStyle(boardRef.current!)?.paddingLeft;
    const rightPad = window.getComputedStyle(boardRef.current!)?.paddingRight;
    if (width && leftPad && rightPad) {
      const innerWidth = width - (parseInt(leftPad) + parseInt(rightPad));
      return innerWidth;
    } else {
      return null;
    }
  };

  const getDimensions = () => {
    let Height = paperSize[1] * mmToPxRatio - rulerSize;
    let Width = paperSize[0] * mmToPxRatio - rulerSize;
    if (resize === "fit") {
      const screenRatio = width || 0 / (height || 0);
      const canvasRatio = Width / Height;
      if (screenRatio) {
        if (canvasRatio > screenRatio) {
          const W = Width;
          Width = width!;
          Height = (Width / W) * Height;
        } else if (screenRatio > canvasRatio) {
          const H = Height;
          Height = height!;
          Width = (Height / H) * Width;
        }
      }
    } else if (resize === "full") {
      Width = width ? width - 16 - 2 : Width;
      //16 removed to account for scrollbar
      //2 removed to account for border
      Height = (Width / (width || Width)) * Height;
    } else {
      if (typeof resize === "number" && resize > 0) {
        Height = (paperSize[1] * mmToPxRatio * resize) / 100;
        Width = (paperSize[0] * mmToPxRatio * resize) / 100;
      }
    }
    return {
      Height,
      Width,
    };
  };

  const draw = () => {
    const Canvas = document.getElementById(
      `canvas_pdf__0`
    ) as HTMLCanvasElement | null;
    const canvas = Canvas?.getContext("2d");
    if (canvas) {
      canvas.fillStyle = `#eee`;
      canvas.fillRect(16, 16, getDimensions().Width - 32, 100);
    }
  };

  return (
    <div
      style={{
        paddingTop: rulerSize,
        paddingLeft: rulerSize,
      }}
      className="artboard flex1"
    >
      <Rulers
        totalScrollHeight={totalHeight || 0}
        totalScrollWidth={getDimensions().Width}
        left={left || 0}
        top={top || 0}
      />
      <div
        ref={boardRef}
        style={{
          padding: `${paddingTop}px ${padding}px`,
        }}
        onContextMenu={(e) => {
          const rect = (e.currentTarget as Element).getBoundingClientRect();
          e.preventDefault();
          e.stopPropagation();
          setCoordinates([e.clientX - rect.x, e.clientY - rect.y]);
        }}
        onScroll={(e) => {
          setTop((e.target as Element).scrollTop);
          setLeft((e.target as Element).scrollLeft);
        }}
        className="artboard_inner scrollWheel"
      >
        <div className="inner">
          {Array(2)
            .fill(0)
            .map((num, n) => {
              return (
                <React.Fragment key={n}>
                  <canvas
                    id={`canvas_pdf__${n}`}
                    width={getDimensions().Width}
                    height={getDimensions().Height}
                  ></canvas>
                </React.Fragment>
              );
            })}
        </div>
      </div>
      <FloatWidget />
    </div>
  );
};

const mapStateToProps = (state: stateType) => ({
  paperSize: state.commonReducer.paperSize,
  resize: state.commonReducer.resize,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCoordinates: (cord: cord) => {
    dispatch(setBoardFloatCord(cord));
  },
  setBoardPlacement: (rect: rect) => {
    dispatch(setBoardPlacement(rect));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtBoard);

const Rulers = ({
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
  return (
    <>
      <div
        style={{
          width: rulerSize,
          paddingTop: rulerSize + paddingTop,
        }}
        className="rulers vert"
      >
        <div
          style={{
            left: rulerSize,
            top: 0,
            bottom: 0,
            opacity: left > paddingTop ? 1 : 0,
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
            opacity: top > paddingTop ? 1 : 0,
          }}
          className="shadow"
        ></div>

        <div
          style={{
            padding: `0 ${padding + rulerSize}px`,
          }}
          className="roller"
        >
          <div
            style={{
              left: left * -1,
              width: totalScrollWidth,
            }}
            className="inner"
          ></div>
        </div>
      </div>
    </>
  );
};
