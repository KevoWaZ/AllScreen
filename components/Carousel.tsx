"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps {
  images: {
    file_path: string;
    width: number;
    height: number;
  }[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const [modalEmblaRef, modalEmblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: 0,
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onModalSelect = useCallback(() => {
    if (!modalEmblaApi) return;
    setSelectedIndex(modalEmblaApi.selectedScrollSnap());
  }, [modalEmblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (modalEmblaApi) {
      modalEmblaApi.on("select", onModalSelect);
      return () => {
        modalEmblaApi.off("select", onModalSelect);
      };
    }
  }, [modalEmblaApi, onModalSelect]);

  const openImage = (index: number) => {
    setSelectedIndex(index);
    if (modalEmblaApi) {
      modalEmblaApi.scrollTo(index);
    }
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!modalEmblaApi) return;

    switch (e.key) {
      case "ArrowLeft":
        modalEmblaApi.scrollPrev();
        break;
      case "ArrowRight":
        modalEmblaApi.scrollNext();
        break;
      case "Escape":
        closeImage();
        break;
    }
  };

  const openOriginalImage = (imagePath: string) => {
    window.open(`https://image.tmdb.org/t/p/original${imagePath}`, "_blank");
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Carousel principal */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={image.file_path}
              className="flex-[0_0_100%] min-w-0 relative"
            >
              <div className="h-125 flex items-center justify-center p-4 rounded-lg">
                <Image
                  width={500}
                  height={750}
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`Image ${index + 1}`}
                  className="max-h-full w-auto object-contain rounded-lg cursor-pointer transition-transform hover:scale-105"
                  onClick={() => openImage(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer bg-red-700 text-white p-3 rounded-full opacity-75 hover:opacity-100 transition-opacity z-10"
        onClick={scrollPrev}
        aria-label="Previous image"
      >
        <FaChevronLeft size={20} aria-label="Previous image" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer bg-red-700 text-white p-3 rounded-full opacity-75 hover:opacity-100 transition-opacity z-10"
        onClick={scrollNext}
        aria-label="Next image"
      >
        <FaChevronRight size={20} aria-label="Next image" />
      </button>
      <div className="text-center mt-4 text-gray-300">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Modal avec EmblaCarousel */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-h-[90vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors cursor-pointer z-20"
                onClick={closeImage}
                aria-label="Close image"
              >
                <FaTimes size={24} />
              </button>

              <div className="overflow-hidden h-full" ref={modalEmblaRef}>
                <div className="flex h-full">
                  {images.map((image, index) => (
                    <div
                      key={image.file_path}
                      className="flex-[0_0_100%] min-w-0 h-full relative"
                    >
                      <div className="h-full flex items-center justify-center p-4">
                        <div className="relative h-[80vh] w-full">
                          <Image
                            src={`https://image.tmdb.org/t/p/w1280${image.file_path}`}
                            alt={`Image ${index + 1}`}
                            fill
                            className="object-contain rounded-lg"
                            priority
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openOriginalImage(image.file_path);
                            }}
                            className="absolute bottom-4 right-4 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
                          >
                            <FaExternalLinkAlt />
                            Voir l'original
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-3 rounded-full transition-colors cursor-pointer z-20"
                    onClick={() => modalEmblaApi?.scrollPrev()}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft size={24} />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-3 rounded-full transition-colors cursor-pointer z-20"
                    onClick={() => modalEmblaApi?.scrollNext()}
                    aria-label="Next image"
                  >
                    <FaChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-4 py-2 rounded-full text-sm z-20">
                {selectedIndex !== null ? selectedIndex + 1 : 0} /{" "}
                {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;
