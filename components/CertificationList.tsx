'use client'

import { useState, useMemo } from 'react'
import { FiChevronDown } from 'react-icons/fi'

type Certification = {
  certification: string
  meaning: string
  order: number
}

type CertificationListProps = {
  certifications: {
    [country: string]: Certification[]
  }
}

export function CertificationList({ certifications }: CertificationListProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const sortedCountries = useMemo(() => {
    return Object.keys(certifications).sort((a, b) => a.localeCompare(b))
  }, [certifications])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 relative">
        <select
          className="appearance-none bg-gray-800 text-white border border-gray-600 rounded-lg p-3 w-full pr-10 focus:outline-none focus:border-orange-500"
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry || ''}
        >
          <option value="">Tous les pays</option>
          {sortedCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {(selectedCountry ? [selectedCountry] : sortedCountries).map((country) => (
        <div key={country} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#F5A623]">{country}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications[country].sort((a, b) => a.order - b.order).map((cert) => (
              <div key={cert.certification} className="bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-semibold mb-2 text-white">{cert.certification}</h3>
                <p className="text-sm text-gray-400">{cert.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

