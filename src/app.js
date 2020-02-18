import React, { useState, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Modal from 'components/modal'
import Input from 'components/input'
import Button from 'components/button'
import Spacer from 'components/spacer'
import Distribute from 'components/distribute'
import Text from 'components/text'
import Switch from 'components/switch'
import { contrast } from 'components/utils'

import { connect } from './serial'

import Output from './output'

const Root = styled.div`
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  font-family: 'IBM Plex Mono', monospace;

  height: 100%;
  width: 100%;
  overflow: hidden;

  display: grid;

  grid-template-rows: 48px 56px 1fr;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    'header header'
    'sidebar sendbar'
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
  background: ${props => contrast(props.theme.backgroundColor, 0.05)};
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
  const [serialOutputString, setSerialOutputString] = useState('')
  const [isSerialConnected, setIsSerialConnected] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [sendData, setSendData] = useState('')

  const handleNewData = data => {
    setSerialOutputString(s => s + data)
  }

  const handleClick = async () => {
    serial.current = await connect(9600)
    serial.current.addOnDataListener(handleNewData)
    setIsSerialConnected(true)
  }

  const handleSendDataClicked = () => {
    serial.current.sendData(sendData)
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
        <Header>
          <Distribute space={1} align="center">
            {isSerialConnected && <Text>Connected to</Text>}
            {isSerialConnected && (
              <Button
                type="level2"
                onClick={() => console.log('Not implemented')}>
                Disconnect
              </Button>
            )}
            <Switch checked={isDarkTheme} onChange={v => setIsDarkTheme(v)} />
          </Distribute>
        </Header>
        <SendBar>
          <Input
            fullWidth
            value={sendData}
            onChange={e => setSendData(e.target.value)}
          />
          <Spacer left={1} />
          <Button
            type="level1"
            onClick={handleSendDataClicked}
            disabled={!isSerialConnected}>
            Send
          </Button>
        </SendBar>
        <SideBar />
        <OutputWrapper>
          <Output data={serialOutputString} />
        </OutputWrapper>

        <Modal isOpen={!isSerialConnected}>
          <Button type="level0" onClick={handleClick}>
            Connect
          </Button>
        </Modal>
      </Root>
    </ThemeProvider>
  )
}

export default App
