"use client";

export default function ProfileHeaderSkeleton() {
  return (
    <>
      <div className="bg-[#2C2C2C] rounded-lg p-6 mb-6 animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture Skeleton */}
          <div className="relative group cursor-pointer">
            <div className="inline-flex h-24 w-24 md:h-32 md:w-32 select-none items-center justify-center overflow-hidden rounded-full bg-[#4A4A4A]">
              <div className="h-full w-full bg-[#1E1E1E] rounded-full"></div>
            </div>
          </div>
          {/* User Info Skeleton */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="w-full">
                <div className="h-8 md:h-10 bg-[#1E1E1E] rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-[#1E1E1E] rounded mb-2 w-full"></div>
                <div className="h-4 bg-[#1E1E1E] rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-[#1E1E1E] rounded w-4/6"></div>
              </div>
              {/* Stats Skeleton */}
              <div className="flex gap-6 md:gap-8">
                <div className="text-center">
                  <div className="h-6 md:h-8 bg-[#1E1E1E] rounded mb-2 w-12 mx-auto"></div>
                  <div className="h-4 bg-[#1E1E1E] rounded w-16 mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="h-6 md:h-8 bg-[#1E1E1E] rounded mb-2 w-12 mx-auto"></div>
                  <div className="h-4 bg-[#1E1E1E] rounded w-16 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Skeleton */}
      <div className="flex gap-4 mb-6">
        <div className="h-10 bg-[#1E1E1E] rounded w-24"></div>
        <div className="h-10 bg-[#1E1E1E] rounded w-24"></div>
        <div className="h-10 bg-[#1E1E1E] rounded w-24"></div>
      </div>
    </>
  );
}
