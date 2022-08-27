import { ReactElement, useEffect, useState } from "react";
import { rect } from "../../state_management/reducers/common";
import FloatStage from "../../UI/FloatStage/FloatStage";
import "./Capsule.css";

const Capsule = ({
  children,
  floatComponent,
  clickOpen,
  hoverOpen,
  id,
  className,
}: {
  children: ReactElement;
  floatComponent: ReactElement;
  clickOpen: boolean;
  hoverOpen: boolean;
  id: string;
  className: string;
}) => {
  const [dimension, setDimension] = useState<rect>();
  const ID = id || `float_container_capsule__ID`;

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      const element = document.getElementById(ID);
      if (element && !element.contains(e.target as Node)) {
        setDimension(undefined);
      }
    };
    document.addEventListener("click", outsideClick);

    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, []);

  return (
    <div
      className={className || ``}
      id={ID}
      onClick={(e) => {
        if (clickOpen) {
          if (dimension) {
            if (e.target === e.currentTarget) {
              setDimension(undefined);
            }
          } else {
            setDimension((e.currentTarget as Element).getBoundingClientRect());
          }
        }
      }}
      onMouseOver={(e) => {
        if (hoverOpen) {
          setDimension((e.currentTarget as Element).getBoundingClientRect());
        }
      }}
      onMouseOut={() => {
        if (hoverOpen) {
          setDimension(undefined);
        }
      }}
    >
      {children}
      {dimension ? (
        <FloatStage>
          <div
            className="scrollWheelSm"
            style={{
              top: dimension.bottom + 2,
              left: dimension.left,
              maxHeight: `calc(100% - ${dimension.bottom + 2}px - 16px)`,
              maxWidth: `calc(100% - ${dimension.left}px - 16px)`,
            }}
          >
            {floatComponent}
          </div>
        </FloatStage>
      ) : null}
    </div>
  );
};

export default Capsule;
