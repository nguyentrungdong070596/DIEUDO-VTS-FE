import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useTransition, animated, AnimatedProps } from "@react-spring/web";
import { HoatDongCongTy } from "../interface/InterfaceCommon";
import Apis, { endpoints, SERVER } from "../configs/Apis";
import { Link } from "react-router-dom";
import CommonPagination from "./CommonPagination";
import VideoCard from "./VideoCard";
import { useTranslation } from "react-i18next";
import "../static/css/hoatdongcongty.scss";

type AnimatedDivProps = AnimatedProps<React.HTMLAttributes<HTMLDivElement>>;
const AnimatedDiv = animated.div as React.FC<AnimatedDivProps>;

function AlbumHoatdongcongtyMansonryCommon() {
  const [columns, setColumns] = useState<number>(2);
  const [width, setWidth] = useState<number>(0);
  const [data, setData] = useState<HoatDongCongTy[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t, i18n } = useTranslation();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 16;
  const [totalItems, setTotalItems] = useState(0);
  const loadingRef = useRef(false);

  const loadHoatdongcongty = useCallback(async (page: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      const params = {
        limit: itemsPerPage,
        page,
        itemType: "8",
        showHiddenItem: true,
      };
      const response = await Apis.get(endpoints.APIItems, { params });
      const items: HoatDongCongTy[] = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];
      const total = response?.data?.totalRecords || items.length;

      // Set fixed height for all items
      const fixedHeight = 300; // Adjust as needed
      const dataWithHeight = items.map((item) => ({
        ...item,
        height: fixedHeight,
      }));

      for (const item of response.data.data) {
        i18n.addResource(
          "vi",
          "translation",
          `title_hoatdongcongty_${item.id}`,
          item.title,
        );
        i18n.addResource(
          "en",
          "translation",
          `title_hoatdongcongty_${item.id}`,
          item.title_en,
        );
        i18n.addResource(
          "vi",
          "translation",
          `subtitle_hoatdongcongty_${item.id}`,
          item.subtitle,
        );
        i18n.addResource(
          "en",
          "translation",
          `subtitle_hoatdongcongty_${item.id}`,
          item.subtitle_en,
        );
        i18n.addResource(
          "vi",
          "translation",
          `content_hoatdongcongty_${item.id}`,
          item.content,
        );
        i18n.addResource(
          "en",
          "translation",
          `content_hoatdongcongty_${item.id}`,
          item.content_en,
        );
      }
      setData(dataWithHeight);
      setTotalItems(total);
    } catch (err) {
      console.error("Lỗi load:", err);
      setData([]);
      setTotalItems(0);
    } finally {
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadHoatdongcongty(currentPage);
  }, [currentPage, loadHoatdongcongty]);

  useEffect(() => {
    setVisibleItems(new Set());
  }, [data]);

  const randomTransforms = useMemo(() => {
    const transforms: Record<number, string> = {};
    data.forEach((item) => {
      const translateX = Math.random() * 20 - 10;
      const translateY = Math.random() * 20 - 10;
      const rotate = Math.random() * 6 - 3;
      const scale = 0.95 + Math.random() * 0.05;
      transforms[
        item.id
      ] = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
    });
    return transforms;
  }, [data]);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1500) setColumns(4);
      else if (window.innerWidth >= 1000) setColumns(4);
      else if (window.innerWidth >= 600) setColumns(3);
      else setColumns(1);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gap = 16;
  const fixedHeight = 300; // Same fixed height as set in data

  const [heights, gridItems] = useMemo(() => {
    const heights = new Array(columns).fill(0);
    const items = data.map((item, index) => {
      const column = heights.indexOf(Math.min(...heights));
      const x =
        ((width - (columns - 1) * gap) / columns) * column + gap * column;
      const y = heights[column];
      heights[column] += fixedHeight + gap;
      return {
        ...item,
        x,
        y,
        width: (width - (columns - 1) * gap) / columns,
        height: fixedHeight,
      };
    });
    return [heights, items];
  }, [columns, data, width]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const updated = new Set(prev);
          entries.forEach((entry) => {
            const id = Number(entry.target.getAttribute("data-id"));
            if (!isNaN(id)) {
              if (entry.isIntersecting) updated.add(id);
              else updated.delete(id);
            }
          });
          return updated;
        });
      },
      { threshold: 0.1 },
    );

    observerRef.current = observer;
    const targets = ref.current.querySelectorAll("[data-id]");
    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, [gridItems]);

  const transitions = useTransition(gridItems, {
    keys: (item) => item.id,
    from: (item) => ({
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height,
      opacity: 0,
      transform:
        randomTransforms[item.id] ||
        "translate(0px, 0px) scale(1) rotate(0deg)",
    }),
    enter: (item) => ({
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height,
      opacity: 1,
      transform: "translate(0px, 0px) scale(1) rotate(0deg)",
    }),
    update: (item) => ({
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height,
    }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 1.5, tension: 300, friction: 35 },
    trail: 5,
  });

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        ref={ref}
        className="h-full w-full relative"
        style={{ height: Math.max(...heights, 0) }}
      >
        {transitions((style: any, item) => {
          const isVisible = visibleItems.has(item.id);
          return (
            <AnimatedDiv
              key={item.id}
              data-id={item.id}
              className="[will-change:transform,width,height,opacity] absolute"
              style={{
                ...style,
                opacity: isVisible ? style.opacity : 0,
                transform: isVisible
                  ? style.transform
                  : randomTransforms[item.id],
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <Link
                to={`/hoat-dong-cong-ty/detail/${item.id}`}
                state={{ hoatdongItem: item }}
              >
                <div
                  className="h-full rounded-xl shadow-md w-full duration-300 hover:scale-105 overflow-hidden relative transition group"
                  style={{ marginBottom: `${gap}px`, aspectRatio: "1 / 1" }} // Square aspect ratio
                >
                  {item.videourl ? (
                    <div className="w-full h-full">
                      <VideoCard item={item} />
                    </div>
                  ) : item.image ? (
                    <img
                      src={`${SERVER}/${item.image}`}
                      alt={t(`title_hoatdongcongty_${item.id}`) ?? item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      style={{ imageRendering: "auto" }} // Optimize rendering
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
              </Link>
            </AnimatedDiv>
          );
        })}
      </div>

      <CommonPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default AlbumHoatdongcongtyMansonryCommon;
