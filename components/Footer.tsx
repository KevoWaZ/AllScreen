
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2025 AllScreen. Tous droits réservés.</p>
        <nav>
          <ul className="flex space-x-4">
            <li><h3 className="hover:text-orange-500">Mentions légales</h3></li>
            <li><h3 className="hover:text-orange-500">Politique de confidentialité</h3></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

