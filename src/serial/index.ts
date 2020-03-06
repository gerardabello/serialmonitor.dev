export class Serial {
  port: any
  onDataListener: any

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
    if (this.onDataListener) {
      this.onDataListener(Array.from(data))
    }
  }

  addOnDataListener(onDataListener) {
    this.onDataListener = onDataListener
  }

  sendData(bytes) {
    const writer = this.port.writable.getWriter()

    writer.write(bytes)
    writer.releaseLock()
  }
}

export const connect = async baudrate => {
  // @ts-ignore
  const port = await navigator.serial.requestPort({})
  await port.open({ baudrate })

  return new Serial(port)
}

export const connectMock = async () => {
  return new Serial({
    readable: new ReadableStream({
      start(controller) {
        setInterval(() => {
          controller.enqueue([Math.round(Math.random() * 255)])
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
