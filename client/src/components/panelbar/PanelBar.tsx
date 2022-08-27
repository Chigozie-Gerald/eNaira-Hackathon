import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { ReactComponent as ExpandIcon } from "../../assets/expand.svg";
import "./PanelBar.css";

const PanelBar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [layerSearch, setLayerSearch] = useState(``);
  const pageInfo = [
    { title: `Page 1`, hasContent: true },
    { title: `Page 2`, hasContent: true },
    { title: `Page 3`, hasContent: true },
    { title: `Page 4`, hasContent: false },
  ];

  return (
    <div className="panelbar">
      <div className="header">
        <div className="flex">
          <span className="title_name">Layers</span>
          {openSearch ? (
            <div className="input_field_wrapper flex">
              <div className="close_wrapper center">
                <div className="content center">
                  <CloseIcon
                    onClick={() => {
                      setLayerSearch("");
                      setOpenSearch(false);
                    }}
                    className={`img_div_contain ${
                      layerSearch ? "show" : "hide"
                    }`}
                  />
                </div>
              </div>
              <input
                value={layerSearch}
                onChange={(e) => setLayerSearch(e.target.value)}
                type="text"
                className="flex1 flex"
              />
            </div>
          ) : (
            <div
              onClick={() => setOpenSearch(true)}
              className="input_field_icon_wrapper center"
            >
              <SearchIcon className="img_div_contain" />
            </div>
          )}
        </div>
      </div>
      <div className="listContent scrollWheelSm">
        {pageInfo.map((item, n) => (
          <div key={n} className="page">
            <div className="header_title">
              <span className="flex1 ellipsis">{n + 1}</span>
            </div>
            {item.hasContent && <div className="list"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelBar;
