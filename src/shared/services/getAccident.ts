export const getAccident = async (
  sido: string,
  gugun: string
) => {
  const response = await fetch(
    `/api/walking-route/accident?siDo=${encodeURIComponent(sido)}=&guGun=${encodeURIComponent(gugun)}`
  )

  return response.json()
}