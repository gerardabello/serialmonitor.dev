import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 16px;
`

const Pre = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 14px;
`

const Line = styled.div`
  display: flex;
`

const LineNumber = styled.span`
  min-width: 26px;
  margin-right: 8px;
  margin-top: 1px;
  font-weight: bold;
  font-size: 14px;
`

const Output = ({ data }) => {
  const ref = useRef()
  const timeoutRef = useRef()
  const [stickToBottom, setStickToBottom] = useState(true)

  useEffect(() => {
    if (stickToBottom) {
      const element = ref.current
      element.scrollTop = element.scrollHeight - element.clientHeight
    }
  }, [data])

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
      {data.split('\n').map((line, i) => (
        <Line key={i}>
          <LineNumber>{i}</LineNumber>
          <Pre>{line}</Pre>
        </Line>
      ))}
    </Root>
  )
}

export default Output
