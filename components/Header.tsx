import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-semibold text-orange-500 hover:text-orange-400">
        AllScreen
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/films" className="hover:text-orange-500">Films</Link></li>
          <li><Link href="/series" className="hover:text-orange-500">Séries</Link></li>
          <li><Link href="/acteurs" className="hover:text-orange-500">Acteurs</Link></li>
        </ul>
      </nav>
    </header>
  )
}

