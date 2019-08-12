const CubejsServer = require('@cubejs-backend/server');
​
const server = new CubejsServer();
​
server.listen().then(({ port }) => {
  console.log(`🚀 Cube.js dev server is listening on ${port}`);
});