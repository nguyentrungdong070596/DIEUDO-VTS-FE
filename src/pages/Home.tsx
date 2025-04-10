



import { useEffect, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import "../static/css/home.scss";


import ItemService from "../components/ItemService";

import "../static/css/itemservice.scss";
import "../static/css/gridme.scss";
import Apis, { endpoints, SERVER } from '../configs/Apis';
import { BanLanhDao, Dichvu, Lichsu, Tintuc } from "../interface/InterfaceCommon";
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
import { BounceInView } from "../components/BounceInView";





const Home = () => {
  const { t } = useTranslation();

  const { keyword } = useSearchContext();

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const serviceRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);



  // const { ref, inView } = useInView({
  //   triggerOnce: true, // chỉ animate 1 lần
  //   threshold: 0.2,    // phần trăm phần tử cần hiển thị trong viewport (0.2 = 20%)
  // });




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
  const [gioithieu, setGioiThieu] = useState<Lichsu>();



  const loadLichsucongty = async () => {
    try {
      const params = { limit: 1000, page: 1, itemType: "7" };
      const response = await Apis.get(endpoints.APIItems, { params });



      if (response.data && Array.isArray(response.data.data)) {

        setGioiThieu(response.data.data[0]);
        // console.log("GioiThieu", response.data.data[0]);
        i18n.addResource("vi", "translation", `content_gioithieucongty_${response.data.data[0].id}`, response.data.data[0].content);
        i18n.addResource("en", "translation", `content_gioithieucongty_${response.data.data[0].id}`, response.data.data[0].content_en);


        // Sử dụng totalRecords từ API
        // const total = response.data.totalRecords || response.data.data.length;

      } else {
        console.error("Dữ liệu API không đúng định dạng:", response.data);
        setGioiThieu(gioithieu);
      }
    } catch (error) {
      console.error("Lỗi khi load hoa tiêu:", error);
      setGioiThieu(gioithieu);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadLichsucongty();
    };

    fetchData();
  }, []);

  const loadTintuc = async () => {
    try {
      const params = { limit: itemsPerPage, page: 1 };
      const response = await Apis.get(endpoints.APINews, { params });



      if (response.data && Array.isArray(response.data.data)) {
        for (const item of response.data.data) {
          // Dịch title
          // const vietnameseTitle = await translateWithGoogle(item.title, 'Vietnamese');
          i18n.addResource('vi', 'translation', `title_tintuc_${item.id}`, item.title);
          // const englishTitle = await translateWithGoogle(item.title, 'English');
          i18n.addResource('en', 'translation', `title_tintuc_${item.id}`, item.title_en);



          // Dịch subtitle
          // const vietnameseSubtitle = await translateWithGoogle(item.subtitle, 'Vietnamese');
          i18n.addResource('vi', 'translation', `subtitle_tintuc_${item.id}`, item.subtitle);
          // const englishSubtitle = await translateWithGoogle(item.subtitle, 'English');
          i18n.addResource('en', 'translation', `subtitle_tintuc_${item.id}`, item.subtitle_en);

          // Dịch content
          // const vietnameseContent = await translateWithGoogle(item.content, 'Vietnamese');
          i18n.addResource('vi', 'translation', `content_tintuc_${item.id}`, item.content);
          // const englishContent = await translateWithGoogle(item.content, 'English');
          i18n.addResource('en', 'translation', `content_tintuc_${item.id}`, item.content_en);

        }
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
  const { i18n } = useTranslation();



  const loadDichVu = async () => {
    try {
      const params = { limit: itemsPerPage, page: 1 };
      const response = await Apis.get(endpoints.APIDichvu, { params });



      if (response.data && Array.isArray(response.data.data)) {
        // Dịch 3 trường: title, subtitle, content
        for (const item of response.data.data) {
          // Dịch title
          // const vietnameseTitle = await translateWithGoogle(item.title, 'Vietnamese');
          i18n.addResource('vi', 'translation', `title_dichvu_${item.id}`, item.title);
          // const englishTitle = await translateWithGoogle(item.title, 'English');
          i18n.addResource('en', 'translation', `title_dichvu_${item.id}`, item.title_en);



          // Dịch subtitle
          // const vietnameseSubtitle = await translateWithGoogle(item.subtitle, 'Vietnamese');
          i18n.addResource('vi', 'translation', `subtitle_dichvu_${item.id}`, item.subtitle);
          // const englishSubtitle = await translateWithGoogle(item.subtitle, 'English');
          i18n.addResource('en', 'translation', `subtitle_dichvu_${item.id}`, item.subtitle_en);

          // Dịch content
          // const vietnameseContent = await translateWithGoogle(item.content, 'Vietnamese');
          i18n.addResource('vi', 'translation', `content_dichvu_${item.id}`, item.content);
          // const englishContent = await translateWithGoogle(item.content, 'English');
          i18n.addResource('en', 'translation', `content_dichvu_${item.id}`, item.content_en);

        }
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

        {/* <iframe
          title="Astronaut 3D Model"
          className="sketchfab-embed"
          src="https://sketchfab.com/3d-models/209d0e8d18c54c0d96fd3206c90eee30/embed/?ui_infos=0" // Thay abc123 bằng ID mô hình thực tế
          frameBorder="0"
          allow="autoplay; fullscreen; vr"
          allowFullScreen
        ></iframe> */}
        {/* <Scene /> */}


        <div className="row about-flex">
          <div className="col-custom flex h-[680px] m-12 c-12 l-6 overflow-hidden relative group">
            <div className="flex flex-col animate-marquee-up gap-1 left-about group-hover:animation-paused">
              {[...banlanhdao, ...banlanhdao].map((item, index) => (
                <div className="item-about h-[200px]" key={index}>
                  <img
                    src={`${SERVER}/${item.image}`}
                    className="h-full w-full object-cover"
                    alt={item.title || "Image"}
                  />
                </div>
              ))}
            </div>
          </div>




          <div className="col-custom m-12 c-12 l-6" >
            <div className="right-about">
              <h2 className="animate__animated animate__backInUp title-right-box"
                data-aos="fade-up" data-aos-once="false"
                ref={aboutRef}

              >{t('aboutUs')}</h2>


              {/* <p
                className="animate__animated animate__fadeInRight content-text"

              >
              
                {t('aboutUsParagraph')}
              </p> */}

              {gioithieu && (

                <p dangerouslySetInnerHTML={{
                  __html: t(`content_gioithieucongty_${gioithieu?.id}`) || t(`aboutUs`)
                }} className="animate__animated animate__fadeInRight content-text"></p>
              )}


              {/* <p
                ref={paragraphRef}
                data-aos="fade-up"
                style={{ textAlign: "justify", minHeight: "200px" }}
              >
                Hiển thị nội dung gõ tại đây
              </p> */}
              <Link to='/gioi-thieu-cong-ty'>
                <button className="custom-button docthemgioithieu-btn" >
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
              <div className="flex items-center justify-center  " >

                {/* <BounceInView delay={0.2}>
                  <img src="/iconcloud.gif" className="w-24 h-24" />
                </BounceInView> */}
              </div>

              {/* <div className="flex items-center justify-center">
                <motion.img
                  ref={ref}
                  src="/iconcloud.gif"
                  alt="cloud"
                  className="w-24 h-24"
                  initial={{ opacity: 0, scale: 0.5, y: -100 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                    delay: 0.3, // 👉 Delay để người dùng kịp nhìn thấy
                    duration: 1.2, // 👉 Cho cảm giác chậm rãi, nổi bật hơn
                  }}
                />
              </div> */}
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
              // data-aos="fade-up"
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
                <ItemService key={index} name={t(`title_dichvu_${item.id}`)} desc={t(`content_dichvu_${item.id}`)} img={`${SERVER}/${item.image}`} />

                {/* < ItemService key={index} name={item.title} desc={item.content} img={`${SERVER}/${item.image}`} */}
                {/* /> */}
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

      {/* <HorizontalScrollSection /> */}

      <div className="gridme newsofus wide">

        <div className="row">


          <div className="col-custom m-12 text-center c-12 l-12 relative sec-title space-y-4">
            {/* <div className="flex items-center justify-center animate__animated animate__fadeInUp ">
              <img src="/global.png" alt="" className="w-24 h-24" />

            </div> */}
            <div className="flex items-center justify-center">

              {/* <BounceInView delay={0.2}>
                <img src="/iconglobal.png" className="w-24 h-24" />
              </BounceInView> */}
            </div>

            {/* <div className="flex items-center justify-center">
              <motion.img
                ref={ref}
                src="/iconglobal.png"
                alt="globe"
                className="w-24 h-24"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 12,
                  delay: 0.3, // 👉 Delay để người dùng kịp nhìn thấy
                  duration: 1.2, // 👉 Cho cảm giác chậm rãi, nổi bật hơn
                }}
              />
            </div> */}
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
