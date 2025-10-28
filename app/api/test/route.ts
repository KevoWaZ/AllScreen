import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface PersonCount {
  id: number;
  name: string;
  profile_path: string | null;
  count: number;
}

export async function GET() {
  const userId = "kM1EeQFhbt2XFFkQxyZJOTwXVOFPpK07";
  const reviews = await prisma.review.findMany({
    where: {
      userId: userId,
    },
    include: {
      movie: {
        include: {
          directors: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          producers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          execProducers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          writers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          composers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          cinematographers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
        },
      },
    },
  });

  const directorCounts: Record<string, PersonCount> = {};
  const producerCounts: Record<string, PersonCount> = {};
  const execProducerCounts: Record<string, PersonCount> = {};
  const writerCounts: Record<string, PersonCount> = {};
  const composerCounts: Record<string, PersonCount> = {};
  const cinematographerCounts: Record<string, PersonCount> = {};

  reviews.forEach((review) => {
    if (review.movie) {
      // Directeurs
      review.movie.directors.forEach((director) => {
        if (director.id in directorCounts) {
          directorCounts[director.id].count++;
        } else {
          directorCounts[director.id] = {
            id: director.id,
            name: director.name,
            profile_path: director.profile_path,
            count: 1,
          };
        }
      });

      // Producteurs
      review.movie.producers.forEach((producer) => {
        if (producer.id in producerCounts) {
          producerCounts[producer.id].count++;
        } else {
          producerCounts[producer.id] = {
            id: producer.id,
            name: producer.name,
            profile_path: producer.profile_path,
            count: 1,
          };
        }
      });

      // Producteurs exécutifs
      review.movie.execProducers.forEach((execProducer) => {
        if (execProducer.id in execProducerCounts) {
          execProducerCounts[execProducer.id].count++;
        } else {
          execProducerCounts[execProducer.id] = {
            id: execProducer.id,
            name: execProducer.name,
            profile_path: execProducer.profile_path,
            count: 1,
          };
        }
      });

      // Scénaristes
      review.movie.writers.forEach((writer) => {
        if (writer.id in writerCounts) {
          writerCounts[writer.id].count++;
        } else {
          writerCounts[writer.id] = {
            id: writer.id,
            name: writer.name,
            profile_path: writer.profile_path,
            count: 1,
          };
        }
      });

      // Compositeurs
      review.movie.composers.forEach((composer) => {
        if (composer.id in composerCounts) {
          composerCounts[composer.id].count++;
        } else {
          composerCounts[composer.id] = {
            id: composer.id,
            name: composer.name,
            profile_path: composer.profile_path,
            count: 1,
          };
        }
      });

      // Directeurs de la photographie
      review.movie.cinematographers.forEach((cinematographer) => {
        if (cinematographer.id in cinematographerCounts) {
          cinematographerCounts[cinematographer.id].count++;
        } else {
          cinematographerCounts[cinematographer.id] = {
            id: cinematographer.id,
            name: cinematographer.name,
            profile_path: cinematographer.profile_path,
            count: 1,
          };
        }
      });
    }
  });

  // Convertir les objets en tableaux et trier par ordre décroissant de count
  const directorCountsArray = Object.values(directorCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const producerCountsArray = Object.values(producerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const execProducerCountsArray = Object.values(execProducerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const writerCountsArray = Object.values(writerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const composerCountsArray = Object.values(composerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const cinematographerCountsArray = Object.values(cinematographerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return NextResponse.json({
    topDirectors: directorCountsArray,
    topProducers: producerCountsArray,
    topExecProducers: execProducerCountsArray,
    topWriters: writerCountsArray,
    topComposers: composerCountsArray,
    topCinematographers: cinematographerCountsArray,
  });
}
