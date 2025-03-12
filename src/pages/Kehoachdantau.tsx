import React, { useState } from "react";
import taudenimg from "../static/img/tauden.png";
import Titlepage from "../components/Titlepage";
import "../static/css/kehoachdantau.scss";


interface Ship {
    stt: number;
    tenTau: string;
    quocTich: string;
    daiLy: string;
    dwt: string;
    grt: string;
    loa: string;
    draft: string;
    tu: string;
    den: string;
    pob: string;
    hoaTieuTen: string;
    hoaTieuHang: string;
}

const ships: Ship[] = [
    {
        stt: 1,
        tenTau: "HANSA HOMBURG",
        quocTich: "LIBERIA",
        daiLy: "VIETFRACHT",
        dwt: "23.350",
        grt: "18.252",
        loa: "175,49",
        draft: "9,6",
        tu: "P/S3",
        den: "GML",
        pob: "00:30",
        hoaTieuTen: "NGUYỄN XUÂN BÁCH",
        hoaTieuHang: "NH",
    },
    {
        stt: 2,
        tenTau: "TRUNG THANG 558",
        quocTich: "VIET NAM",
        daiLy: "GOLDENSEA",
        dwt: "13.817,6",
        grt: "6.393",
        loa: "119,8",
        draft: "8,7",
        tu: "P/S3",
        den: "PMT",
        pob: "00:45",
        hoaTieuTen: "TRẦN VĂN LỰC",
        hoaTieuHang: "I",
    },
    {
        stt: 3,
        tenTau: "VIET THUAN 09",
        quocTich: "VIETNAM",
        daiLy: "DUC NGUYEN",
        dwt: "5.345",
        grt: "3.260",
        loa: "79",
        draft: "3,5",
        tu: "P/S1",
        den: "GGIABP9",
        pob: "01:30",
        hoaTieuTen: "NGUYỄN MẠNH HÙNG",
        hoaTieuHang: "III",
    },
];


const Kehoachdantau = () => {
    const [activeTab, setActiveTab] = useState("1");

    return (
        <div className="gridme wide">
            <Titlepage name="Kế hoạch dẫn tàu" />

            {/* Tabs */}
            <div className="tabs-container">
                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === "1" ? "active" : ""}`}
                        onClick={() => setActiveTab("1")}
                    >
                        Tàu đến
                    </button>
                    <button
                        className={`tab-button ${activeTab === "2" ? "active" : ""}`}
                        onClick={() => setActiveTab("2")}
                    >
                        Tàu rời
                    </button>
                    <button
                        className={`tab-button ${activeTab === "3" ? "active" : ""}`}
                        onClick={() => setActiveTab("3")}
                    >
                        Tàu dịch chuyển
                    </button>
                    {/* Thanh gạch chân di chuyển */}
                    <div className={`tab-indicator tab-${activeTab}`}></div>
                </div>
            </div>

            {/* Nội dung từng tab */}
            <div className="tab-content">
                {activeTab === "1" && (
                    <div>
                        <div className="ship-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th rowSpan={2}>STT</th>
                                        <th rowSpan={2}>Tên tàu</th>
                                        <th rowSpan={2}>Quốc tịch</th>
                                        <th rowSpan={2}>Đại lý</th>
                                        <th colSpan={4}>Thông số</th>
                                        <th colSpan={2}>Tuyến</th>
                                        <th rowSpan={2}>P.O.B</th>
                                        <th colSpan={2}>Hoa tiêu</th>
                                    </tr>
                                    <tr>
                                        <th>DWT</th>
                                        <th>GRT</th>
                                        <th>Loa</th>
                                        <th>Draft</th>
                                        <th>Từ</th>
                                        <th>Đến</th>
                                        <th>Tên</th>
                                        <th>Hạng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ships.map((ship) => (
                                        <tr key={ship.stt}>
                                            <td>{ship.stt}</td>
                                            <td>{ship.tenTau}</td>
                                            <td>{ship.quocTich}</td>
                                            <td>{ship.daiLy}</td>
                                            <td>{ship.dwt}</td>
                                            <td>{ship.grt}</td>
                                            <td>{ship.loa}</td>
                                            <td>{ship.draft}</td>
                                            <td>{ship.tu}</td>
                                            <td>{ship.den}</td>
                                            <td>{ship.pob}</td>
                                            <td>{ship.hoaTieuTen}</td>
                                            <td>{ship.hoaTieuHang}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>                    </div>
                )}
                {activeTab === "2" && <div>


                </div>}
                {activeTab === "3" && <div>Item Three</div>}
            </div>
        </div>
    );
};

export default Kehoachdantau;
