import React, { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="bg-gray-800 text-white p-2 rounded-full cursor-pointer"
        >
          <BsFillArrowUpCircleFill />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
