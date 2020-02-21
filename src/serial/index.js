class Serial {
  constructor(port) {
    this.port = port

    const appendStream = new WritableStream({
      write: chunk => {
        this.onData(chunk)
      }
    })

    this.port.readable.pipeTo(appendStream)
  }

  onData(data) {
    if (this.addOnDataListener) {
      this.onDataListener(data)
    }
  }

  addOnDataListener(onDataListener) {
    this.onDataListener = onDataListener
  }

  sendData(data) {
    let bytes

    switch (typeof data) {
      case 'string': {
        var enc = new TextEncoder()
        bytes = enc.encode(data)
        break
      }

      case 'number': {
        bytes = new Uint8Array([data])
        break
      }
    }

    const writer = this.port.writable.getWriter()

    writer.write(bytes)
    writer.releaseLock()
  }
}

export const connect = async baudrate => {
  const port = await navigator.serial.requestPort({})
  await port.open({ baudrate })

  // DEBUG
  navigator.serial.ondisconnect = console.warn
  navigator.serial.onconnect = console.warn
  window.serialPort = port

  return new Serial(port)
}

export const connectMock = async () => {
  return new Serial({
    readable: new ReadableStream({
      start(controller) {
        setInterval(() => {
          controller.enqueue(Math.round(Math.random() * 255))
        }, 10)
      }
    }),
    writable: {
      getWriter: () => ({
        write: data => console.log(`Data sent to serial:`, data),
        releaseLock: () => {}
      })
    }
  })
}
