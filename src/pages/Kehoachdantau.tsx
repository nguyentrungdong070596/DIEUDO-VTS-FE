// import { useEffect, useState } from "react";
// import Titlepage from "../components/Titlepage";
// import "../static/css/kehoachdantau.scss";
// import "animate.css";
// import "react-datepicker/dist/react-datepicker.css";
// import { addDays, format, subDays } from "date-fns";
// import Apis, { endpoints } from "../configs/Apis";
// import DatePickerCustom from "../components/DatePickerCustom";
// import { useTranslation } from "react-i18next";
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
// import moment from 'moment'; // Import moment
// import { AiFillFileExcel } from "react-icons/ai";
// interface PlanShip {
//     id: number;
//     name: string;
//     country: string;
//     agency: string;
//     loa: string;
//     dwt: string;
//     grt: string;
//     draft: string;
//     fromkh: string;
//     tokh: string;
//     pob: string;
//     notes: string;
//     nameHT: string;
//     rangeHT: string;
// }

// const Kehoachdantau = () => {
//     const { t } = useTranslation();
//     const [isHovered, setIsHovered] = useState(false);

//     const [activeTab, setActiveTab] = useState("1");
//     const [const_planships, setconst_planships] = useState<PlanShip[]>([]);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//     const [dateTabs, setDateTabs] = useState<Date[]>([]);

//     const getDendoiByTab = (tab: string): string => {
//         if (tab === "1") return "v";
//         if (tab === "2") return "r";
//         return "dc";
//     };

//     const load_const_planships = async () => {
//         const params = {
//             limit: 1000,
//             ngay: selectedDate ? format(selectedDate, "dd/MM/yyyy") : "",
//             dendoi: getDendoiByTab(activeTab),
//         };

//         try {
//             const switchResponse: any = await Apis.get(`${endpoints.APISwitch}/1`);
//             if (switchResponse.data.success === true) {
//                 if (switchResponse.data.data.flag === false) {
//                     const response = await Apis.get("http://118.69.168.36:3965/api/v1/donhang/order/monitorwebpilot/", { params });
//                     if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
//                         setconst_planships(response.data.data);
//                     } else {
//                         setconst_planships([]);
//                     }
//                 } else {
//                     const backupResponse = await Apis.get(endpoints.APIKehoachdantau, { params });
//                     if (backupResponse.data && Array.isArray(backupResponse.data.data) && backupResponse.data.data.length > 0) {
//                         setconst_planships(backupResponse.data.data);
//                     } else {
//                         setconst_planships([]);
//                     }
//                 }
//             } else {
//                 const response = await Apis.get("http://118.69.168.36:3965/api/v1/donhang/order/monitorwebpilot/", { params });
//                 if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
//                     setconst_planships(response.data.data);
//                 } else {
//                     setconst_planships([]);
//                 }
//             }
//         } catch (error) {
//             console.error("Lỗi khi gọi API:", error);
//             setconst_planships([]);
//         }
//     };
//     useEffect(() => {
//         load_const_planships();
//     }, [activeTab, selectedDate]);

//     useEffect(() => {
//         if (selectedDate) {
//             const newTabs: Date[] = [];
//             for (let i = 7; i >= 1; i--) {
//                 newTabs.push(subDays(selectedDate, i));
//             }
//             newTabs.push(selectedDate);
//             newTabs.push(addDays(selectedDate, 1));
//             setDateTabs(newTabs);
//         }
//     }, [selectedDate]);

//     const exportToExcel = () => {
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('KeHoachDanTau');

//         // Định nghĩa chiều rộng cột
//         worksheet.columns = [
//             { width: 8 },   // STT
//             { width: 25 },  // Tên tàu (name)
//             { width: 15 },  // Quốc tịch (country)
//             { width: 25 },  // Đại lý (agency)
//             { width: 12 },  // DWT
//             { width: 12 },  // GRT
//             { width: 12 },  // Loa
//             { width: 12 },  // Draft
//             { width: 20 },  // Từ (fromkh)
//             { width: 20 },  // Đến (tokh)
//             { width: 12 },  // P.O.B (pob)
//             { width: 25 },  // Hoa tiêu (nameHT)
//             { width: 12 },  // Hạng (rangeHT)
//         ];

//         // Tiêu đề chính
//         worksheet.mergeCells('A1:M1');
//         worksheet.getCell('A1').value = 'KẾ HOẠCH DẪN TÀU';
//         worksheet.getCell('A1').font = { bold: true, size: 14, name: 'Times New Roman' };
//         worksheet.getCell('A1').alignment = { horizontal: 'left', vertical: 'middle' }; // Align left

//         // Loại tàu (Tàu đến, Tàu rời, Tàu dịch chuyển)
//         worksheet.mergeCells('A2:M2');
//         const shipType = activeTab === "1" ? "Tàu đến" : activeTab === "2" ? "Tàu rời" : "Tàu dịch chuyển";
//         worksheet.getCell('A2').value = `Loại: ${shipType}`;
//         worksheet.getCell('A2').font = { italic: true, size: 12, name: 'Times New Roman' };
//         worksheet.getCell('A2').alignment = { horizontal: 'left', vertical: 'middle' }; // Align left

//         // Ngày
//         worksheet.mergeCells('A3:M3');
//         worksheet.getCell('A3').value = `Ngày: ${selectedDate ? format(selectedDate, 'dd/MM/yyyy') : format(new Date(), 'dd/MM/yyyy')}`;
//         worksheet.getCell('A3').font = { italic: true, size: 12, name: 'Times New Roman' };
//         worksheet.getCell('A3').alignment = { horizontal: 'left', vertical: 'middle' }; // Align left

//         // Giờ xuất
//         worksheet.mergeCells('A4:M4');
//         worksheet.getCell('A4').value = `Giờ xuất: ${moment().format('HH:mm:ss')}`; // Using moment to get current time
//         worksheet.getCell('A4').font = { italic: true, size: 12, name: 'Times New Roman' };
//         worksheet.getCell('A4').alignment = { horizontal: 'left', vertical: 'middle' }; // Align left

//         // Header (2 dòng giống bảng trong hình)
//         const headers = [
//             ['STT', 'Tên tàu', 'Quốc tịch', 'Đại lý', 'Thông số', '', '', '', 'Tuyến', '', 'P.O.B', 'Hoa tiêu', ''],
//             ['', '', '', '', 'DWT', 'GRT', 'Loa', 'Draft', 'Từ', 'Đến', '', 'Tên', 'Hạng'],
//         ];

//         // Write headers directly to rows 5 and 6 (shifted down due to the new row for "Giờ xuất")
//         worksheet.getRow(5).values = headers[0]; // Row 5: "STT", "Tên tàu", etc.
//         worksheet.getRow(6).values = headers[1]; // Row 6: "DWT", "GRT", etc.

//         // Gộp ô trong header giống bảng trong hình
//         worksheet.mergeCells('A5:A6'); // STT
//         worksheet.mergeCells('B5:B6'); // Tên tàu
//         worksheet.mergeCells('C5:C6'); // Quốc tịch
//         worksheet.mergeCells('D5:D6'); // Đại lý
//         worksheet.mergeCells('E5:H5'); // Thông số (gộp 4 cột: DWT, GRT, Loa, Draft)
//         worksheet.mergeCells('I5:J5'); // Tuyến (gộp 2 cột: Từ, Đến)
//         worksheet.mergeCells('K5:K6'); // P.O.B
//         worksheet.mergeCells('L5:M5'); // Hoa tiêu (gộp 2 cột: Tên, Hạng)

//         // Định dạng header (tô màu toàn bộ 2 dòng header)
//         const headerStyle = {
//             font: { bold: true, size: 10, name: 'Times New Roman', color: { argb: 'FFFFFF' } }, // Chữ trắng
//             alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
//             fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '0096ff' } }, // Màu xanh dương giống trong hình
//             border: {
//                 top: { style: 'thin' },
//                 bottom: { style: 'thin' },
//                 left: { style: 'thin' },
//                 right: { style: 'thin' },
//             },
//         };

//         // Áp dụng định dạng cho toàn bộ 2 dòng header (dòng 5 và 6)
//         worksheet.getRows(5, 2)?.forEach(row => {
//             row.eachCell({ includeEmpty: true }, cell => {
//                 cell.style = {
//                     ...headerStyle,
//                     alignment: {
//                         ...headerStyle.alignment,
//                         horizontal: 'center',
//                         vertical: 'middle',
//                     },
//                     border: {
//                         top: { style: 'thin' as ExcelJS.BorderStyle },
//                         bottom: { style: 'thin' as ExcelJS.BorderStyle },
//                         left: { style: 'thin' as ExcelJS.BorderStyle },
//                         right: { style: 'thin' as ExcelJS.BorderStyle },
//                     },
//                     fill: {
//                         type: 'pattern',
//                         pattern: 'solid',
//                         fgColor: { argb: '0096ff' }, // Tô màu toàn header
//                     },
//                 };
//             });
//         });

//         // Dữ liệu
//         const columnsToExport = ['stt', 'name', 'country', 'agency', 'dwt', 'grt', 'loa', 'draft', 'fromkh', 'tokh', 'pob', 'nameHT', 'rangeHT'];

//         // Generate filteredData with auto-incrementing STT
//         const filteredData = const_planships.map((item, index) => {
//             const rowData = columnsToExport.map(col => {
//                 if (col === 'stt') {
//                     return index + 1; // Auto-incrementing STT (1, 2, 3, ...)
//                 }
//                 return item[col as keyof PlanShip] ?? '';
//             });
//             return rowData;
//         });

//         worksheet.addRows(filteredData, 'i'); // Thêm dữ liệu bắt đầu từ dòng 7 (shifted down due to the new row)

//         // Định dạng dữ liệu
//         const dataStyle = {
//             font: { size: 10, name: 'Times New Roman' },
//             alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
//             border: {
//                 top: { style: 'thin' },
//                 bottom: { style: 'thin' },
//                 left: { style: 'thin' },
//                 right: { style: 'thin' },
//             },
//         };

//         worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
//             if (rowNumber >= 7) { // Shifted down due to the new row
//                 row.eachCell(cell => {
//                     cell.style = {
//                         ...dataStyle,
//                         alignment: {
//                             ...dataStyle.alignment,
//                             horizontal: 'center' as 'center',
//                             vertical: 'middle' as 'middle',
//                         },
//                         border: {
//                             top: { style: 'thin' as ExcelJS.BorderStyle },
//                             bottom: { style: 'thin' as ExcelJS.BorderStyle },
//                             left: { style: 'thin' as ExcelJS.BorderStyle },
//                             right: { style: 'thin' as ExcelJS.BorderStyle },
//                         },
//                     };
//                     if (['stt', 'loa', 'dwt', 'grt', 'draft', 'pob'].includes(columnsToExport[Number(cell.col) - 1]) && !isNaN(Number(cell.value))) {
//                         cell.numFmt = '#,##0';
//                         cell.value = Number(cell.value);
//                     }
//                 });
//             }
//         });

//         // Cài đặt trang in
//         worksheet.pageSetup = {
//             orientation: 'landscape',
//             fitToPage: true,
//             fitToWidth: 1,
//             fitToHeight: 1,
//             paperSize: 9, // A4
//         };

//         // Xuất file với tên bao gồm ngày và giờ xuất
//         const exportDateTime = moment().format('DD-MM-YYYY_HH-mm-ss'); // Format: DD-MM-YYYY_HH-mm-ss
//         workbook.xlsx.writeBuffer().then(buffer => {
//             const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//             saveAs(blob, `KeHoachDanTau_${exportDateTime}.xlsx`);
//         });
//     };
//     return (
//         <div className="gridme wide2">
//             <Titlepage name={t("plan")} />
//             <div className="filter-kehoach">
//                 <div className="search-container">
//                     <div className="datepicker-wrapper">
//                         <DatePickerCustom
//                             label={`📅 ${t("chonngay")}:`}
//                             selectedDate={selectedDate}
//                             onDateChange={(date) => setSelectedDate(date)}
//                         />
//                     </div>

//                     <a
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="btn-excel-link"
//                         onMouseEnter={() => setIsHovered(true)}
//                         onMouseLeave={() => setIsHovered(false)}
//                         onClick={exportToExcel}
//                     >
//                         <span className="btn-content">
//                             {isHovered ? (
//                                 <>
//                                     <AiFillFileExcel className="btn-icon" />
//                                     <span className="btn-text">{t("export")}</span>
//                                 </>
//                             ) : (
//                                 <>
//                                     <AiFillFileExcel className="btn-icon" />
//                                     <span className="btn-text"> {t("excel")}</span>
//                                 </>
//                             )}
//                         </span>
//                     </a>
//                     {/* <button onClick={exportToExcel} className="export-excel-btn">
//                         {t("exportexcel")}
//                     </button> */}
//                 </div>

//                 <div className="tabs-date-scroll">
//                     <div className="tabs-date-wrapper">
//                         {dateTabs.slice().reverse().map((date, index) => (
//                             <button
//                                 key={index}
//                                 className={`tab-date-button ${format(date, "dd/MM/yyyy") === format(selectedDate!, "dd/MM/yyyy") ? "active" : ""}`}
//                                 onClick={() => setSelectedDate(date)}
//                             >
//                                 {format(date, "dd/MM/yyyy")}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <div className="tabs-container">
//                 <div className="tabs">
//                     <button className={`tab-button ${activeTab === "1" ? "active" : ""}`} onClick={() => setActiveTab("1")}>
//                         {t("tauden")}
//                     </button>
//                     <button className={`tab-button ${activeTab === "2" ? "active" : ""}`} onClick={() => setActiveTab("2")}>
//                         {t("tauroi")}
//                     </button>
//                     <button className={`tab-button ${activeTab === "3" ? "active" : ""}`} onClick={() => setActiveTab("3")}>
//                         {t("taudichchuyen")}
//                     </button>
//                     <div className={`tab-indicator tab-${activeTab}`}></div>
//                 </div>
//             </div>

//             <div className="tab-content">
//                 <div className="animate__animated animate__fadeInUp scroll-container ship-table">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th rowSpan={2}>STT</th>
//                                 <th rowSpan={2}>Tên tàu</th>
//                                 <th rowSpan={2}>Quốc tịch</th>
//                                 <th rowSpan={2}>Đại lý</th>
//                                 <th colSpan={4}>Thông số</th>
//                                 <th colSpan={2}>Tuyến</th>
//                                 <th rowSpan={2}>P.O.B</th>
//                                 <th colSpan={2}>Hoa tiêu</th>
//                             </tr>
//                             <tr>
//                                 <th>DWT</th>
//                                 <th>GRT</th>
//                                 <th>Loa</th>
//                                 <th>Draft</th>
//                                 <th>Từ</th>
//                                 <th>Đến</th>
//                                 <th>Tên</th>
//                                 <th>Hạng</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {const_planships.map((ship, index) => (
//                                 <tr key={ship.id}>
//                                     <td>{index + 1}</td>
//                                     <td>{ship.name}</td>
//                                     <td>{ship.country}</td>
//                                     <td>{ship.agency}</td>
//                                     <td>{ship.dwt}</td>
//                                     <td>{ship.grt}</td>
//                                     <td>{ship.loa}</td>
//                                     <td>{ship.draft}</td>
//                                     <td>{ship.fromkh}</td>
//                                     <td>{ship.tokh}</td>
//                                     <td>{ship.pob}</td>
//                                     <td>{ship.nameHT}</td>
//                                     <td>{ship.rangeHT}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Kehoachdantau;

import { useEffect, useRef, useState } from "react";
import Titlepage from "../components/Titlepage";
import "../static/css/kehoachdantau.scss";
import "animate.css";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, subDays } from "date-fns";
import Apis, { endpoints } from "../configs/Apis";
import DatePickerCustom from "../components/DatePickerCustom";
import { useTranslation } from "react-i18next";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import moment from "moment";
import { AiFillFileExcel } from "react-icons/ai";

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
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [const_planships, setconst_planships] = useState<PlanShip[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dateTabs, setDateTabs] = useState<Date[]>([]);

  // Tab refs
  const tabRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = parseInt(activeTab) - 1;
    const currentTab = tabRefs[index]?.current;
    const indicator = indicatorRef.current;
    if (currentTab && indicator) {
      const { offsetLeft, offsetWidth } = currentTab;
      indicator.style.left = `${offsetLeft}px`;
      indicator.style.width = `${offsetWidth}px`;
    }
  }, [activeTab]);

  const getDendoiByTab = (tab: string): string => {
    if (tab === "1") return "v";
    if (tab === "2") return "r";
    return "dc";
  };

  const load_const_planships = async () => {
    const params = {
      limit: 1000,
      ngay: selectedDate ? format(selectedDate, "dd/MM/yyyy") : "",
      dendoi: getDendoiByTab(activeTab),
    };

    try {
      const switchResponse: any = await Apis.get(`${endpoints.APISwitch}/1`);
      if (switchResponse.data.success === true) {
        if (switchResponse.data.data.flag === false) {
          const response = await Apis.get(
            "http://118.69.168.36:3965/api/v1/donhang/order/monitorwebpilot/",
            { params },
          );
          setconst_planships(response.data?.data || []);
        } else {
          const backupResponse = await Apis.get(endpoints.APIKehoachdantau, {
            params,
          });
          setconst_planships(backupResponse.data?.data || []);
        }
      } else {
        const response = await Apis.get(
          "http://118.69.168.36:3965/api/v1/donhang/order/monitorwebpilot/",
          { params },
        );
        setconst_planships(response.data?.data || []);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setconst_planships([]);
    }
  };

  useEffect(() => {
    load_const_planships();
  }, [activeTab, selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      const newTabs: Date[] = [];
      for (let i = 7; i >= 1; i--) newTabs.push(subDays(selectedDate, i));
      newTabs.push(selectedDate);
      newTabs.push(addDays(selectedDate, 1));
      setDateTabs(newTabs);
    }
  }, [selectedDate]);

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("KeHoachDanTau");

    // Định nghĩa chiều rộng cột
    worksheet.columns = [
      { width: 8 }, // STT
      { width: 25 }, // Tên tàu (name)
      { width: 15 }, // Quốc tịch (country)
      { width: 25 }, // Đại lý (agency)
      { width: 12 }, // DWT
      { width: 12 }, // GRT
      { width: 12 }, // Loa
      { width: 12 }, // Draft
      { width: 20 }, // Từ (fromkh)
      { width: 20 }, // Đến (tokh)
      { width: 12 }, // P.O.B (pob)
      { width: 25 }, // Hoa tiêu (nameHT)
      { width: 12 }, // Hạng (rangeHT)
    ];

    // Tiêu đề chính
    worksheet.mergeCells("A1:M1");
    worksheet.getCell("A1").value = "KẾ HOẠCH DẪN TÀU";
    worksheet.getCell("A1").font = {
      bold: true,
      size: 14,
      name: "Times New Roman",
    };
    worksheet.getCell("A1").alignment = {
      horizontal: "left",
      vertical: "middle",
    }; // Align left

    // Loại tàu (Tàu đến, Tàu rời, Tàu dịch chuyển)
    worksheet.mergeCells("A2:M2");
    const shipType =
      activeTab === "1"
        ? "Tàu đến"
        : activeTab === "2"
        ? "Tàu rời"
        : "Tàu dịch chuyển";
    worksheet.getCell("A2").value = `Loại: ${shipType}`;
    worksheet.getCell("A2").font = {
      italic: true,
      size: 12,
      name: "Times New Roman",
    };
    worksheet.getCell("A2").alignment = {
      horizontal: "left",
      vertical: "middle",
    }; // Align left

    // Ngày
    worksheet.mergeCells("A3:M3");
    worksheet.getCell("A3").value = `Ngày: ${
      selectedDate
        ? format(selectedDate, "dd/MM/yyyy")
        : format(new Date(), "dd/MM/yyyy")
    }`;
    worksheet.getCell("A3").font = {
      italic: true,
      size: 12,
      name: "Times New Roman",
    };
    worksheet.getCell("A3").alignment = {
      horizontal: "left",
      vertical: "middle",
    }; // Align left

    // Giờ xuất
    worksheet.mergeCells("A4:M4");
    worksheet.getCell("A4").value = `Giờ xuất: ${moment().format("HH:mm:ss")}`; // Using moment to get current time
    worksheet.getCell("A4").font = {
      italic: true,
      size: 12,
      name: "Times New Roman",
    };
    worksheet.getCell("A4").alignment = {
      horizontal: "left",
      vertical: "middle",
    }; // Align left

    // Header (2 dòng giống bảng trong hình)
    const headers = [
      [
        "STT",
        "Tên tàu",
        "Quốc tịch",
        "Đại lý",
        "Thông số",
        "",
        "",
        "",
        "Tuyến",
        "",
        "P.O.B",
        "Hoa tiêu",
        "",
      ],
      [
        "",
        "",
        "",
        "",
        "DWT",
        "GRT",
        "Loa",
        "Draft",
        "Từ",
        "Đến",
        "",
        "Tên",
        "Hạng",
      ],
    ];

    // Write headers directly to rows 5 and 6 (shifted down due to the new row for "Giờ xuất")
    worksheet.getRow(5).values = headers[0]; // Row 5: "STT", "Tên tàu", etc.
    worksheet.getRow(6).values = headers[1]; // Row 6: "DWT", "GRT", etc.

    // Gộp ô trong header giống bảng trong hình
    worksheet.mergeCells("A5:A6"); // STT
    worksheet.mergeCells("B5:B6"); // Tên tàu
    worksheet.mergeCells("C5:C6"); // Quốc tịch
    worksheet.mergeCells("D5:D6"); // Đại lý
    worksheet.mergeCells("E5:H5"); // Thông số (gộp 4 cột: DWT, GRT, Loa, Draft)
    worksheet.mergeCells("I5:J5"); // Tuyến (gộp 2 cột: Từ, Đến)
    worksheet.mergeCells("K5:K6"); // P.O.B
    worksheet.mergeCells("L5:M5"); // Hoa tiêu (gộp 2 cột: Tên, Hạng)

    // Định dạng header (tô màu toàn bộ 2 dòng header)
    const headerStyle = {
      font: {
        bold: true,
        size: 10,
        name: "Times New Roman",
        color: { argb: "FFFFFF" },
      }, // Chữ trắng
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "0096ff" } }, // Màu xanh dương giống trong hình
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };

    // Áp dụng định dạng cho toàn bộ 2 dòng header (dòng 5 và 6)
    worksheet.getRows(5, 2)?.forEach((row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.style = {
          ...headerStyle,
          alignment: {
            ...headerStyle.alignment,
            horizontal: "center",
            vertical: "middle",
          },
          border: {
            top: { style: "thin" as ExcelJS.BorderStyle },
            bottom: { style: "thin" as ExcelJS.BorderStyle },
            left: { style: "thin" as ExcelJS.BorderStyle },
            right: { style: "thin" as ExcelJS.BorderStyle },
          },
          fill: {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "0096ff" }, // Tô màu toàn header
          },
        };
      });
    });

    // Dữ liệu
    const columnsToExport = [
      "stt",
      "name",
      "country",
      "agency",
      "dwt",
      "grt",
      "loa",
      "draft",
      "fromkh",
      "tokh",
      "pob",
      "nameHT",
      "rangeHT",
    ];

    // Generate filteredData with auto-incrementing STT
    const filteredData = const_planships.map((item, index) => {
      const rowData = columnsToExport.map((col) => {
        if (col === "stt") {
          return index + 1; // Auto-incrementing STT (1, 2, 3, ...)
        }
        return item[col as keyof PlanShip] ?? "";
      });
      return rowData;
    });

    worksheet.addRows(filteredData, "i"); // Thêm dữ liệu bắt đầu từ dòng 7 (shifted down due to the new row)

    // Định dạng dữ liệu
    const dataStyle = {
      font: { size: 10, name: "Times New Roman" },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    };

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 7) {
        // Shifted down due to the new row
        row.eachCell((cell) => {
          cell.style = {
            ...dataStyle,
            alignment: {
              ...dataStyle.alignment,
              horizontal: "center" as "center",
              vertical: "middle" as "middle",
            },
            border: {
              top: { style: "thin" as ExcelJS.BorderStyle },
              bottom: { style: "thin" as ExcelJS.BorderStyle },
              left: { style: "thin" as ExcelJS.BorderStyle },
              right: { style: "thin" as ExcelJS.BorderStyle },
            },
          };
          if (
            ["stt", "loa", "dwt", "grt", "draft", "pob"].includes(
              columnsToExport[Number(cell.col) - 1],
            ) &&
            !isNaN(Number(cell.value))
          ) {
            cell.numFmt = "#,##0";
            cell.value = Number(cell.value);
          }
        });
      }
    });

    // Cài đặt trang in
    worksheet.pageSetup = {
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 1,
      paperSize: 9, // A4
    };

    // Xuất file với tên bao gồm ngày và giờ xuất
    const exportDateTime = moment().format("DD-MM-YYYY_HH-mm-ss"); // Format: DD-MM-YYYY_HH-mm-ss
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `KeHoachDanTau_${exportDateTime}.xlsx`);
    });
  };

  return (
    <div className="gridme wide2">
      <Titlepage name={t("plan")} />

      <div className="filter-kehoach">
        <div className="search-container">
          <div className="datepicker-wrapper">
            <DatePickerCustom
              label={`📅 ${t("chonngay")}:`}
              selectedDate={selectedDate}
              onDateChange={(date) => setSelectedDate(date)}
            />
          </div>

          <a
            className="btn-excel-link"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={exportToExcel}
          >
            <span className="btn-content">
              <AiFillFileExcel className="btn-icon" />
              <span className="btn-text">
                {isHovered ? t("export") : t("excel")}
              </span>
            </span>
          </a>
        </div>

        <div className="tabs-date-scroll">
          <div className="tabs-date-wrapper">
            {dateTabs
              .slice()
              .reverse()
              .map((date, index) => (
                <button
                  key={index}
                  className={`tab-date-button ${
                    format(date, "dd/MM/yyyy") ===
                    format(selectedDate!, "dd/MM/yyyy")
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

      <div className="tabs-container">
        <div className="tabs">
          <button
            ref={tabRefs[0]}
            className={`tab-button ${activeTab === "1" ? "active" : ""}`}
            onClick={() => setActiveTab("1")}
          >
            {t("tauden")}
          </button>
          <button
            ref={tabRefs[1]}
            className={`tab-button ${activeTab === "2" ? "active" : ""}`}
            onClick={() => setActiveTab("2")}
          >
            {t("tauroi")}
          </button>
          <button
            ref={tabRefs[2]}
            className={`tab-button ${activeTab === "3" ? "active" : ""}`}
            onClick={() => setActiveTab("3")}
          >
            {t("taudichchuyen")}
          </button>
          <div ref={indicatorRef} className="tab-indicator"></div>
        </div>
      </div>

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
