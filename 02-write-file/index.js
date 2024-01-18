const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);

rl.setPrompt('Введите текст: ');
rl.prompt();

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  } else {
    writeStream.write(`${input}\n`);
    rl.prompt();
  }
});

rl.on('close', () => {
  console.log('\nПроцесс завершен. До свидания!');
  process.exit(0);
});

process.on('SIGINT', () => {
  rl.close();
});
