import React, { useState, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Input from 'components/input'
import Button from 'components/button'
import Spacer from 'components/spacer'
import Distribute from 'components/distribute'
import Switch from 'components/switch'
import { Select, Option } from 'components/select'
import { contrast } from 'components/utils'

// import { connect } from './serial'
import { connectMock as connect } from './serial'

import TextOutput from './text-output'
import ConnectModal from './connect-modal'

const Root = styled.div`
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  font-family: 'IBM Plex Mono', monospace;

  height: 100%;
  width: 100%;
  overflow: hidden;

  display: grid;

  grid-template-rows: 56px 1fr;
  grid-template-columns: 0px 1fr;
  grid-template-areas:
    'header sendbar'
    'sidebar output';
`

const OutputWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  grid-area: output;
`

const Header = styled.div`
  height: 100%;
  grid-area: header;
  background: ${props => contrast(props.theme.backgroundColor, 0.1)};
  display: flex;
  align-items: center;
  padding: 0 12px;
`

const SendBar = styled.div`
  height: 100%;
  grid-area: sendbar;
  background: ${props => contrast(props.theme.backgroundColor, 0.1)};
  display: flex;
  align-items: center;
  padding: 0 12px;
`

const SideBar = styled.div`
  height: 100%;
  grid-area: sidebar;
  background: ${props => contrast(props.theme.backgroundColor, 0.15)};
`

const standardBaudRates = [
  110,
  300,
  600,
  1200,
  2400,
  4800,
  9600,
  14400,
  19200,
  38400,
  57600,
  115200,
  128000,
  256000
]

const App = () => {
  const serial = useRef()
  const [serialOutput, setSerialOutput] = useState([])
  const [isSerialConnected, setIsSerialConnected] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [sendData, setSendData] = useState('')
  const [sendDataType, setSendDataType] = useState('text')

  const handleNewData = data => {
    setSerialOutput(s => [...s, ...data])
  }

  const handleOnConnect = async baudRate => {
    serial.current = await connect(baudRate)
    serial.current.addOnDataListener(handleNewData)
    setIsSerialConnected(true)
  }

  const handleSendDataClicked = () => {
    let bytes

    switch (sendDataType) {
      case 'text': {
        var enc = new TextEncoder()
        bytes = enc.encode(sendData)
        break
      }

      case 'decimal': {
        bytes = new Uint8Array(sendData.split(',').map(s => parseInt(s, 10)))
        break
      }
    }

    serial.current.sendData(bytes)
    setSendData('')
  }

  return (
    <ThemeProvider
      theme={
        isDarkTheme
          ? {
              backgroundColor: '#111111',
              textColor: '#f3f3f3',
              highlightColor: '#0551c3',
              lightColor: '#a9a9a9',
              focusColor: '#d4bc13'
            }
          : {
              backgroundColor: '#f3f3f3',
              textColor: '#222222',
              highlightColor: '#4534a7',
              lightColor: '#484848',
              focusColor: '#de6b08'
            }
      }>
      <Root>
        {/*
        <Header>
          <Distribute space={1} align="center">
            <Switch checked={isDarkTheme} onChange={v => setIsDarkTheme(v)} />
          </Distribute>
        </Header>
        */}
        <SendBar>
          <Input
            fullWidth
            value={sendData}
            onChange={e => setSendData(e.target.value)}
          />
          <Spacer left={1} />
          <Select
            value={sendDataType}
            onChange={e => setSendDataType(e.target.value)}>
            <Option value="text">TEXT</Option>
            <Option value="decimal">DECIMAL</Option>
          </Select>
          <Spacer left={1} />
          <Button
            type="level1"
            onClick={handleSendDataClicked}
            disabled={!isSerialConnected}>
            Send
          </Button>
        </SendBar>
        {/*
        <SideBar>
          <Spacer top={2} bottom={2} left={2} right={2}>
            <Select>
              <Option value="text">TEXT</Option>
              <Option value="hex">HEX</Option>
            </Select>
          </Spacer>
        </SideBar>
        */}
        <OutputWrapper>
          <TextOutput data={serialOutput} />
        </OutputWrapper>
        <ConnectModal isOpen={!isSerialConnected} onConnect={handleOnConnect} />
      </Root>
    </ThemeProvider>
  )
}

export default App
