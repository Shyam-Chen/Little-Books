const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Little Books');
}).listen(8888);

console.log('Server running at http://localhost:8888/.');
