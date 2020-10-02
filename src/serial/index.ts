export class Serial {
  port: Record<string, any>
  onDataListener?: (data: number[]) => void

  constructor(port: object) {
    this.port = port

    const appendStream = new WritableStream({
      write: (chunk: Uint8Array): void => {
        this.onData(chunk)
      },
    })

    this.port.readable.pipeTo(appendStream)
  }

  onData(data: Uint8Array): void {
    if (this.onDataListener) {
      this.onDataListener(Array.from(data))
    }
  }

  addOnDataListener(onDataListener: (data: number[]) => void): void {
    this.onDataListener = onDataListener
  }

  sendData(bytes: Uint8Array): void {
    const writer = this.port.writable.getWriter()

    writer.write(bytes)
    writer.releaseLock()
  }
}

export const connect = async (baudrate: number): Promise<Serial> => {
  const port = await navigator.serial.requestPort({})
  await port.open({ baudrate })

  return new Serial(port)
}

export const connectMock = async (): Promise<object> => {
  return new Serial({
    readable: new ReadableStream({
      start(controller) {
        setInterval(() => {
          controller.enqueue([Math.round(Math.random() * 255)])
        }, 10)
      },
    }),
    writable: {
      getWriter: (): object => ({
        write: (data: Uint8Array): void =>
          console.log(`Data sent to serial:`, data),
        releaseLock: (): void => {
          /* */
        },
      }),
    },
  })
}
