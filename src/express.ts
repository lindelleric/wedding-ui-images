import express from 'express';
import path from 'path';

const app = express();
const portNumber = 8080;
const sourceDir = './../public';

const proxy = require('http-proxy-middleware')
var apiProxy = proxy('/graphql', {target: 'http://localhost:4000'});
app.use(apiProxy)

//// TODO: fix internal routing issue i.e. historyFallback
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, `${sourceDir}/index.html`), (err: any) => {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

app.use('/', express.static(path.join(__dirname, sourceDir)))

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
