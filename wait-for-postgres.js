const net = require('net');

const host = 'postgres';
const port = 5432;
const retryInterval = 2000; 
const timeout = 30000;

let isConnected = false;
const startTime = Date.now();

console.log(`Aguardando o banco de dados em ${host}:${port}...`);

const tryToConnect = () => {
  if (Date.now() - startTime > timeout) {
    console.error('Tempo limite excedido esperando pelo banco de dados.');
    process.exit(1);
  }

  const socket = new net.Socket();

  socket.connect(port, host, () => {
    console.log('Banco de dados conectado com sucesso!');
    isConnected = true;
    socket.end();
    process.exit(0);
  });

  socket.on('error', (err) => {
    socket.destroy();
    setTimeout(tryToConnect, retryInterval);
  });
};

tryToConnect();
