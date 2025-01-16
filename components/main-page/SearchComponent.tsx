"use client";
import Form from "next/form";
import { FiSearch } from "react-icons/fi";

export default function SearchComponent() {
  return (
    <div className="hidden md:flex md:flex-1 md:justify-center">
      <div className="relative w-full max-w-xl">
        <Form action={"/search"}>
          <input
            type="search"
            name="search"
            placeholder="Search movies, TV shows..."
            className={`w-full py-2 px-4 rounded-full dark:bg-gray-800 dark:text-white bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600`}
          />
          <button type="submit">
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </button>
        </Form>
      </div>
    </div>
  );
}
