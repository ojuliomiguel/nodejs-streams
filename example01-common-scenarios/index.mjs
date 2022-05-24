// 1 - Terminal inputs
function neoStdin() {
  const stdin = process.stdin // readable stream
  //.on('data', msg => console.log('terminal input was: ', msg));

  const stdout = process.stdout //writable stream
    .on('data', msg => console.log(msg.toString().toUpperCase()));

  stdin.pipe(stdout)
}

//neoStdin()

/*
  2. GERANDO UM ARQUIVO GRANDE
  node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
*/

import http from 'http';
import { readFileSync, createReadStream } from 'fs';

http.createServer((req, res) => {
  // const file = readFileSync('big.file');
  // res.write(file);
  // res.end()

  createReadStream('big.file')
  .pipe(res)
})
.listen(3007)
.on('listening', () => console.log('server is listening at 3007'));

// curl localhost:3007 --output output.big

