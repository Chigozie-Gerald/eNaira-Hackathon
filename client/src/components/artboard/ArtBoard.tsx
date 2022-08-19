import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { stateType } from "../..";
import FloatWidget from "../../elements/floatWidget/FloatWidget";
import {
  setBoardFloatCord,
  setBoardPlacement,
} from "../../state_management/actions";
import { cord, rect } from "../../state_management/reducers/common";
import "./ArtBoard.css";

const ArtBoard = ({
  setCoordinates,
  setBoardPlacement,
  paperSize,
}: {
  setCoordinates: (cord: cord) => void;
  setBoardPlacement: (rect: rect) => void;
  paperSize: [number, number];
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

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
    const v1 = paperSize[0];
    const v2 = paperSize[1];
    console.log(v2 / v1);
  }, [paperSize]);

  return (
    <div
      ref={boardRef}
      onContextMenu={(e) => {
        const rect = (e.currentTarget as Element).getBoundingClientRect();
        e.preventDefault();
        e.stopPropagation();
        setCoordinates([e.clientX - rect.x, e.clientY - rect.y]);
      }}
      className="artboard flex1"
    >
      <div className="artboard_inner scrollWheel">
        <div className="artboard_container">
          <div className="inner"></div>
        </div>
      </div>
      <FloatWidget />
    </div>
  );
};

const mapStateToProps = (state: stateType) => ({
  paperSize: state.commonReducer.paperSize,
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
