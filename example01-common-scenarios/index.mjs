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
