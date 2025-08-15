import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { Link } from "react-router"; // keep as you have it

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={6000}
        transitionTime={800}
        swipeable
        emulateTouch
        onChange={(index) => setActiveIndex(index)}
      >
        {/* ===== Slide 1 ===== */}
        <div
          className="h-[75vh] md:h-[80vh] bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2018/05/14/13/57/family-3400033_1280.jpg')",
          }}
        >
          {/* Dark-left → light-right gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#205AA0]/95 via-[#205AA0]/40 to-transparent"></div>

          {activeIndex === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-20 text-white"
            >
              {/* Subtitle with left border */}
              <h3 className="font-semibold text-base md:text-lg border-l-4 border-white pl-3 mb-3">
                LIVE YOUR DREAM  _____
              </h3>

              {/* Hardcoded two-line heading with perfect left alignment */}
              <h2 className="text-3xl md:text-6xl font-extrabold leading-tight text-left mb-4">
                <span className="block">RELIABLE AMBITION</span>
                <span className="block">FOR ANY PURPOSE</span>
              </h2>

              <p className="text-base md:text-xl mb-6 text-left max-w-xl">
                For nearly 50 years, we&apos;ve prepared you for what&apos;s next — it&apos;s our
                ambition to help you live yours.
              </p>

              <Link to="/allPolicies">
                <button className="px-4 py-2 text-primary bg-secondary rounded hover:bg-transparent hover:border hover:border-secondary hover:text-secondary">
                  Get a Free Quote
                </button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* ===== Slide 2 ===== */}
        <div
          className="h-[75vh] md:h-[80vh] bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/9k6nTcPK/slider-Img3.jpg')", // fixed domain (i.ibb.co)
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#205AA0]/95 via-[#205AA0]/40 to-transparent"></div>

          {activeIndex === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-20 text-white"
            >
              <h3 className="font-semibold text-base md:text-lg border-l-4 border-white pl-3 mb-3">
                LIVE YOUR DREAM  _____
              </h3>

              <h2 className="text-3xl md:text-6xl font-extrabold leading-tight text-left mb-4">
                <span className="block">INSURANCE FOR ANY</span>
                <span className="block">PURPOSE RELIABLE</span>
              </h2>

              <p className="text-base md:text-xl mb-6 max-w-xl text-left">
                For nearly 50 years, we&apos;ve prepared you for what&apos;s next — it&apos;s our
                ambition to help you live yours.
              </p>

              <Link to="/allPolicies">
                <button className="px-4 py-2 text-primary bg-secondary rounded hover:bg-transparent hover:border hover:border-secondary hover:text-secondary">
                  Get a Free Quote
                </button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* ===== Slide 3 ===== */}
        <div
          className="h-[75vh] md:h-[80vh] bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/rK3VFDqw/slider-Img1.jpg')", // fixed domain (i.ibb.co)
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#205AA0]/95 via-[#205AA0]/40 to-transparent"></div>

          {activeIndex === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-20 text-white"
            >
              <h3 className="font-semibold text-base md:text-lg border-l-4 border-white pl-3 mb-3">
                LIVE YOUR DREAM  _____
              </h3>

              <h2 className="text-3xl md:text-6xl font-extrabold leading-tight text-left mb-4">
                <span className="block">AMBITION INSURANCE</span>
                <span className="block">FOR ANY PURPOSE</span>
              </h2>

              <p className="text-base md:text-xl mb-6 max-w-xl text-left">
                For nearly 50 years, we&apos;ve prepared you for what&apos;s next — it&apos;s our
                ambition to help you live yours.
              </p>

              <Link to="/allPolicies">
                <button className="px-4 py-2 text-primary bg-secondary rounded hover:bg-transparent hover:border hover:border-secondary hover:text-secondary">
                  Get a Free Quote
                </button>
              </Link>
            </motion.div>
          )}
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
