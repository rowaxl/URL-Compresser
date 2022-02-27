const LinkButton = ({
  url,
  onClickLink
}) => (
  <button
    type="button"
    className="cursor-pointer hover:underline text-blue-500 text-lg"
    onClick={() => onClickLink(url)}
  >
    {url}
  </button>
)


export default LinkButton
