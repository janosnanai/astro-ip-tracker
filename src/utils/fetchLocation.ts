export default async function fetchLocation(
  searchInput: string
): Promise<IpGeoResponseData> {
  const response = await fetch(`/api/${searchInput}`);
  if (!response.ok) {
    throw new Error(response.statusText || "Unknown error");
  }
  return response.json();
}
