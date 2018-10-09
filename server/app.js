const express       = require('express'),
      routes        = require('./routes'),
      cors          = require('cors'),
      bodyParser    = require('body-parser'),
      helmet        = require('helmet'),
      path          = require('path'),
      app           = express(),
      router        = express.Router();

let port = 4000 || process.env.PORT;

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/api', router);

app.listen(port, () => { console.log(`Server started at ${port}`)});