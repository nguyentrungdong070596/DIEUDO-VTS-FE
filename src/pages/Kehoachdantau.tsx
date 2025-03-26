import { useEffect, useState } from "react";
import Titlepage from "../components/Titlepage";
import "../static/css/kehoachdantau.scss";
import "animate.css";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, subDays } from "date-fns";
import Apis from "../configs/Apis";
import DatePickerCustom from "../components/DatePickerCustom";

interface PlanShip {
    id: number;
    name: string;
    country: string;
    agency: string;
    loa: string;
    dwt: string;
    grt: string;
    draft: string;
    fromkh: string;
    tokh: string;
    pob: string;
    notes: string;
    nameHT: string;
    rangeHT: string;
}

const Kehoachdantau = () => {
    const [activeTab, setActiveTab] = useState("1");
    const [const_planships, setconst_planships] = useState<PlanShip[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [dateTabs, setDateTabs] = useState<Date[]>([]);

    const getDendoiByTab = (tab: string): string => {
        if (tab === "1") return "v";
        if (tab === "2") return "r";
        return "dc";
    };

    const load_const_planships = async () => {
        try {
            const params = {
                limit: 1000,
                ngay: selectedDate ? format(selectedDate, "dd/MM/yyyy") : "",
                dendoi: getDendoiByTab(activeTab),
            };

            const response = await Apis.get(
                "http://118.69.168.36:3965/api/v1/donhang/order/monitorwebpilot/",
                { params }
            );

            if (response.data && Array.isArray(response.data.data)) {
                setconst_planships(response.data.data);
            } else {
                setconst_planships([]);
            }
        } catch (error) {
            console.error("Lỗi khi load const_planships:", error);
            setconst_planships([]);
        }
    };

    useEffect(() => {
        load_const_planships();
    }, [activeTab, selectedDate]);

    useEffect(() => {
        if (selectedDate) {
            const newTabs: Date[] = [];
            for (let i = 7; i >= 1; i--) {
                newTabs.push(subDays(selectedDate, i));
            }
            newTabs.push(selectedDate);
            newTabs.push(addDays(selectedDate, 1));
            setDateTabs(newTabs);
        }
    }, [selectedDate]);

    return (
        <div className="gridme wide2">
            <Titlepage name="Kế hoạch dẫn tàu" />
            {/* 🔍 Thanh tìm kiếm ngày */}
            <div className="filter-kehoach">
                <div className="search-container">
                    <div className="datepicker-wrapper">
                        <DatePickerCustom
                            label="📅 Chọn ngày:"
                            selectedDate={selectedDate}
                            onDateChange={(date) => setSelectedDate(date)}
                        />
                    </div>
                </div>

                {/* Tabs Ngày */}
                {/* Tabs ngày scroll ngang */}
                <div className="tabs-date-scroll">
                    <div className="tabs-date-wrapper">
                        {dateTabs.slice().reverse().map((date, index) => (
                            <button
                                key={index}
                                className={`tab-date-button ${format(date, "dd/MM/yyyy") === format(selectedDate!, "dd/MM/yyyy")
                                    ? "active"
                                    : ""
                                    }`}
                                onClick={() => setSelectedDate(date)}
                            >
                                {format(date, "dd/MM/yyyy")}
                            </button>
                        ))}
                    </div>
                </div>

            </div>




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
                    <div className={`tab-indicator tab-${activeTab}`}></div>
                </div>
            </div>



            {/* Nội dung tab */}
            <div className="tab-content">
                <div className="animate__animated animate__fadeInUp scroll-container ship-table">
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
                            {const_planships.map((ship, index) => (
                                <tr key={ship.id}>
                                    <td>{index + 1}</td>
                                    <td>{ship.name}</td>
                                    <td>{ship.country}</td>
                                    <td>{ship.agency}</td>
                                    <td>{ship.dwt}</td>
                                    <td>{ship.grt}</td>
                                    <td>{ship.loa}</td>
                                    <td>{ship.draft}</td>
                                    <td>{ship.fromkh}</td>
                                    <td>{ship.tokh}</td>
                                    <td>{ship.pob}</td>
                                    <td>{ship.nameHT}</td>
                                    <td>{ship.rangeHT}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Kehoachdantau;
