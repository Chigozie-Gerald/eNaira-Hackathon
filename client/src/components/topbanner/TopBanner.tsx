import SizeSelector from "../../elements/acessories/SizeSelector";
import Float from "../../elements/floatWidget/Float";
import "./TopBanner.css";

const TopBanner = () => {
  return (
    <div className="top_banner topbanner">
      <div>
        <div className="widget_wrapper flex1">
          <div className="fileShowCase"></div>
          <div className="item_wrapper flex1">
            <div className="item">
              <BannerItem />
            </div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
        <SizeSelector />
      </div>
      <div></div>
    </div>
  );
};

export default TopBanner;

const BannerItem = () => {
  return (
    <>
      <div className="banner_item inner-item"></div>
      <Float />
    </>
  );
};
