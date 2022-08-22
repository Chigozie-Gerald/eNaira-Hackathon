import { ReactElement } from "react";
import "./SvgHolder.css";

const SvgHolder = ({
  children,
  width,
  height,
  onClick,
}: {
  children: ReactElement;
  width?: number;
  height?: number;
  onClick?: (data?: any) => void;
}) => {
  return (
    <div
      style={{
        height,
        width,
      }}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className="center svgContainer"
    >
      {children}
    </div>
  );
};

export default SvgHolder;
