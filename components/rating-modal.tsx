"use client";
import type React from "react";
import { useState, useEffect } from "react";
import {
  FaStar,
  FaStarHalf,
  FaRegStar,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Review } from "@/types/types";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  type: "MOVIE" | "TVSHOW";
  title: string;
  userId: string;
  review?: Review;
}

export default function RatingModal({
  isOpen,
  onClose,
  id,
  type,
  title,
  userId,
  review,
}: RatingModalProps) {
  const [rating, setRating] = useState<number>(review?.rating ?? 0);
  let [comment, setComment] = useState<string>(review?.comment ?? "");
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [animatedStars, setAnimatedStars] = useState<number[]>([]);
  console.log(review);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setRating(review?.rating ?? 0);
      setComment(review?.comment ?? "");
      setHoveredRating(null);
      setIsSubmitted(false);
      setIsSubmitting(false);
      setAnimatedStars([]);
    }
  }, [isOpen]);

  const sendRating = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    try {
      console.log("Sending rating:", { rating, comment, type, userId, id });

      if (comment === "") {
        comment = " ";
      }

      const res = await fetch("/api/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
          type: type,
          userId: userId,
          id: id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLSpanElement>,
    value: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const offsetX = e.clientX - rect.left;

    if (offsetX < width / 2) {
      setHoveredRating(value - 0.5);
    } else {
      setHoveredRating(value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>, value: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const offsetX = e.clientX - rect.left;
    const newRating = offsetX < width / 2 ? value - 0.5 : value;

    setRating(newRating);

    // Animate stars up to the selected rating
    const starsToAnimate = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.ceil(newRating)) {
        starsToAnimate.push(i);
      }
    }
    setAnimatedStars(starsToAnimate);

    // Reset animation after a delay
    setTimeout(() => {
      setAnimatedStars([]);
    }, 700);
  };

  const displayRating = hoveredRating !== null ? hoveredRating : rating;

  const Star = ({ value }: { value: number }) => {
    let filled = 0;
    if (displayRating >= value) {
      filled = 1;
    } else if (displayRating >= value - 0.5) {
      filled = 0.5;
    }

    const isAnimated = animatedStars.includes(value);

    return (
      <motion.span
        onClick={(e) => handleClick(e, value)}
        onMouseMove={(e) => handleMouseMove(e, value)}
        onMouseEnter={() => setHoveredRating(value)}
        onMouseLeave={() => setHoveredRating(null)}
        className="cursor-pointer text-3xl px-1.5"
        animate={
          isAnimated
            ? {
                scale: [1, 1.5, 1],
                rotate: [0, 15, -15, 0],
                y: [0, -10, 0],
              }
            : {}
        }
        transition={{ duration: 0.5 }}
      >
        {filled === 1 ? (
          <FaStar className="text-[#D32F2F] dark:text-[#D32F2F]" />
        ) : filled === 0.5 ? (
          <FaStarHalf className="text-[#D32F2F] dark:text-[#D32F2F]" />
        ) : (
          <FaRegStar className="text-[#D32F2F] dark:text-[#D32F2F]" />
        )}
      </motion.span>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-50"
            style={{ backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="fixed -translate-x-1/2 -translate-y-1/2 max-w-md w-[90%] bg-white dark:bg-[#121212] rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#212121] dark:text-[#BDBDBD] hover:text-[#D32F2F] dark:hover:text-[#D32F2F] transition-colors"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="p-6">
              <motion.h2
                className="text-2xl font-bold text-center text-[#D32F2F] dark:text-[#D32F2F] mb-8 font-inter"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {title}
              </motion.h2>

              <motion.div
                className="mb-8 flex justify-center items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star key={value} value={value} />
                  ))}
                </div>
                <motion.span
                  className="ml-4 text-[#212121] dark:text-[#BDBDBD] font-medium text-xl"
                  animate={{
                    scale:
                      displayRating > 0 && hoveredRating !== null
                        ? [1, 1.2, 1]
                        : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {displayRating > 0 ? displayRating.toFixed(1) : "0.0"}
                </motion.span>
              </motion.div>

              <motion.div
                className="mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-[#212121] dark:text-[#BDBDBD] mb-2 font-inter">
                  Your thoughts (optional):
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={isSubmitted}
                  className="w-full p-3 border border-[#BDBDBD] dark:border-[#4A4A4A] rounded-md bg-white dark:bg-[#2C2C2C] text-[#212121] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-[#D32F2F] transition-colors duration-200 font-inter disabled:opacity-70"
                  rows={3}
                  placeholder="Share your thoughts about this movie..."
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={sendRating}
                  disabled={rating === 0 || isSubmitting || isSubmitted}
                  className={`w-full py-3 px-4 rounded-md text-white font-medium font-inter flex items-center justify-center transition-all duration-300 ${
                    isSubmitted
                      ? "bg-[#4CAF50] dark:bg-[#4CAF50]"
                      : "bg-[#FF5722] dark:bg-[#FF5722] hover:bg-[#E64A19] dark:hover:bg-[#E64A19]"
                  } ${rating === 0 ? "opacity-60 cursor-not-allowed" : ""}`}
                  whileHover={!isSubmitted && rating > 0 ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitted && rating > 0 ? { scale: 0.98 } : {}}
                  animate={
                    isSubmitted
                      ? {
                          backgroundColor: "#4CAF50",
                          transition: { duration: 0.3 },
                        }
                      : {}
                  }
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      />
                    ) : isSubmitted ? (
                      <motion.div
                        key="submitted"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        className="flex items-center"
                      >
                        <FaCheck className="mr-2" /> Thank You!
                      </motion.div>
                    ) : (
                      <motion.span
                        key="submit"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Submit Rating
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
