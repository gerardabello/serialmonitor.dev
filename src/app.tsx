import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import Input from 'components/input'
import Button from 'components/button'
import Text from 'components/text'
import Spacer from 'components/spacer'
import Spread from 'components/spread'
import Distribute from 'components/distribute'
import Switch from 'components/switch'
import ThemeProvider from 'components/theme-provider'
import { Select, Option } from 'components/select'
import { contrast } from 'components/utils'

import { connect, Serial } from './serial'
// import { connectMock as connect } from './serial'

import TextOutput from './text-output'
import HexOutput from './hex-output'
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
  grid-template-columns: 240px 1fr;
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
  justify-content: center;
  font-weight: bold;
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
  position: relative;
`
const SideBarFooter = styled.div`
  background: ${props => contrast(props.theme.backgroundColor, 0.1)};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 16px;
`

const App = () => {
  const serial = useRef<Serial | null>(null)
  const [serialOutput, setSerialOutput] = useState<Array<number>>([])
  const [isSerialConnected, setIsSerialConnected] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [sendData, setSendData] = useState('')
  const [sendDataType, setSendDataType] = useState('text')
  const [outputDataType, setOutputDataType] = useState('text')

  const Output = outputDataType === 'text' ? TextOutput : HexOutput

  const handleNewData = (data: Array<number>): void => {
    setSerialOutput(s => [...s, ...data])
  }

  const handleOnConnect = async (baudRate: number): Promise<void> => {
    serial.current = await connect(baudRate)
    serial.current.addOnDataListener(handleNewData)
    setIsSerialConnected(true)
  }

  const handleSendDataClicked = (): void => {
    let bytes

    switch (sendDataType) {
      case 'text': {
        const enc = new TextEncoder()
        bytes = enc.encode(sendData)
        break
      }

      case 'decimal': {
        bytes = new Uint8Array(sendData.split(',').map(s => parseInt(s, 10)))
        break
      }

      case 'hex': {
        bytes = new Uint8Array(sendData.split(',').map(s => parseInt(s, 16)))
        break
      }

      default:
        throw new Error('Unknown send data type')
    }

    if (serial.current !== null) {
      serial.current.sendData(bytes)
      setSendData('')
    }
  }

  return (
    <ThemeProvider
      {...(isDarkTheme
        ? {
            backgroundColor: '#111111',
            textColor: '#f3f3f3',
            highlightColor: '#0551c3',
            lightColor: '#a9a9a9',
            focusColor: '#d4bc13',
          }
        : {
            backgroundColor: '#f3f3f3',
            textColor: '#222222',
            highlightColor: '#4534a7',
            lightColor: '#484848',
            focusColor: '#de6b08',
          })}
    >
      <Root>
        <Header>serialmonitor.dev</Header>
        <SendBar>
          <Input
            fullWidth
            value={sendData}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setSendData(e.target.value)
            }
          />
          <Spacer left={1} />
          <Select
            value={sendDataType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
              setSendDataType(e.target.value)
            }
          >
            <Option value="text">TEXT</Option>
            <Option value="hex">HEX</Option>
            <Option value="decimal">DECIMAL</Option>
          </Select>
          <Spacer left={1} />
          <Button
            kind="level0"
            onClick={handleSendDataClicked}
            disabled={!isSerialConnected}
          >
            Send
          </Button>
        </SendBar>
        <SideBar>
          <Spacer top={2} bottom={2} left={2} right={2}>
            <Distribute vertical space={2}>
              <Distribute vertical space={1}>
                <Text>Output format:</Text>
                <Select
                  value={outputDataType}
                  onChange={e => setOutputDataType(e.target.value)}
                >
                  <Option value="text">TEXT</Option>
                  <Option value="hex">HEX</Option>
                </Select>
              </Distribute>
            </Distribute>
            <SideBarFooter>
              <Spread align="center">
                <Text>Dark theme:</Text>
                <Switch
                  checked={isDarkTheme}
                  onChange={v => setIsDarkTheme(v)}
                />
              </Spread>
            </SideBarFooter>
          </Spacer>
        </SideBar>
        <OutputWrapper>
          <Output data={serialOutput} />
        </OutputWrapper>
        <ConnectModal isOpen={!isSerialConnected} onConnect={handleOnConnect} />
      </Root>
    </ThemeProvider>
  )
}

export default App
