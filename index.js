const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index.router');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:3001', 'https://crissdot.github.io'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('You shall not pass'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Escuchando en el puerto: ' + port);
});
