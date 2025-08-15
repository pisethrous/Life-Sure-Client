import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { Link } from "react-router"; 

const slides = [
  {
    image: "https://cdn.pixabay.com/photo/2018/05/14/13/57/family-3400033_1280.jpg",
    heading: (
      <>
        Protect Your <br /> Loved Ones 
      </>
    ),
    subText: "Affordable, trusted life insurance for a secure future.",
    buttonText: "Get a Free Quote",
  },
  {
    image: "https://cdn.pixabay.com/photo/2021/11/21/11/57/father-6813857_1280.jpg",
    heading: (
      <>
        Secure Your <br /> Family’s Future
      </>
    ),
    subText: "Get life insurance that fits your lifestyle and budget.",
    buttonText: "Get a Free Quote",
  },
  {
    image: "https://cdn.pixabay.com/photo/2020/09/15/23/09/home-5574909_1280.jpg",
    heading: (
      <>
        Peace of Mind <br /> Guaranteed
      </>
    ),
    subText: "Let us help you plan today for a safer tomorrow.",
    buttonText: "Get a Free Quote",
  },
];

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
        
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-[75vh] md:h-[80vh] bg-cover bg-center relative"
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-black/70"></div>

            {activeIndex === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-20 text-white"
              >
                <h2 className="text-3xl md:text-7xl font-bold mb-4">
                  {slide.heading}
                </h2>
                <p className="text-base md:text-xl mb-6 max-w-xl">
                  {slide.subText}
                </p>
                <Link to="/allPolicies">
                  <button className="btn btn-secondary w-80 text-white">
                    {slide.buttonText}
                  </button>
                </Link>
              </motion.div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
