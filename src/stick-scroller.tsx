import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 16px;
`

const StickScroller = ({ children }) => {
  const ref = useRef(null)
  const timeoutRef = useRef<number>()
  const [stickToBottom, setStickToBottom] = useState(true)

  useEffect(() => {
    if (stickToBottom) {
      const element = ref.current
      if (element !== null) {
        element.scrollTop = element.scrollHeight - element.clientHeight
      }
    }
  })

  const handleScroll = () => {
    const MARGIN = 30

    const element = ref.current

    // In case we don't have the element (for whatever reason) we stivk to bottom
    const closeToBottom = element
      ? element.scrollTop + element.clientHeight > element.scrollHeight - MARGIN
      : true

    if (closeToBottom) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setStickToBottom(true), 100)
    } else {
      clearTimeout(timeoutRef.current)
      if (setStickToBottom) {
        setStickToBottom(false)
      }
    }
  }

  return (
    <Root ref={ref} onScroll={handleScroll}>
      {children}
    </Root>
  )
}

export default StickScroller
