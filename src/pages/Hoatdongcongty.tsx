import Titlepage from "../components/Titlepage";
import "../static/css/giodieudong.scss";
import "../quill.custom.scss";
import "../ng-editor.scss";
import "quill/dist/quill.snow.css"; // Import CSS của Quill
import Carousel2 from "../components/Carousel2";

import AlbumHoatdongcongtyMansonryCommon from "../components/AlbumHoatdongcongtyMansonryCommon";
import { useTranslation } from "react-i18next";

const Hoatdongcongty = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* <BubbleBackground /> */}

      <Carousel2 name={t("activity")} />
      <div className="gridme wide2">
        <div className="row">
          {/* <SidebarMenu /> */}
          <div className="col-custom m-12 c-12 l-12">
            <div>
              <Titlepage name={t("activity")} />
              <AlbumHoatdongcongtyMansonryCommon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hoatdongcongty;
