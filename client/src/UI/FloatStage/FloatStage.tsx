import { ReactElement } from "react";
import "./FloatStage.css";

const FloatStage = ({ children }: { children: ReactElement }) => {
  return (
    <div onClick={() => console.log(`clicked`)} className="floatStage">
      <div className="container">{children}</div>
    </div>
  );
};

export default FloatStage;
