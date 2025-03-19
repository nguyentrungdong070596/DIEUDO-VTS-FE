import React, { useEffect, useState } from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa'; // Cần cài react-icons

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-[#0099e5] text-white p-3 w-10 h-10 flex items-center justify-center rounded-md  hover:bg-[#007acc] hover:shadow-md hover:scale-110 transition-all duration-300"
        title="Go to Top"
      >
        <FaAngleDoubleUp size={20} />
      </button>
    )
  );
};

export default GoToTopButton;
