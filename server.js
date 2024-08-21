require('dotenv').config();
const http = require('http');
const PORT = process.env.PORT || 8080; 
const app = require('./app');

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso! ', PORT);
});
