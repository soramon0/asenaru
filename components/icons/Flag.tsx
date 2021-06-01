interface Props {
  flag: string
}

const IconFlag: React.VFC<Props> = ({ flag }) => {
  return (
    <img
      src={`/flag/${flag}.svg`}
      width="20"
      height="20"
      className="block w-5"
      alt={flag}
    />
  )
}

export default IconFlag
