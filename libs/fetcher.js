export const fetcher = async (url) => fetch(url).then(async res => await res.json())