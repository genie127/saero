export const getCctv = async (
  keyword: string
) => {
  const response = await fetch(
    `/api/walking-route/cctv?keyword=${encodeURIComponent(keyword)}`
  )

  return response.json()
}