interface Props {
  flag: string
}

const IconFlag: React.VFC<Props> = ({ flag }) => {
  const alt = flag
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/flag/${flag}.svg`}
      width="20"
      height="20"
      className="block w-5"
      alt={alt}
      role="presentation"
      aria-hidden="true"
    />
  )
}

export default IconFlag
