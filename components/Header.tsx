import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-semibold text-orange-500 hover:text-orange-400"
      >
        AllScreen
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <h3 className="hover:text-orange-500">Films</h3>
          </li>
          <li>
            <h3 className="hover:text-orange-500">Séries</h3>
          </li>
          <li>
            <h3 className="hover:text-orange-500">Acteurs</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}
