'use client'

import { YouTubeEmbed } from '@next/third-parties/google'
import { FaYoutube } from 'react-icons/fa'

export interface Video {
  id: string
  name: string
  key: string
  published_at: string
}

interface YouTubeVideosProps {
  videos: Video[]
}

export default function MovieVideos({ videos }: YouTubeVideosProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <FaYoutube className="text-red-600 mr-2" />
        Vidéos associées
      </h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-6 w-max">
          {videos.map((video) => (
            <div key={video.id} className="flex-none w-[640px]">
              <YouTubeEmbed
                videoid={video.key}
                height={360}
                width={640}
                params="controls=1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

