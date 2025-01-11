'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    const params = useParams<{ genreId: string }>()
    const genreId = params.genreId
  return (
    <div>keyword: {genreId}</div>
  )
}
