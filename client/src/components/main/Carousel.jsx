import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselImg = () => {
  const carouselImg = [
    { src: '../slide-img/slide-1.png', alt: 'Image 1' },
    { src: '../slide-img/slide-2.png', alt: 'Image 2' },
    { src: '../slide-img/slide-3.png', alt: 'Image 3' },
    { src: '../slide-img/slide-4.png', alt: 'Image 4' },
  ];

  return (
    <div className="relative z-0 mb-16">
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        className="bg-white shadow-sm w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto my-4"
      >
        {carouselImg.map((image, index) => (
          <div key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-25 h-80"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselImg;
