import { get } from 'node:http';
import { createWriteStream } from 'node:fs';
import { Transform, Writable } from 'node:stream';

const url = 'http://localhost:3009';

const getHttpsStream = () => new Promise(resolve => get(url, response => resolve(response)));

const stream = await getHttpsStream();

stream
  .pipe(
    Transform({
      objectMode: true,
      transform(chunk, enc, cb) {
        const item = JSON.parse(chunk)
        const myNumber = /\d+/.exec(item.name)[0];
        const isEven = myNumber % 2 === 0;
        item.name = item.name.concat(isEven ? 'even' : 'odd');

        cb(null, JSON.stringify(item))
      }
    })
  )
  .filter(chunk => chunk.includes('even'))
  .map(chunk => chunk.toUpperCase() + '\n')
  .pipe(createWriteStream('response.log', {flags: 'a'}))

