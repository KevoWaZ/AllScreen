'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    const params = useParams<{ keywordId: string }>()
    const keywordId = params.keywordId
  return (
    <div>keyword: {keywordId}</div>
  )
}
