import React from 'react'
import styled from 'styled-components'

import StickScroller from './stick-scroller'

const Hex = styled.pre`
  margin: 0;
  font-size: 14px;
  width: 50ch;
  min-width: 50ch;
`

const TextWrapper = styled.div`
  display: flex;
`

const Text = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 14px;
`

const Line = styled.div`
  display: flex;
  height: 24px;
`

const Offset = styled.span`
  width: 5ch;
  min-width: 5ch;
  font-weight: bold;
  font-size: 14px;
  opacity: 0.2;
`

function chunkArrayInGroups(arr, size) {
  var result = []
  for (var i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))
  return result
}

function decimalToHex(d, padding) {
  var hex = Number(d).toString(16)
  padding =
    typeof padding === 'undefined' || padding === null ? (padding = 2) : padding

  while (hex.length < padding) {
    hex = '0' + hex
  }

  return hex
}

const HexOutput = ({ data }) => {
  const groupsOf16 = chunkArrayInGroups(data, 16)
  return (
    <StickScroller>
      {groupsOf16.map((go16, i) => (
        <Line key={i}>
          <Offset>{decimalToHex(i * 16, 4).toUpperCase()}</Offset>
          <Hex>
            {go16.map(val => decimalToHex(val, 2).toUpperCase()).join(' ')}
          </Hex>
          <TextWrapper>
            {go16.map((val, i) => (
              <Text key={i}>{String.fromCharCode(val)}</Text>
            ))}
          </TextWrapper>
        </Line>
      ))}
    </StickScroller>
  )
}

export default HexOutput
