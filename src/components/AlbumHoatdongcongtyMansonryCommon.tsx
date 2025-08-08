import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { HoatDongCongTy as HoatDongCongTyBase } from "../interface/InterfaceCommon";
import Apis, { endpoints, SERVER } from "../configs/Apis";
import { Link } from "react-router-dom";
import CommonPagination from "./CommonPagination";
import VideoCard from "./VideoCard";
import { useTranslation } from "react-i18next";
import Masonry from "react-masonry-css";
import "../static/css/masonry.css";

interface HoatDongCongTy extends HoatDongCongTyBase {
  aspectRatio?: number;
  title_en?: string;
  subtitle_en?: string;
  content_en?: string;
}

function AlbumHoatdongcongtyMasonryCommon() {
  const [data, setData] = useState<HoatDongCongTy[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const loadingRef = useRef(false);
  const itemsPerPage = 16;
  const { t, i18n } = useTranslation();

  const loadData = useCallback(async (page: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      const params = {
        limit: itemsPerPage,
        page,
        itemType: "8",
        showHiddenItem: true,
      };

      const res = await Apis.get(endpoints.APIItems, { params });
      const items: HoatDongCongTy[] = Array.isArray(res?.data?.data)
        ? res.data.data
        : [];
      const total = res?.data?.totalRecords || items.length;

      items.forEach((item) => {
        i18n.addResource("vi", "translation", `title_hoatdongcongty_${item.id}`, item.title);
        i18n.addResource("en", "translation", `title_hoatdongcongty_${item.id}`, item.title_en ?? "");
        i18n.addResource("vi", "translation", `subtitle_hoatdongcongty_${item.id}`, item.subtitle ?? "");
        i18n.addResource("en", "translation", `subtitle_hoatdongcongty_${item.id}`, item.subtitle_en ?? "");
        i18n.addResource("vi", "translation", `content_hoatdongcongty_${item.id}`, item.content ?? "");
        i18n.addResource("en", "translation", `content_hoatdongcongty_${item.id}`, item.content_en ?? "");
      });

      setData(items);
      setTotalItems(total);
    } catch (err) {
      console.error("Error loading data:", err);
      setData([]);
      setTotalItems(0);
    } finally {
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage, loadData]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1024: 2,
    768: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((item) => (
          <div key={item.id} data-id={item.id} className="mb-5" style={{marginBottom: "calc(var(--spacing) * 5) !important"}}>
            <Link
              to={`/hoat-dong-cong-ty/detail/${item.id}`}
              state={{ hoatdongItem: item }}
            >
              <div className="group rounded-lg shadow-md hover:shadow-xl overflow-hidden relative transition w-full">
                {item.videourl ? (
                  <VideoCard item={item} />
                ) : item.image ? (
                  <img
                    src={`${SERVER}/${item.image}`}
                    alt={t(`title_hoatdongcongty_${item.id}`) ?? item.title}
                    className="w-full object-cover rounded-md transition-all duration-300 group-hover:brightness-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">
                    No Image
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </Masonry>

      <CommonPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default AlbumHoatdongcongtyMasonryCommon;



// import { useState, useEffect, useRef, useCallback } from "react";
// import { useTransition, animated, AnimatedProps } from "@react-spring/web";
// import { HoatDongCongTy as HoatDongCongTyBase } from "../interface/InterfaceCommon";
// import Apis, { endpoints, SERVER } from "../configs/Apis";
// import { Link } from "react-router-dom";
// import CommonPagination from "./CommonPagination";
// import VideoCard from "./VideoCard";
// import { useTranslation } from "react-i18next";

// // Extend HoatDongCongTy to include aspectRatio
// interface HoatDongCongTy extends HoatDongCongTyBase {
//   aspectRatio?: number;
//   title_en?: string;
//   subtitle_en?: string;
//   content_en?: string;
// }

// type AnimatedDivProps = AnimatedProps<React.HTMLAttributes<HTMLDivElement>>;
// const AnimatedDiv = animated.div as React.FC<AnimatedDivProps>;

// function AlbumHoatdongcongtyMansonryCommon() {
//   const [data, setData] = useState<HoatDongCongTy[]>([]);
//   const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
//   const ref = useRef<HTMLDivElement>(null);
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const { t, i18n } = useTranslation();

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const itemsPerPage = 16;
//   const [totalItems, setTotalItems] = useState(0);
//   const loadingRef = useRef(false);

//   const loadHoatdongcongty = useCallback(async (page: number) => {
//     if (loadingRef.current) return;
//     loadingRef.current = true;

//     try {
//       const params = {
//         limit: itemsPerPage,
//         page,
//         itemType: "8",
//         showHiddenItem: true,
//       };
//       const response = await Apis.get(endpoints.APIItems, { params });
//       const items: HoatDongCongTy[] = Array.isArray(response?.data?.data)
//         ? response.data.data
//         : [];
//       const total = response?.data?.totalRecords || items.length;

//       for (const item of items) {
//         i18n.addResource(
//           "vi",
//           "translation",
//           `title_hoatdongcongty_${item.id}`,
//           item.title,
//         );
//         i18n.addResource(
//           "en",
//           "translation",
//           `title_hoatdongcongty_${item.id}`,
//           item.title_en ?? "",
//         );
//         i18n.addResource(
//           "vi",
//           "translation",
//           `subtitle_hoatdongcongty_${item.id}`,
//           item.subtitle ?? "",
//         );
//         i18n.addResource(
//           "en",
//           "translation",
//           `subtitle_hoatdongcongty_${item.id}`,
//           item.subtitle_en ?? "",
//         );
//         i18n.addResource(
//           "vi",
//           "translation",
//           `content_hoatdongcongty_${item.id}`,
//           item.content ?? "",
//         );
//         i18n.addResource(
//           "en",
//           "translation",
//           `content_hoatdongcongty_${item.id}`,
//           item.content_en ?? "",
//         );
//       }
//       setData(items);
//       setTotalItems(total);
//     } catch (err) {
//       console.error("Error loading:", err);
//       setData([]);
//       setTotalItems(0);
//     } finally {
//       loadingRef.current = false;
//     }
//   }, []);

//   useEffect(() => {
//     loadHoatdongcongty(currentPage);
//   }, [currentPage, loadHoatdongcongty]);

//   useEffect(() => {
//     setVisibleItems(new Set());
//   }, [data]);

//   useEffect(() => {
//     if (!ref.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         setVisibleItems((prev) => {
//           const updated = new Set(prev);
//           entries.forEach((entry) => {
//             const id = Number(entry.target.getAttribute("data-id"));
//             if (!isNaN(id)) {
//               if (entry.isIntersecting) updated.add(id);
//               else updated.delete(id);
//             }
//           });
//           return updated;
//         });
//       },
//       { threshold: 0.1 },
//     );

//     observerRef.current = observer;
//     const targets = ref.current.querySelectorAll("[data-id]");
//     targets.forEach((el) => observer.observe(el));

//     return () => {
//       targets.forEach((el) => observer.unobserve(el));
//     };
//   }, [data]);

//   const transitions = useTransition(data, {
//     keys: (item: HoatDongCongTy) => item.id,
//     from: { opacity: 0, transform: "translateY(20px)" },
//     enter: { opacity: 1, transform: "translateY(0px)" },
//     leave: { opacity: 0, transform: "translateY(20px)" },
//     config: { mass: 1, tension: 280, friction: 30 },
//     trail: 50,
//   });

//   const handlePageChange = (page: number) => {
//     if (page !== currentPage) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 200, behavior: "smooth" });
//     }
//   };

//   return (
//     <>
//       <div
//         ref={ref}
//         className="w-full flex flex-row flex-wrap gap-5 album-hoatdongcongty-masonry"
//       >
//         {transitions(
//           (style: AnimatedProps<React.CSSProperties>, item: HoatDongCongTy) => {
//             const isVisible = visibleItems.has(item.id);
//             return (
//               <AnimatedDiv
//                 key={item.id}
//                 data-id={item.id}
//                 className="w-full sm:w-[48%] lg:w-[24%] flex-grow-0 flex-shrink-0"
//                 style={{
//                   ...style,
//                   opacity: isVisible ? style.opacity : 0,
//                   transition: "opacity 0.6s ease, transform 0.6s ease",
//                 }}
//               >
//                 <Link
//                   to={`/hoat-dong-cong-ty/detail/${item.id}`}
//                   state={{ hoatdongItem: item }}
//                 >
//                   <div className="group rounded-lg shadow-md hover:shadow-xl overflow-hidden relative transition w-full h-auto">
//                     {item.videourl ? (
//                       <div className="w-full h-auto">
//                         <VideoCard item={item} />
//                       </div>
//                     ) : item.image ? (
//                       <img
//                         src={`${SERVER}/${item.image}`}
//                         alt={t(`title_hoatdongcongty_${item.id}`) ?? item.title}
//                         className="w-full h-auto object-contain transition-all duration-300 group-hover:brightness-110"
//                         loading="lazy"
//                         style={{ imageRendering: "auto" }}
//                       />
//                     ) : (
//                       <div className="w-full h-auto bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">
//                         No Image
//                       </div>
//                     )}
//                   </div>
//                 </Link>
//               </AnimatedDiv>
//             );
//           },
//         )}
//       </div>

//       <CommonPagination
//         totalItems={totalItems}
//         itemsPerPage={itemsPerPage}
//         currentPage={currentPage}
//         onPageChange={handlePageChange}
//       />
//     </>
//   );
// }

// export default AlbumHoatdongcongtyMansonryCommon;