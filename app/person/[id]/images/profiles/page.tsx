"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { obtainPersonImages } from "@/utils/person";
import Link from "@/components/utils/Link";
import Loading from "@/app/loading";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";

interface Image {
  file_path: string;
  height: number;
  width: number;
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Image[]>();

  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await obtainPersonImages(params.id);

        if (data) {
          setImages(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (loading) {
    <Loading />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-[90vw] md:max-w-[70vw] mx-auto"
    >
      <Link
        href={`/person/${params.id}`}
        className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Retour a la personne
      </Link>
      <h3 className="text-2xl font-bold mb-4">Photos de profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images &&
          images.map((images) => (
            <Link
              key={images.file_path}
              href={`https://image.tmdb.org/t/p/original${images.file_path}`}
              target="_blank"
              aria-label="Voir l'image en grand"
            >
              <Image
                src={
                  images?.file_path
                    ? `https://image.tmdb.org/t/p/w500${images.file_path}`
                    : "/placeholder.svg"
                }
                alt={images?.file_path || "Nom inconnu"}
                width={500}
                height={750}
                quality={100}
                className="rounded-lg shadow-md"
                priority
              />
            </Link>
          ))}
      </div>
    </motion.main>
  );
}
