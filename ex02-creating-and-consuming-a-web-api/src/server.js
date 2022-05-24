import http from 'node:http';
import { Readable } from 'node:stream';
import { randomUUID } from 'node:crypto';

function* run() {
  for (let i = 0; i <= 99; i++) {
    const data = {
      id: randomUUID(),
      name: `Julio-${i}`,
      at: Date.now()
    }
    yield data;    
  }
}

function handler(req, res) {
  const readableStream = Readable({
    read() {
      for (const data of run()) {
        this.push(JSON.stringify(data).concat('\n'))
      }
      // just say that the stream has finished
      this.push(null)
    }
  }) 

  readableStream
    .pipe(res)
}

http.createServer(handler)
  .listen(3009)
  .on('listening', () => console.log('server is listening on 3009'))