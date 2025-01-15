export function formatDate(dateString: string): string {
  if (!dateString) return "Date inconnue";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
}
