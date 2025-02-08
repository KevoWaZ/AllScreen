"use client"

import { useCallback, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

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

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={image.file_path} className="flex-[0_0_100%] min-w-0 relative">
              <div className="h-64 flex items-center justify-center m-4 rounded-lg">
                <Image
                  width={300}
                  height={450}
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`Image ${index + 1}`}
                  className="max-h-full w-auto object-contain rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
        onClick={scrollPrev}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
        onClick={scrollNext}
      >
        <FaChevronRight />
      </button>
      <div className="text-center mt-4">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

