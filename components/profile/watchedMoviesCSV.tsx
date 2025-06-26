// Exemple d'appel API depuis un composant client
async function downloadCSV(userId: string, type: string) {
  const response = await fetch(
    `/api/profile/${type}/movies/csv?userId=${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to generate CSV");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `films${type}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Exemple d'utilisation dans un composant React
export default function CSVDownload({
  userId,
  type,
}: {
  userId: string;
  type: string;
}) {
  const handleDownload = async () => {
    try {
      await downloadCSV(userId, type);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="flex items-center  bg-red-700 hover:bg-red-800 text-white cursor-pointer py-2 px-4 rounded-lg transition-colors"
      onClick={handleDownload}
    >
      Télécharger la liste des films
    </button>
  );
}
