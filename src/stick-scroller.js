import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 16px;
`

const StickScroller = ({ children }) => {
  const ref = useRef()
  const timeoutRef = useRef()
  const [stickToBottom, setStickToBottom] = useState(true)

  useEffect(() => {
    if (stickToBottom) {
      const element = ref.current
      element.scrollTop = element.scrollHeight - element.clientHeight
    }
  })

  const handleScroll = () => {
    const MARGIN = 30

    const element = ref.current

    const closeToBottom =
      element.scrollTop + element.clientHeight > element.scrollHeight - MARGIN

    if (closeToBottom) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setStickToBottom(true), 100)
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
