import { Fragment } from 'react'

export default function SplitText({
  text,
  as: Tag = 'span',
  italic = [],
  delay = 0,
  className = '',
  ...rest
}) {
  const words = text.split(' ')

  return (
    <Tag className={className} style={{ '--base': `${delay}ms` }} {...rest}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden="true" className="split-word">
            <span className={italic.includes(word) ? 'font-normal italic' : ''} style={{ '--i': i }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}