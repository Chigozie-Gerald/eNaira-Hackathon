import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { stateType } from "../..";
import FloatWidget from "../../elements/floatWidget/FloatWidget";
import {
  mmToPxRatio,
  artboard_wrapper_side_padding,
  artboard_wrapper_paddingLeft,
  artboard_wrapper_paddingRight,
  artboard_wrapper_paddingTop,
  resize,
  rulerSize,
} from "../../paperSizes";
import { ReactComponent as PinIcon } from "../../assets/pin.svg";
import {
  setBoardFloatCord,
  setBoardPlacement,
} from "../../state_management/actions";
import { cord, rect } from "../../state_management/reducers/common";
import "./ArtBoard.css";
import Canvas from "../../elements/Canvas/Canvas";
import VertRule from "../../elements/Ruler/VertRule";
import HorizRule from "../../elements/Ruler/HorizRule";

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
    window.addEventListener("resize", handleDimensions);
    return () => {
      window.removeEventListener("resize", handleDimensions);
    };
  }, []);

  const artboardHeight = (): number | null => {
    if (boardRef.current) {
      const height = boardRef.current?.getBoundingClientRect().height;
      const topPad = window.getComputedStyle(boardRef.current!)?.paddingTop;
      const bottomPad = window.getComputedStyle(
        boardRef.current!
      )?.paddingBottom;
      if (height && topPad && bottomPad) {
        const innerHeight = height - (parseInt(topPad) + parseInt(bottomPad));
        return innerHeight;
      } else {
        return null;
      }
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
    if (boardRef.current) {
      const width = boardRef.current?.getBoundingClientRect().width;
      const leftPad = window.getComputedStyle(boardRef.current!)?.paddingLeft;
      const rightPad = window.getComputedStyle(boardRef.current!)?.paddingRight;
      if (width && leftPad && rightPad) {
        const innerWidth = width - (parseInt(leftPad) + parseInt(rightPad));
        return innerWidth;
      } else {
        return null;
      }
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
          padding: `${artboard_wrapper_paddingTop}px ${artboard_wrapper_side_padding}px`,
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
                <Canvas
                  key={n}
                  id={`canvas_pdf__${n}`}
                  width={getDimensions().Width}
                  height={getDimensions().Height}
                />
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
      <VertRule totalScrollHeight={totalScrollHeight} left={left} top={top} />
      <HorizRule
        totalScrollHeight={totalScrollHeight}
        totalScrollWidth={totalScrollWidth}
        left={left}
        top={top}
      />
    </>
  );
};
