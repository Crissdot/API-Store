const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const routerApi = require('./routes/index.router');
const { checkApiKey } = require('./middlewares/auth.handler');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = config.port;

app.use(express.json());

const whitelist = ['http://localhost:3001', 'https://crissdot.github.io'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('You shall not pass'));
    }
  }
}
app.use(cors(options));

app.get('/',
  checkApiKey,
  (req, res) => {
    res.send('Production: ' + config.isProd);
  }
);

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Escuchando en el puerto: ' + port);
});
