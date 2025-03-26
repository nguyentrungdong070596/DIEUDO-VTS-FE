import { useEffect, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import "../static/css/home.scss";


import ItemService from "../components/ItemService";

import "../static/css/itemservice.scss";
import "../static/css/gridme.scss";
import Apis, { endpoints, SERVER } from '../configs/Apis';
import { BanLanhDao, Dichvu, Tintuc } from "../interface/InterfaceCommon";
import NewsDialog from "../components/NewsDialog";

import 'swiper/swiper-bundle.css';
import NewsListCarousel from "../components/NewsListCarousel";
import { Link } from "react-router-dom";
import DichvuDialog from "../components/DichvuDialog";

import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import { useSearchContext } from "../context/SearchContext";
import { useTranslation } from "react-i18next";




const Home = () => {
  const { t } = useTranslation();

  const { keyword } = useSearchContext();

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const serviceRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (keyword.trim() === '') return;

    const search = keyword.toLowerCase().trim();

    const aboutKeywords = ['giới thiệu', 'về chúng tôi', 'about us', 'about'];
    const serviceKeywords = ['dịch vụ', 'service', 'services'];
    const newsKeywords = ['tin tức', 'news'];

    if (aboutKeywords.some(k => search.includes(k)) && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (serviceKeywords.some(k => search.includes(k)) && serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (newsKeywords.some(k => search.includes(k)) && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [keyword]);


  const paragraphDichVuRef = useRef<HTMLParagraphElement>(null);
  const paragraphTinTucRef = useRef<HTMLParagraphElement>(null);
  // const fullTextDichVu = `giải pháp thực tế - nhanh chóng - tiết kiệm`;
  const fullTextDichVu = t("subTitleService");
  const fullTextTinTuc = t("subTitleNews");

  // const fullTextTinTuc = `tin tức & sự kiện mới nhất của chúng tôi`;
  // const fullTextTinTuc = `Tin tức và các sự kiện mới nhất của chúng tôi`;

  useEffect(() => {
    AOS.init({
      duration: 1000,   // thời gian hiệsu ứng (ms)
      once: false,       // chỉ animate 1 lần khi scroll
      mirror: true, // ✅ chạy lại khi cuộn từ dưới lên

    });

    // Nếu DOM có thể thay đổi sau này, gọi AOS.refresh
    setTimeout(() => {
      AOS.refresh(); // đảm bảo cập nhật lại nếu DOM thay đổi sau vài giây
    }, 300);



    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && paragraphDichVuRef.current) {
          let i = 0;
          const interval = setInterval(() => {
            if (!paragraphDichVuRef.current) {
              clearInterval(interval);
              return;
            }
            if (i <= fullTextDichVu.length) {
              paragraphDichVuRef.current.innerText = fullTextDichVu.substring(0, i);
              i++;
            } else {
              clearInterval(interval);
            }
          }, 20);
        }

        if (entry.isIntersecting && paragraphTinTucRef.current) {
          let i = 0;
          const interval = setInterval(() => {
            if (!paragraphTinTucRef.current) {
              clearInterval(interval);
              return;
            }
            if (i <= fullTextTinTuc.length) {
              paragraphTinTucRef.current.innerText = fullTextTinTuc.substring(0, i);
              i++;
            } else {
              clearInterval(interval);
            }
          }, 20);
        }

      },
      { threshold: 0.5 }
    );

    if (paragraphTinTucRef.current) observer.observe(paragraphTinTucRef.current);
    if (paragraphDichVuRef.current) observer.observe(paragraphDichVuRef.current);




    return () => observer.disconnect();
  }, []);


  // scroll tới đâu hiệu ứng =========================================

  const sectionRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // observer.unobserve(entry.target);
          }
          // else {
          //   setIsVisible(false); // để khi scroll ra khỏi, lần sau vào lại sẽ trigger lại animation

          // }
        });
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);





  const [tintucs, setTintuc] = useState<Tintuc[]>([]);
  const [dichvus, setDichvu] = useState<Dichvu[]>([]);
  const [banlanhdao, setBanLanhDao] = useState<BanLanhDao[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Limit gửi lên API
  // State cho dialog
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<Tintuc | null>(null);
  const [selectedDichvu, setSelectedDichvu] = useState<Dichvu | null>(null);

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Giả lập API loading
  //   setTimeout(() => setLoading(false), 2000);
  // }, []);
  // useEffect(() => {
  //   // Giả lập API loading
  //   setTimeout(() => setLoading(false), 2000);
  // }, []);

  const loadTintuc = async () => {
    try {
      const params = { limit: itemsPerPage, page: 1 };
      const response = await Apis.get(endpoints.APINews, { params });



      if (response.data && Array.isArray(response.data.data)) {
        setTintuc(response.data.data);
        // Sử dụng totalRecords từ API

      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setTintuc([]);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setTintuc([]);
    }
  };



  const loadDichVu = async () => {
    try {
      const params = { limit: itemsPerPage, page: 1 };
      const response = await Apis.get(endpoints.APIDichvu, { params });



      if (response.data && Array.isArray(response.data.data)) {
        setDichvu(response.data.data);


        // Sử dụng totalRecords từ API

      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setDichvu([]);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setDichvu([]);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await loadBanLanhDao();
    };

    fetchData();
  }, []);

  const loadBanLanhDao = async () => {
    try {
      const params = { limit: 1000, page: 1, itemType: "5" };
      const response = await Apis.get(endpoints.APIItems, { params });



      if (response.data && Array.isArray(response.data.data)) {
        setBanLanhDao(response.data.data);


        // Sử dụng totalRecords từ API

      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setBanLanhDao([]);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setBanLanhDao([]);
    }
  };


  useEffect(() => {
    loadTintuc();

  }, []);



  useEffect(() => {
    loadBanLanhDao();
  }, []);


  useEffect(() => {
    loadDichVu();
    // console.log("dichvu", dichvus)

  }, []);



  useEffect(() => {
    loadTintuc();
  }, []);



  // Mở dialog và truyền dữ liệu
  const handleOpenDialogNews = (item: Tintuc) => {
    // Tạo bản sao của item với content đã được xử lý
    const updatedItem = {
      ...item, // Copy tất cả thuộc tính của item
      content: (item.content), // Ghi đè content bằng giá trị đã xử lý
    };

    setSelectedNews(updatedItem); // Truyền bản sao đã xử lý vào state
    setIsDialogOpen(true); // Mở dialog
  };

  // Mở dialog và truyền dữ liệu
  const handleOpenDialogDichVu = (item: Dichvu) => {
    // Tạo bản sao của item với content đã được xử lý
    const updatedItem = {
      ...item, // Copy tất cả thuộc tính của item
      content: (item.content), // Ghi đè content bằng giá trị đã xử lý
    };

    setSelectedDichvu(updatedItem); // Truyền bản sao đã xử lý vào state
    setIsDialogOpen(true); // Mở dialog
  };
  // Đóng dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedNews(null);
    setSelectedDichvu(null);
  };





  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (currentIndex: any) => {
    currentIndex
    setCurrentIndex((prev) => (prev + 1) % tintucs.length);
  };



  // Auto slide mỗi 5s
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(currentIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [tintucs.length]);

  return (
    <>
      {/* <BubbleBackground /> */}

      <Carousel />




      <div className="gridme about wide">

        <div className="row about-flex">
          <div className="col-custom flex h-[500px] m-12 c-12 l-6 overflow-hidden relative">
            <div className="flex flex-col animate-[marquee-up_10s_linear_infinite] gap-4 left-about">

              {

                banlanhdao.map((item, index) => (
                  // <Link key={index} to={`/dich-vu/${item.Id}`} className="col-custom m-12 c-12 l-4" style={{
                  //   textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: "inherit"
                  // }}>

                  < div
                    className="item-about"
                    key={index}
                  >

                    <img src={`${SERVER}/${item.image}`}
                      className="h-auto w-full" />
                  </div>
                  // </Link>
                ))}

              {/* {
                banlanhdao.map((item, index) => {
                  <div className="item-about"><img src="/tau1.png" className="h-auto w-full" /></div>

                })
              } */}
              {/* <div className="item-about"><img src="/tau1.png" className="h-auto w-full" /></div>
              <div className="item-about"><img src="/tau2.png" className="h-auto w-full" /></div>
              <div className="item-about"><img src="/tau1.png" className="h-auto w-full" /></div>
              <div className="item-about"><img src="/tau2.png" className="h-auto w-full" /></div>
              <div className="item-about"><img src="/tau1.png" className="h-auto w-full" /></div>
              <div className="item-about"><img src="/tau2.png" className="h-auto w-full" /></div>

              <div className="item-about"><img src="/tau1.png" className="h-auto w-full" /></div>
              <div className="item-about"><img src="/tau2.png" className="h-auto w-full" /></div>
              <div className="item-about"><img src="/tau1.png" className="h-auto w-full" /></div>
              <div className="item-about"><img src="/tau2.png" className="h-auto w-full" /></div> */}
            </div>
          </div>





          <div className="col-custom m-12 c-12 l-6" >
            <div className="right-about">
              <h2 className="animate__animated animate__backInUp title-right-box"
                data-aos="fade-up" data-aos-once="false"
                ref={aboutRef}

              >{t('aboutUs')}</h2>


              <p
                className="animate__animated animate__fadeInRight content-text"

              >
                {/* Công ty Dịch vụ và Vận tải biển Vũng Tàu (VUNGTAUSHIP) được thành lập ngày 10/02/1990 theo quyết định của UBND Đặc khu Vũng Tàu Côn Đảo. Công ty được thành lập lại là Doanh nghiệp nhà nước theo Quyết định số 12/QĐ-UBT ngày 27/11/1992 của UBND tỉnh Bà Rịa – Vũng Tàu với vốn điều lệ ban đầu là: 7.467.638.393 đồng.
                <br /><br />
                Từ một doanh nghiệp Nhà nước trực thuộc Sở Giao thông Vận tải tỉnh với hoạt động ban đầu chỉ là cung ứng tàu biển và dịch vụ hàng hải, VUNGTAUSHIP đã dần mở rộng kinh doanh, phát triển thêm nhiều hoạt động dịch vụ mới như logistics, hoạt động hoa tiêu hàng hải, cung ứng và quản lý nguồn nhân lực, kinh doanh dịch vụ khách sạn và mở rộng hoạt động ra nhiều tỉnh thành khác như TPHCM, Hà Nội, Đồng Nai, Kiên Giang đạt được hiệu quả kinh tế cao trong nhiều năm liền, nhận được nhiều bằng khen của tỉnh Bà Rịa - Vũng Tàu và Bộ Giao thông Vận tải. Năm 2004, VUNGTAUSHIP vinh dự nhận được Huân chương Lao động hạng Nhất do Thủ tướng Chính phủ trao tặng... */}

                {t('aboutUsParagraph')}
              </p>


              {/* <p
                ref={paragraphRef}
                data-aos="fade-up"
                style={{ textAlign: "justify", minHeight: "200px" }}
              >
                Hiển thị nội dung gõ tại đây
              </p> */}
              <Link to='/gioi-thieu-cong-ty'>
                <button className="custom-button" >
                  {t('viewDetail')}
                </button>
              </Link>
            </div>
          </div>
        </div >
      </div >
      <div
        ref={serviceRef}
        style={{ marginTop: '50px', height: '50px' }}
      >

      </div>
      <div className="serviceofus" >
        <div className="gridme wide">
          <div className="row">
            <div className="col-custom m-12 text-center c-12 l-12 relative sec-title space-y-4">

              <h2
                // className="text-2xl animate__animated animate__fadeInDown drop-shadow-md font-extrabold md:text-4xl sm:text-3xl sm:tracking-wider title-box tracking-normal uppercase"
                className={`text-2xl  drop-shadow-md font-extrabold md:text-4xl sm:text-3xl sm:tracking-wider title-box tracking-normal uppercase ${isVisible ? 'animate__animated animate__fadeInDown' : 'opacity-0'}`}
                data-aos="fade-up"
                data-aos-once="false"
              >
                {/* DỊCH VỤ CỦA CHÚNG TÔI */}
                {t('UsService')}
              </h2>


              <p
                className="text-base text-gray-700 animate__animated animate__fadeInUp font-light italic leading-relaxed md:text-lg mx-auto sub-title tracking-widest"
                ref={paragraphDichVuRef}
                data-aos="fade-up"
              >
              </p>

              {/* <div className="bg-[#0196da] h-1 rounded-full w-16 mt-2 mx-auto"></div> */}
            </div>

          </div>

          <div className="row service-itemes">
            {dichvus.map((item, index) => (
              // <Link key={index} to={`/dich-vu/${item.Id}`} className="col-custom m-12 c-12 l-4" style={{
              //   textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: "inherit"
              // }}>

              <div
                className="col-custom m-12 c-12 l-4 service-item1"
                key={index}
                onClick={() => handleOpenDialogDichVu(item)}
                style={{ cursor: 'pointer' }} >

                < ItemService key={index} name={item.title} desc={item.content} img={`${SERVER}/${item.image}`}
                />
              </div>
              // </Link>
            ))}
          </div>

          {/* <div className="row service-itemes">
          <ItemService name={name} />
          <ItemService />




        </div> */}
        </div>
      </div >



      <div
        ref={contactRef}
        style={{ marginTop: '10px', height: '10px' }}
      >
      </div>

      <div className="gridme newsofus wide">
        <div className="row">

          <div className="col-custom m-12 text-center c-12 l-12 relative sec-title space-y-4">

            <h2
              className={`text-2xl  drop-shadow-md font-extrabold md:text-4xl sm:text-3xl sm:tracking-wider title-box tracking-normal uppercase ${isVisible ? 'animate__animated animate__fadeInDown' : 'opacity-0'}`}
              data-aos="fade-up"
              data-aos-once="false"
            >
              {/* TIN TỨC & SỰ KIỆN */}
              {t('newsAndEvent')}
            </h2>


            <p
              className="text-base text-gray-700 animate__animated animate__fadeInUp font-light italic leading-relaxed md:text-lg mx-auto sub-title tracking-widest"
              ref={paragraphTinTucRef}
              data-aos="fade-up"
            >
            </p>

            {/* <div className="bg-[#0196da] h-1 rounded-full w-16 mt-2 mx-auto"></div> */}
          </div>

        </div>
        {/* <RollingGallery autoplay={true} pauseOnHover={true} dragSensitivity={0.03} /> */}


        <div className="row news-itemes">

          {/* {tintucs.map((item, index) => (
           
            <Itemgiadichvu key={index} name={item.title} desc={item.content} img={`${SERVER}/${item.image}`} />
          ))} */}


          {/* {tintucs.map((item, index) => (
            <div
              key={index}
              onClick={() => handleOpenDialog(item)}
              style={{ cursor: 'pointer' }}
              className="col-custom l-4"
            >
              <Newshome title={item.title}
                desc={stripHtml(item.content)}
                time={item.postdate}

                img={`${SERVER}/${item.image}`}
              />

            </div>
          ))} */}

          <NewsListCarousel
            items={tintucs} // Tintuc[]
            onItemClick={handleOpenDialogNews} // (item: Tintuc) => void
            imageBaseUrl={SERVER}
          />








        </div>


      </div>

      {/* Sử dụng component NewsDialog */}
      <NewsDialog
        isOpen={isDialogOpen}
        newsItem={selectedNews}
        onClose={handleCloseDialog}
      />

      {/* Sử dụng component NewsDialog */}
      <DichvuDialog
        isOpen={isDialogOpen}
        dichvuItem={selectedDichvu}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default Home;
