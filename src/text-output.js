import React from 'react'
import styled from 'styled-components'

import StickScroller from './stick-scroller'

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
  opacity: 0.2;
`

const TextOutput = ({ data }) => {
  const textData = data.map(i => String.fromCharCode(i)).join('')

  return (
    <StickScroller>
      {textData.split('\n').map((line, i) => (
        <Line key={i}>
          <LineNumber>{i}</LineNumber>
          <Pre>{line}</Pre>
        </Line>
      ))}
    </StickScroller>
  )
}

export default TextOutput
