'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    const params = useParams<{ companyId: string }>()
    const companyId = params.companyId
  return (
    <div>keyword: {companyId}</div>
  )
}
