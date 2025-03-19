import React, { useEffect, useState } from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/vitridontrahoatieu.scss'
import hoatieu1 from '../static/img/hoatieu1.png'
import hoatieu2 from '../static/img/hoatieu2.png'
import hoatieu3 from '../static/img/hoatieu3.png'
import hoatieu4 from '../static/img/hoatieu4.png'
import hoatieu5 from '../static/img/hoatieu5.png'
import hoatieu6 from '../static/img/hoatieu6.png'
import SidebarMenu from '../layout/Sidebar'
import Itemhoatieu from '../components/Itemhoatieu'
import Carousel2 from '../components/Carousel2'
import Spinner from '../components/Spinner'
import Apis, { endpoints } from '../configs/Apis'
import { ViTriDonTraHoaTieu } from '../interface/InterfaceCommon'


const hoaTieuList = [
    { name: 'Vũ Ngọc An', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu1 },
    { name: 'Phạm Trung Tín', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu2 },
    { name: 'Võ Việt Đức', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu3 },
    { name: 'Nguyễn Đức Thịnh', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu4 },
    { name: 'Trần Nhật Khánh', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu5 },
    { name: 'Nguyễn Đình Chung', chucdanh: 'Hoa tiêu ngoại hạng', img: hoatieu6 },

];
const Vitridontrahoatieu = () => {
    const [vitris, setVitri] = useState<ViTriDonTraHoaTieu[]>([]);


    const loadVitri = async () => {
        try {
            const params = { limit: 1000, page: 1, itemType: '9' };
            const response = await Apis.get(endpoints.APIItems, { params });



            if (response.data && Array.isArray(response.data.data)) {
                setVitri(response.data.data);

                // Sử dụng totalRecords từ API
                const total = response.data.totalRecords || response.data.data.length;

            } else {
                console.error("Dữ liệu API không đúng định dạng:", response.data);
                setVitri([]);
            }
        } catch (error) {
            console.error("Lỗi khi load hoa tiêu:", error);
            setVitri([]);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await loadVitri();
        };

        fetchData();
    }, []);





    const defaultContentHTML = `
  <h2 class="text-center title">QUYẾT ĐỊNH</h2>
  <h3 class="text-center subtitle">Công bố vùng đón trả hoa tiêu</h3>
  <p class="text-center description">
      Vùng đón trả hoa tiêu cho các tàu biển tại khu vực hàng hải thuộc địa phận tỉnh Bà Rịa – Vũng Tàu
  </p>
  <p class="text-center italic">CỤC TRƯỞNG CỤC HÀNG HẢI VIỆT NAM</p>

  <div class="content">
    <p>
      Căn cứ Luật Hàng hải Việt Nam ngày 8 tháng 6 năm 2005;<br />
      Căn cứ Nghị định số 21/2012/NĐ-CP ngày 21 tháng 3 năm 2012 của Chính phủ về quản lý cảng biển và luồng hàng hải;<br />
      Căn cứ Quyết định số 70/2013/QĐ-TTg ngày 14/11/2013 của Thủ tướng Chính phủ quy định chức năng, nhiệm vụ,
      quyền hạn và cơ cấu tổ chức của Bộ Giao thông vận tải;<br />
      Căn cứ Thông tư số 54/2018/TT-BGTVT ngày 14 tháng 10 năm 2018 của Bộ trưởng Bộ Giao thông vận tải hướng dẫn một số điều của
      Nghị định số 21/2012/NĐ-CP ngày 21/03/2012;<br />
      Xét đề nghị của Cảng vụ Hàng hải Vũng Tàu tại Văn bản số 137/CVHHVT-PC ngày 11/01/2024 và văn bản số 05/CVHHVT-PC ngày 03/01/2024;
    </p>

    <p class="text-center bold">QUYẾT ĐỊNH:</p>

    <p class="bold">Điều 1.</p>
    <p>
      Công bố vùng đón trả hoa tiêu trong khu vực hàng hải thuộc địa phận tỉnh Bà Rịa – Vũng Tàu cho tàu thuyền Việt Nam và tàu thuyền nước ngoài hoạt động tại khu vực hàng hải như sau:
    </p>

    <ol>
      <li>
        Vùng hoa tiêu G cho tàu thuyền có chiều dài lớn nhất không quá 135 m và mớn nước thiết kế 7.5 m (trừ tàu chuyên dụng) tại Vũng G tra báo hiệu, có tọa độ như sau:
        <div class="table-wrapper">
          <table class="coordinate-table">
            <thead>
              <tr>
                <th rowspan="2">Tên điểm</th>
                <th colspan="2">Tọa độ VN-2000</th>
                <th colspan="2">Tọa độ WGS-84</th>
              </tr>
              <tr>
                <th>Vĩ độ</th>
                <th>Kinh độ</th>
                <th>Vĩ độ</th>
                <th>Kinh độ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>10°19'51.9"N</td><td>107°04'51.6"E</td><td>10°19'48.6"N</td><td>107°05'00.3"E</td></tr>
              <tr><td>2</td><td>10°19'44.4"N</td><td>107°05'03.4"E</td><td>10°19'41.1"N</td><td>107°05'12.1"E</td></tr>
              <tr><td>3</td><td>10°19'32.1"N</td><td>107°04'38.1"E</td><td>10°19'28.8"N</td><td>107°04'46.8"E</td></tr>
              <tr><td>4</td><td>10°19'40.8"N</td><td>107°04'26.0"E</td><td>10°19'37.5"N</td><td>107°04'34.7"E</td></tr>
            </tbody>
          </table>
        </div>
      </li>

      <li>Vùng hoa tiêu H, I, J, K, L, M, N, O áp dụng cho các tàu thuyền có chiều dài lớn nhất không quá 135 m nhưng mớn nước lớn hơn 7.5 m hoặc là tàu chuyên dụng, tàu khách, tàu quân sự, tàu biển có chiều dài lớn hơn 135 m và mớn nước lớn hơn 7.5 m.</li>
      <li>Vùng hoa tiêu đặc biệt cho tàu thuyền có chiều dài lớn hơn, mớn nước lớn hơn hoặc công suất thiết bị trên 5000 GT, hoặc tàu có chiều dài lớn hơn 150 m hoặc mớn nước trên 7.5 m.</li>
      <li>Vùng đón trả hoa tiêu theo các điều kiện khai thác ngoài lãnh thổ sẽ được gọi là vùng hoa tiêu quốc tế.</li>
    </ol>

    <p class="bold">Điều 2.</p>
    <p>Cảng vụ hàng hải Vũng Tàu có trách nhiệm:</p>
    <ul>
      <li>Quản lý và bảo đảm an toàn hoạt động hàng hải tại vùng đón trả hoa tiêu nêu trên.</li>
      <li>Thực hiện thông tin báo hiệu hàng hải tại vùng đón trả hoa tiêu theo tiêu chuẩn hiện hành.</li>
      <li>Phối hợp chặt chẽ với các cơ quan chuyên ngành để bảo đảm an toàn, an ninh hàng hải.</li>
    </ul>

    <p class="italic">
      Quyết định này có hiệu lực kể từ ngày 15/02/2024.<br />
      Các ông (bà): Chánh Văn phòng Cục Hàng hải Việt Nam, Giám đốc Cảng vụ hàng hải Vũng Tàu, Thủ trưởng các cơ quan, tổ chức liên quan chịu trách nhiệm thi hành Quyết định này.
    </p>
  </div>
`;


    return (
        <>

            <Carousel2 name="Vị trí đón trả hoa tiêu" />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name='Vị trí đón trả hoa tiêu' />
                            <div className="quyet-dinh-container" >

                                <div dangerouslySetInnerHTML={{
                                    __html: vitris[0]?.content?.trim()
                                        ? vitris[0].content
                                        : defaultContentHTML,
                                }} />
                                {/* <h2 className="text-center title">QUYẾT ĐỊNH</h2>
                                <h3 className="text-center subtitle">Công bố vùng đón trả hoa tiêu</h3>
                                <p className="text-center description">
                                    Vùng đón trả hoa tiêu cho các tàu biển tại khu vực hàng hải thuộc địa phận tỉnh Bà Rịa – Vũng Tàu
                                </p>
                                <p className="text-center italic">CỤC TRƯỞNG CỤC HÀNG HẢI VIỆT NAM</p>

                                <div className="content">
                                    <p>
                                        Căn cứ Luật Hàng hải Việt Nam ngày 8 tháng 6 năm 2005;<br />
                                        Căn cứ Nghị định số 21/2012/NĐ-CP ngày 21 tháng 3 năm 2012 của Chính phủ về quản lý cảng biển và luồng hàng hải;<br />
                                        Căn cứ Quyết định số 70/2013/QĐ-TTg ngày 14/11/2013 của Thủ tướng Chính phủ quy định chức năng, nhiệm vụ,
                                        quyền hạn và cơ cấu tổ chức của Bộ Giao thông vận tải;<br />
                                        Căn cứ Thông tư số 54/2018/TT-BGTVT ngày 14 tháng 10 năm 2018 của Bộ trưởng Bộ Giao thông vận tải hướng dẫn một số điều của
                                        Nghị định số 21/2012/NĐ-CP ngày 21/03/2012;<br />
                                        Xét đề nghị của Cảng vụ Hàng hải Vũng Tàu tại Văn bản số 137/CVHHVT-PC ngày 11/01/2024 và văn bản số 05/CVHHVT-PC ngày 03/01/2024;
                                    </p>

                                    <p className="text-center bold">QUYẾT ĐỊNH:</p>

                                    <p className="bold">Điều 1.</p>
                                    <p>
                                        Công bố vùng đón trả hoa tiêu trong khu vực hàng hải thuộc địa phận tỉnh Bà Rịa – Vũng Tàu cho tàu thuyền Việt Nam và tàu thuyền nước ngoài hoạt động tại khu vực hàng hải như sau:
                                    </p>

                                    <ol>
                                        <li>
                                            Vùng hoa tiêu G cho tàu thuyền có chiều dài lớn nhất không quá 135 m và mớn nước thiết kế 7.5 m (trừ tàu chuyên dụng) tại Vũng G tra báo hiệu, có tọa độ như sau:
                                            <div className="table-wrapper">
                                                <table className="coordinate-table">
                                                    <thead>
                                                        <tr>
                                                            <th rowSpan={2}>Tên điểm</th>
                                                            <th colSpan={2}>Tọa độ VN-2000</th>
                                                            <th colSpan={2}>Tọa độ WGS-84</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Vĩ độ</th>
                                                            <th>Kinh độ</th>
                                                            <th>Vĩ độ</th>
                                                            <th>Kinh độ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><td>1</td><td>10°19'51.9"N</td><td>107°04'51.6"E</td><td>10°19'48.6"N</td><td>107°05'00.3"E</td></tr>
                                                        <tr><td>2</td><td>10°19'44.4"N</td><td>107°05'03.4"E</td><td>10°19'41.1"N</td><td>107°05'12.1"E</td></tr>
                                                        <tr><td>3</td><td>10°19'32.1"N</td><td>107°04'38.1"E</td><td>10°19'28.8"N</td><td>107°04'46.8"E</td></tr>
                                                        <tr><td>4</td><td>10°19'40.8"N</td><td>107°04'26.0"E</td><td>10°19'37.5"N</td><td>107°04'34.7"E</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>

                                        <li>
                                            Vùng hoa tiêu H, I, J, K, L, M, N, O áp dụng cho các tàu thuyền có chiều dài lớn nhất không quá 135 m nhưng mớn nước lớn hơn 7.5 m hoặc là tàu chuyên dụng, tàu khách, tàu quân sự, tàu biển có chiều dài lớn hơn 135 m và mớn nước lớn hơn 7.5 m, sẽ được bố trí tại các khu vực khác tùy thuộc vào tính chất cụ thể.
                                        </li>

                                        <li>
                                            Vùng hoa tiêu đặc biệt cho tàu thuyền có chiều dài lớn hơn, mớn nước lớn hơn hoặc công suất thiết bị trên 5000 GT, hoặc tàu có chiều dài lớn hơn 150 m hoặc mớn nước trên 7.5 m. Việc bố trí tàu hoa tiêu sẽ căn cứ vào điều kiện cụ thể của biển.
                                        </li>

                                        <li>
                                            Vùng đón trả hoa tiêu theo các điều kiện khai thác ngoài lãnh thổ sẽ được gọi là vùng hoa tiêu quốc tế.
                                        </li>
                                    </ol>

                                    <p className="bold">Điều 2.</p>
                                    <p>Cảng vụ hàng hải Vũng Tàu có trách nhiệm:</p>
                                    <ul>
                                        <li>Quản lý và bảo đảm an toàn hoạt động hàng hải tại vùng đón trả hoa tiêu nêu trên và điều phối theo đúng quy định pháp luật hiện hành.</li>
                                        <li>Thực hiện thông tin báo hiệu hàng hải tại vùng đón trả hoa tiêu theo tiêu chuẩn hiện hành.</li>
                                        <li>Phối hợp chặt chẽ với các cơ quan chuyên ngành, tổ chức hoa tiêu để bảo đảm an toàn, an ninh hàng hải tại khu vực.</li>
                                    </ul>

                                    <p className="italic">
                                        Quyết định này có hiệu lực kể từ ngày 15/02/2024.<br />
                                        Các ông (bà): Chánh Văn phòng Cục Hàng hải Việt Nam, Giám đốc Cảng vụ hàng hải Vũng Tàu, Thủ trưởng các cơ quan, tổ chức liên quan chịu trách nhiệm thi hành Quyết định này.
                                    </p>
                                </div> */}


                            </div>
                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Vitridontrahoatieu