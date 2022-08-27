import { useEffect } from "react";
import { connect } from "react-redux";
import { stateType } from "../..";
import { floatWidth } from "../../App";
import { setBoardFloatCord } from "../../state_management/actions";
import {
  cord,
  floatWidget,
  rect,
} from "../../state_management/reducers/common";
import "./FloatWidget.css";

const FloatWidget = ({
  cord,
  setCoordinate,
  boardPlacement,
}: {
  cord: cord;
  boardPlacement: rect | null;
  setCoordinate: (cord: cord) => void;
}) => {
  useEffect(() => {}, [cord, boardPlacement]);

  const height = 240;
  const width = floatWidth;

  const cordStyle = (): floatWidget | {} => {
    if (cord) {
      const coordinates = { left: cord[0], top: cord[1] };
      if (
        boardPlacement?.width &&
        boardPlacement.width - cord[0] < width &&
        cord[0] > width
      ) {
        coordinates.left = cord[0] - width;
      }
      if (
        boardPlacement?.height &&
        boardPlacement.height - cord[1] < height &&
        cord[1] > height
      ) {
        coordinates.top = cord[1] - height;
      }
      return coordinates;
    } else {
      return {};
    }
  };

  return (
    <div
      onContextMenu={(e) => {
        e.stopPropagation();
      }}
      style={{ ...cordStyle(), height: `${height}px`, width: `${width}px` }}
      className={`floatWidget floatWrap ${cord ? `` : `noShow`}`}
    >
      <div className="inner"></div>
    </div>
  );
};

const mapStateToProps = (state: stateType) => ({
  cord: state.commonReducer.boardFloatCord,
  boardPlacement: state.commonReducer.boardPlacement,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCoordinate: (cord: cord) => dispatch(setBoardFloatCord(cord)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FloatWidget);
