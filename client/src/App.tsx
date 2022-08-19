import { connect } from "react-redux";
import "./App.css";
import ArtBoard from "./components/artboard/ArtBoard";
import PanelBar from "./components/panelbar/PanelBar";
import SideBar from "./components/sidebar/SideBar";
import TopBanner from "./components/topbanner/TopBanner";
import { setBoardFloatCord } from "./state_management/actions";

export const floatWidth = 15 * 16;

const App = ({ clearCoordinates }: { clearCoordinates: () => void }) => {
  return (
    <div
      onContextMenu={() => clearCoordinates()}
      onClick={() => clearCoordinates()}
      className="pdf_node_app"
    >
      <TopBanner />
      <div className="pdf_node_body">
        <PanelBar />
        <ArtBoard />
        <SideBar />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  clearCoordinates: () => {
    dispatch(setBoardFloatCord(undefined));
  },
});

export default connect(undefined, mapDispatchToProps)(App);
