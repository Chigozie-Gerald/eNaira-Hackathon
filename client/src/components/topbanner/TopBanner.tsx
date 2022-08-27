import SizeSelector from "../../elements/acessories/SizeSelector";
import Capsule from "../../elements/Capsule/Capsule";
import Float from "../../elements/floatWidget/Float";
import ColorPalette from "../../UI/ColorPalette/ColorPalette";
import FloatStage from "../../UI/FloatStage/FloatStage";
import "./TopBanner.css";

const TopBanner = () => {
  return (
    <div className="top_banner topbanner">
      <div>
        <div className="widget_wrapper flex1">
          <div className="fileShowCase">
            <div></div>
          </div>
          <div className="item_wrapper flex1">
            <div className="inner top ellipsis">
              Sales force Invoice PDF{" "}
              <span className="activated_showcase">Inactivated</span>
            </div>
            <div className="inner bottom">
              <div
                onClick={(e) =>
                  console.log(
                    (e.currentTarget as Element).getBoundingClientRect()
                  )
                }
                className="item center active"
              >
                Text
              </div>
              <Capsule
                clickOpen
                floatComponent={<BannerItem />}
                hoverOpen={false}
                className="item center"
                id="shape_top_banner_id"
              >
                <>Shape</>
              </Capsule>
              <ColorPalette />
              <div className="item center">Shape</div>
              <div className="item center">Table</div>
              <div className="item center">Image</div>
              <div className="item center">Page</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="topBanner_quick_access">
          <SizeSelector />
        </div>
        <div className="flex1"></div>
      </div>
    </div>
  );
};

export default TopBanner;

const BannerItem = () => {
  return (
    <>
      <div className="banner_item inner-iteNm">Good day</div>
    </>
  );
};
