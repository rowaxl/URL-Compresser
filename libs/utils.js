const URL_REGEX = /^(?:http|https?:\/\/)?([\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)$/

export const validateURL = (input) => 
  input.match(URL_REGEX) ? true : false

export const trimProtocol = (input) =>
  input.match(URL_REGEX) ? input.match(URL_REGEX)[1] : undefined