import { useState, useEffect } from 'react'
import { useGetShrtcode } from '../hook/useGetShrtcode'
import { ToastContainer, toast } from 'react-toastify'
import Card from '../components/Card'
import Background from '../components/Background'
import InputForm from '../components/InputForm'
import LinkButton from '../components/LinkButton'

export default function Home() {
  const [URL, setURL] = useState('')

  const { result, error } = useGetShrtcode(URL)

  useEffect(() => {
    if (localStorage) {
      const lastCompressedItem = localStorage.getItem('lastURL')

      lastCompressedItem && setURL(lastCompressedItem)
    }
  }, [])

  useEffect(() => {
    if (result && localStorage) {
      localStorage.setItem('lastURL', URL)
    }
  }, [result])


  const handleOnSubmit = (input) => {
    setURL(input)
  }

  const handleClickLink = (url) => {
    if (!navigator) return toast.error('Failed to copy link!')

    navigator.clipboard.writeText(url).then(() => {
      toast.info('Link copied successfully!')
    }).catch(() => {
      toast.error('Failed to copy link!')
    })
  }

  return (
    <div className="px-12 py-6 flex flex-col justify-center h-full">
      <Background />

      <Card className="radius-md flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <InputForm url={URL} onSubmit={handleOnSubmit} />
          </div>
          {
            !!result && (
              <Card className="mt-10 flex flex-col justify-between h-full">
                <div className="px-6 py-4 flex flex-col items-start">
                  <div className="font-bold text-xl mb-4">
                    Compressed URLs
                  </div>

                  <LinkButton url={result.full_short_link} onClickLink={handleClickLink} />
                  <LinkButton url={result.full_short_link2} onClickLink={handleClickLink} />
                  <LinkButton url={result.full_short_link3} onClickLink={handleClickLink} />
                </div>
              </Card>
            )
          }

          {
            !!error &&
              <p className="mt-6 text-red-500 text-md italic">
                Error: { error }
              </p>
          }
        </div>
      </Card>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick={true}
        newestOnTop={false}
      />
    </div>
  )
}
