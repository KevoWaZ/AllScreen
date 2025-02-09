"use client"

import { useCallback, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

interface CarouselProps {
  images: {
    file_path: string
    width: number
    height: number
  }[]
}

export default function Carousel({ images }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  emblaApi?.on("select", onSelect)

  const openImage = (imagePath: string) => {
    setSelectedImage(imagePath)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={image.file_path} className="flex-[0_0_100%] min-w-0 relative">
              <div className="h-96 flex items-center justify-center m-4 rounded-lg">
                <Image
                  width={300}
                  height={450}
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`Image ${index + 1}`}
                  className="max-h-full w-auto object-contain rounded-lg cursor-pointer transition-transform hover:scale-105"
                  onClick={() => openImage(image.file_path)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-500 dark:bg-red-700 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
        onClick={scrollPrev}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-500 dark:bg-red-700 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
        onClick={scrollNext}
      >
        <FaChevronRight />
      </button>
      <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
        {currentIndex + 1} / {images.length}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeImage}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w1280${selectedImage}`}
                alt="Image en grand"
                layout="fill"
                objectFit="contain"
              />
              <button
                className="absolute top-4 right-4 bg-red-500 dark:bg-red-700 text-white p-2 rounded-full"
                onClick={closeImage}
              >
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

