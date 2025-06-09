import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";

interface CarouselSlide {
  id: string | number;
  content: React.ReactNode; // Can be an image, text, or a more complex component
  altText?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
}) => {
  console.log("Rendering Carousel with", slides.length, "slides.");
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  if (!slides || slides.length === 0) {
    return <p>No slides to display.</p>;
  }

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
            <Card className="m-1 md:m-2 shadow-none border-0"> {/* Adjusted for tighter fit often seen in promo carousels */}
              <CardContent className="flex aspect-[2/1] sm:aspect-[3/1] items-center justify-center p-0">
                {/* Assuming slide.content is an image or promotial banner component */}
                {typeof slide.content === 'string' ? (
                  <img src={slide.content} alt={slide.altText || `Slide ${slide.id}`} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  slide.content
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* Optional: Add navigation dots or arrows here */}
    </div>
  );
};

export default Carousel;