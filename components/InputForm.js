import { useState } from "react"
import { validateURL } from "../libs/utils"

const InputForm = ({ url, onSubmit }) => {
  const [isValid, setIsValid] = useState(true)
  const [input, setInput] = useState('')

  const handleOnChange = (e) => {
    const text = e.target.value

    const isValidURL = validateURL(text)
    
    setIsValid(isValidURL)

    isValidURL && setInput(text)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (!input) return setIsValid(false)

    onSubmit(input)
  }

  return (
    <div className="w-full flex flex-col">
      <form className="w-full flex flex-row">
        <input
          type="text"
          className={
            isValid
              ? "mt-0 w-full block px-0.5 border-0 border-b-2 border-gray-200 dark:border-gray-700 bg-transparent transition-colors duration-200 focus:ring-0 focus:border-black dark:focus:border-gray-200 w-full"
              : "mt-0 w-full block px-0.5 border-0 border-b-2 border-red-200 dark:border-red-700 bg-transparent transition-colors duration-200 focus:ring-0 focus:border-red dark:focus:border-red-200 w-full"
          }
          placeholder="Enter the LONG LONG URL here"
          onChange={handleOnChange}
          defaultValue={url}
        />

        <button
          className={
            isValid
              ? "h-12 mx-2 px-4 py-2 border-2 bg-blue-500 border-blue-500 dark:border-blue-300 font-bold text-white rounded"
              : "h-12 mx-2 px-4 py-2 border-2 bg-red-500 border-red-500 dark:border-red-300 font-bold text-white rounded"
          }
          disabled={!isValid}
          onClick={handleOnSubmit}
        >
          Compress
        </button>
      </form>

      {
        !isValid &&
        <>
          <p className="text-red-500 text-xs italic">
            The input field is empty or invalid.
          </p>
        </>
      }
    </div>
  )
}

export default InputForm
