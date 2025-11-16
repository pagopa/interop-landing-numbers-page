export async function fetcher<T = unknown>(url: string) {
  const response = await fetch(url)
  const data: T = await response.json()
  return data
}
