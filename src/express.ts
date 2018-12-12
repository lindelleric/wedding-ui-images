import express from 'express';

const app = express();
const portNumber = 3000;
const sourceDir = 'dist';

app.use(express.static(sourceDir));

const proxy = require('http-proxy-middleware')
var apiProxy = proxy('/graphql', {target: 'http://localhost:4000/graphql'});
app.use(apiProxy)

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
