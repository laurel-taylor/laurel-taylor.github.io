import { forwardRef } from 'react'
import './ScrollContainer.css'

const ScrollContainer = forwardRef(function ScrollContainer(
  { as: Tag = 'div', className, header, children, ...props },
  ref,
) {
  return (
    <Tag className={['scroll-panel', className].filter(Boolean).join(' ')} {...props}>
      {header}
      <div className="scroll-container" ref={ref}>
        {children}
      </div>
    </Tag>
  )
})

export default ScrollContainer
