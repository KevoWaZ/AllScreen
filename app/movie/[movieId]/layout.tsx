import { obtainMovieLayout } from '@/utils/movie'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { movieId: string }
  children: React.ReactNode
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const movieId = params.movieId
  
  const movieData = await obtainMovieLayout(movieId)

  return {
    title: `AllScreen - ${movieData?.title}` || 'Film',
    description: movieData?.overview || 'Détails du film',
    openGraph: {
      images: movieData?.poster_path ? [`https://image.tmdb.org/t/p/w500${movieData.poster_path}`] : [],
    },
  }
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {children}
    </div>
  )
}

