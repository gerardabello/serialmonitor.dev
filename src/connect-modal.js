import React, { useState } from 'react'

import Modal from 'components/modal'
import Button from 'components/button'
import Spacer from 'components/spacer'
import Text from 'components/text'
import Distribute from 'components/distribute'
import { Select, Option } from 'components/select'

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

const ConnectModal = ({ isOpen, onConnect }) => {
  const [baudRate, setBaudRate] = useState(9600)

  const handleClick = async () => {
    onConnect(baudRate)
  }

  const isSerialSupported = 'serial' in navigator

  return (
    <Modal isOpen={isOpen}>
      {isSerialSupported ? (
        <Distribute vertical space={2}>
          <Distribute vertical space={1}>
            <Text>Baud rate:</Text>
            <Select
              fullWidth
              value={baudRate}
              onChange={e => setBaudRate(e.target.value)}>
              {standardBaudRates.map(br => (
                <Option key={br} value={br}>
                  {br}
                </Option>
              ))}
            </Select>
          </Distribute>
          <Spacer left={30} />
          <Button type="level0" onClick={handleClick}>
            Connect
          </Button>
        </Distribute>
      ) : (
        <Distribute vertical space={2} align="center">
          <Text>Sorry! Your browser does not support the web serial API.</Text>
          <Text>At the moment it is only supported in Chrome.</Text>
        </Distribute>
      )}
    </Modal>
  )
}

export default ConnectModal
