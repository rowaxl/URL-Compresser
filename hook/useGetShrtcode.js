import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '../libs/fetcher'
import { trimProtocol } from "../libs/utils"

const BASE_URL = process.env['NEXT_PUBLIC_API_URL']

export const useGetShrtcode = (input) => {
  const [result, setResult] = useState()
  const [error, setError] = useState()
  const trimmedURL = trimProtocol(input)

  const { data, error: apiError } = useSWR(
    trimmedURL
      ? `${BASE_URL}?url=${trimmedURL}`
      : null,
    fetcher)

  useEffect(() => {
    if (data) {
      setResult(data.result)
      setError(data.error)
    }
  }, [data])

  useEffect(() => {
    if (apiError)
      setError(apiError)
  }, [apiError])

  return {
    result,
    error,
  }
}