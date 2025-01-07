import { CertificationList } from "@/components/CertificationList";


async function getCertifications() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTcwMTY5NDc5OS4xMzkwMDAyLCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ID_mChD2JQk2Pofyjj8QLLAIiALRoTXynPhhG07DeKc'
    }
  };

  const response = await fetch('https://api.themoviedb.org/3/certification/tv/list', options)
  const data = await response.json()
  return data.certifications
}

export default async function MovieCertificationsPage() {
  const certifications = await getCertifications()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#F5A623]">Certifications de Films par Pays</h1>
      <CertificationList certifications={certifications} />
    </div>
  )
}

