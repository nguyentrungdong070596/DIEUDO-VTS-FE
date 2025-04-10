import { useEffect, useState } from 'react'
import Titlepage from '../components/Titlepage'
import '../static/css/vunghoatieu.scss'
import SidebarMenu from '../layout/Sidebar'
import Carousel2 from '../components/Carousel2'
import { VungHoaTieu } from '../interface/InterfaceCommon'
import Apis, { endpoints } from '../configs/Apis'
import { useTranslation } from 'react-i18next'



const Vunghoatieu = () => {
    const { t, i18n } = useTranslation();



    const [vunghoatieus, setvunghoatieu] = useState<VungHoaTieu[]>([]);


    const loadvunghoatieu = async () => {
        try {
            const params = { limit: 1000, page: 1, itemType: '11' };
            const response = await Apis.get(endpoints.APIItems, { params });



            if (response.data && Array.isArray(response.data.data)) {

                // Dịch 3 trường: title, subtitle, content
                for (const item of response.data.data) {
                    // Dịch title
                    // const vietnameseTitle = await translateWithGoogle(item.title, 'Vietnamese');
                    i18n.addResource('vi', 'translation', `title_vunghoatieu_${item.id}`, item.title);
                    // const englishTitle = await translateWithGoogle(item.title, 'English');
                    i18n.addResource('en', 'translation', `title_vunghoatieu_${item.id}`, item.title_en);


                    // Dịch subtitle
                    // const vietnameseSubtitle = await translateWithGoogle(item.subtitle, 'Vietnamese');
                    i18n.addResource('vi', 'translation', `subtitle_vunghoatieu_${item.id}`, item.subtitle);
                    // const englishSubtitle = await translateWithGoogle(item.subtitle, 'English');
                    i18n.addResource('en', 'translation', `subtitle_vunghoatieu_${item.id}`, item.subtitle_en);

                    // Dịch content
                    // const vietnameseContent = await translateWithGoogle(item.content, 'Vietnamese');
                    i18n.addResource('vi', 'translation', `content_vunghoatieu_${item.id}`, item.content);
                    // const englishContent = await translateWithGoogle(item.content, 'English');
                    i18n.addResource('en', 'translation', `content_vunghoatieu_${item.id}`, item.content_en);

                }
                setvunghoatieu(response.data.data);

                // Sử dụng totalRecords từ API
                // const total = response.data.totalRecords || response.data.data.length;

            } else {
                console.error("Dữ liệu API không đúng định dạng:", response.data);
                setvunghoatieu([]);
            }
        } catch (error) {
            console.error("Lỗi khi load hoa tiêu:", error);
            setvunghoatieu([]);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await loadvunghoatieu();
        };

        fetchData();
    }, []);

    return (
        <>
            <Carousel2 name={t("pilotArea")} />
            <div className="gridme wide">

                <div className="row">
                    <SidebarMenu />

                    <div className='col-custom l-9 m-12 c-12'>
                        <div className=''>


                            <Titlepage name={t("pilotArea")} />

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: t(`content_vunghoatieu_${vunghoatieus[0]?.id}`) || `
      <div class="container">
        <img src="/mapvietnam.png" alt="Bản đồ vùng hoa tiêu" class="hoa-tieu-image" />
        <div class="vung-section">
          <strong>Vùng 1: Vùng hoa tiêu bắt buộc từ tỉnh Quảng Ninh đến tỉnh Nam Định:</strong>
          Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Quảng Ninh, Thái Bình, Nam Định và thành phố Hải Phòng.
        </div>
        <div class="vung-section">
          <strong>Vùng 2: Vùng hoa tiêu bắt buộc từ tỉnh Thanh Hóa đến tỉnh Quảng Trị:</strong>
          Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Thanh Hóa, Nghệ An, Hà Tĩnh, Quảng Bình và Quảng Trị.
        </div>
        <div class="vung-section">
          <strong>Vùng 3: Vùng hoa tiêu bắt buộc từ tỉnh Thừa Thiên Huế đến tỉnh Quảng Ngãi:</strong>
          Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Thừa Thiên Huế, Đà Nẵng và Quảng Ngãi.
        </div>
        <div class="vung-section">
          <strong>Vùng 4: Vùng hoa tiêu bắt buộc từ tỉnh Bình Định đến tỉnh Phú Yên:</strong>
          Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Bình Định và Phú Yên.
        </div>
        <div class="vung-section">
          <strong>Vùng 5: Vùng hoa tiêu bắt buộc từ tỉnh Khánh Hòa đến tỉnh Ninh Thuận:</strong>
          Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Khánh Hòa và Ninh Thuận.
        </div>
        <div class="vung-section">
          <strong>Vùng 6: Vùng hoa tiêu bắt buộc địa phận các tỉnh Bình Thuận, Bà Rịa – Vũng Tàu, Đồng Nai, Bình Dương, Long An, thành phố Hồ Chí Minh và các tuyến đón theo sông Tiền:</strong>
          Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Bình Thuận, Bà Rịa – Vũng Tàu, Đồng Nai, Bình Dương, thành phố Hồ Chí Minh và các tuyến theo sông Tiền.
        </div>
        <div class="vung-section">
          <strong>Vùng 7: Vùng hoa tiêu bắt buộc các tỉnh theo sông Hậu, các tỉnh Kiên Giang và Cà Mau:</strong>
          Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh thuộc theo sông Hậu và các tỉnh thuộc tỉnh Sóc Trăng, Bạc Liêu, Kiên Giang và Cà Mau.
        </div>
        <div class="vung-section">
          <strong>Vùng 8: Vùng hoa tiêu bắt buộc tại các khu vực khai thác dầu khí ngoài khơi trong vùng biển Việt Nam:</strong>
          Từ các vùng đón trả hoa tiêu vào các cảng biển, bến cảng, cầu cảng dầu khí ngoài khơi, các công trình dầu khí tại các mỏ khai thác dầu khí trên vùng biển Việt Nam.
        </div>
      </div>
    `
                                }}
                            />


                            {/* <div className="container">

                                <img src="/mapvietnam.png" alt="Bản đồ vùng hoa tiêu" className="hoa-tieu-image" />

                                <div className="vung-section">
                                    <strong>Vùng 1: Vùng hoa tiêu bắt buộc từ tỉnh Quảng Ninh đến tỉnh Nam Định:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Quảng Ninh, Thái Bình, Nam Định và thành phố Hải Phòng.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 2: Vùng hoa tiêu bắt buộc từ tỉnh Thanh Hóa đến tỉnh Quảng Trị:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Thanh Hóa, Nghệ An, Hà Tĩnh, Quảng Bình và Quảng Trị.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 3: Vùng hoa tiêu bắt buộc từ tỉnh Thừa Thiên Huế đến tỉnh Quảng Ngãi:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Thừa Thiên Huế, Đà Nẵng và Quảng Ngãi.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 4: Vùng hoa tiêu bắt buộc từ tỉnh Bình Định đến tỉnh Phú Yên:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Bình Định và Phú Yên.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 5: Vùng hoa tiêu bắt buộc từ tỉnh Khánh Hòa đến tỉnh Ninh Thuận:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Khánh Hòa và Ninh Thuận.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 6: Vùng hoa tiêu bắt buộc địa phận các tỉnh Bình Thuận, Bà Rịa – Vũng Tàu, Đồng Nai, Bình Dương, Long An, thành phố Hồ Chí Minh và các tuyến đón theo sông Tiền:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh Bình Thuận, Bà Rịa – Vũng Tàu, Đồng Nai, Bình Dương, thành phố Hồ Chí Minh và các tuyến theo sông Tiền.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 7: Vùng hoa tiêu bắt buộc các tỉnh theo sông Hậu, các tỉnh Kiên Giang và Cà Mau:</strong>
                                    Từ các vùng đón trả hoa tiêu vào cảng biển, bến cảng, cầu cảng, khu neo đậu, khu chuyển tải, khu tránh bão và nhà máy đóng, sửa chữa tàu biển trong vùng nước cảng biển thuộc địa phận các tỉnh thuộc theo sông Hậu và các tỉnh thuộc tỉnh Sóc Trăng, Bạc Liêu, Kiên Giang và Cà Mau.
                                </div>

                                <div className="vung-section">
                                    <strong>Vùng 8: Vùng hoa tiêu bắt buộc tại các khu vực khai thác dầu khí ngoài khơi trong vùng biển Việt Nam:</strong>
                                    Từ các vùng đón trả hoa tiêu vào các cảng biển, bến cảng, cầu cảng dầu khí ngoài khơi, các công trình dầu khí tại các mỏ khai thác dầu khí trên vùng biển Việt Nam.
                                </div>
                            </div> */}


                        </div>


                    </div>

                </div>



            </div>
        </>


    )
}

export default Vunghoatieu