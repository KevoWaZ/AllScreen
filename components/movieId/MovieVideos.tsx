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
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <FaYoutube className="text-red-600 mr-2" />
        Vidéos associées
      </h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {videos.map((video) => (
            <div key={video.id} className="flex-none w-80">
              <YouTubeEmbed
                videoid={video.key}
                height={180}
                width={320}
                params="controls=1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

