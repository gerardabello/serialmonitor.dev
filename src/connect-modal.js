import React, { useState } from 'react'

import Modal from 'components/modal'
import Button from 'components/button'
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

  return (
    <Modal isOpen={isOpen}>
      <Distribute vertical space={2}>
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
        <Button type="level0" onClick={handleClick}>
          Connect
        </Button>
      </Distribute>
    </Modal>
  )
}

export default ConnectModal
