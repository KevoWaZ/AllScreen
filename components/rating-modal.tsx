"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { FaStar, FaStarHalf, FaRegStar, FaCheck } from "react-icons/fa";
import { Review } from "@/types/types";
import * as Label from "@radix-ui/react-label";
import Form from "next/form";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose, IoStar } from "react-icons/io5";

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
  const [comment, setComment] = useState<string>(review?.comment ?? "");

  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  console.log(review);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setRating(review?.rating ?? 0);
      setComment(review?.comment ?? "");
      setHoveredRating(null);
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen, review?.rating, review?.comment]);

  const sendRating = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    try {
      console.log("Sending rating:", { rating, comment, type, userId, id });
      let realComment = comment;
      if (comment === "") {
        realComment = " ";
      }

      const res = await fetch("/api/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment: realComment,
          type: type,
          userId: userId,
          id: id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setIsSubmitted(true);
      onClose();
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
  };

  const displayRating = hoveredRating !== null ? hoveredRating : rating;

  const Star = ({ value }: { value: number }) => {
    let filled = 0;
    if (displayRating >= value) {
      filled = 1;
    } else if (displayRating >= value - 0.5) {
      filled = 0.5;
    }

    return (
      <span
        onClick={(e) => handleClick(e, value)}
        onMouseMove={(e) => handleMouseMove(e, value)}
        onMouseEnter={() => setHoveredRating(value)}
        onMouseLeave={() => setHoveredRating(null)}
        className="cursor-pointer text-3xl px-1.5"
      >
        {filled === 1 ? (
          <FaStar className=" text-[#D32F2F]" />
        ) : filled === 0.5 ? (
          <FaStarHalf className=" text-[#D32F2F]" />
        ) : (
          <FaRegStar className=" text-[#D32F2F]" />
        )}
      </span>
    );
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-[#121212] rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl z-50 border  border-[#2C2C2C]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b  border-[#2C2C2C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D32F2F]/10 rounded-full flex items-center justify-center">
                <IoStar className="text-[#D32F2F]" size={20} />
              </div>
              <div>
                <Dialog.Title className="text-lg font-bold  text-white">
                  {title}
                </Dialog.Title>
              </div>
            </div>
            <Dialog.Close className="w-8 h-8 rounded-full  hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
              <IoClose className=" text-[#BDBDBD]" size={18} />
            </Dialog.Close>
          </div>
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <Form action={sendRating}>
              <div className="space-y-3">
                <div className="mb-8 flex justify-center items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star key={value} value={value} />
                    ))}
                  </div>
                  <span className="ml-4  text-[#BDBDBD] font-medium text-xl">
                    {displayRating > 0 ? displayRating.toFixed(1) : "0.0"}
                  </span>
                </div>
                <Label.Root className="text-white/40" htmlFor="thougth">
                  Vous en pensez quoi? (optionnel):
                </Label.Root>
              </div>
              <textarea
                name="thougth"
                id="thougth"
                cols={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isSubmitted}
                className="w-full p-3 mb-4 border border-[#2C2C2C]  rounded-md  bg-[#1b1b1b]  text-white focus:outline-hidden focus:ring-2 focus:ring-[#D32F2F] focus:border-[#D32F2F] transition-colors duration-200 font-inter disabled:opacity-70"
                rows={3}
                placeholder="Vous en pensez quoi?"
              />
              <button
                disabled={rating === 0 || isSubmitting || isSubmitted}
                className={`cursor-pointer ${
                  rating === 0 || isSubmitting || isSubmitted
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } flex-1 px-4 py-3 bg-[#FF5722] hover:bg-[#E64A19] disabled:bg-[#212121]/20 disabled:text-[#212121]/40 text-white font-bold rounded-xl transition-colors`}
              >
                valider
              </button>
            </Form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
