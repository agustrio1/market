import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselImg = () => {
  const carouselImg = [
    { src: '../slide-img/slide-1.jpg', alt: 'Image 1' },
    { src: '../slide-img/slide-2.jpg', alt: 'Image 2' },
    { src: '../slide-img/slide-3.jpg', alt: 'Image 3' },
  ];

  return (
    <div className="relative z-0 mb-8">
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        className="bg-white shadow-sm w-full sm:w-2/3 md:w-1/2 lg:w-2/3 mx-auto my-4"
      >
        {carouselImg.map((image, index) => (
          <div key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselImg;
