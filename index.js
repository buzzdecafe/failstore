const config = require('./config/' + (process.argv[2] || 'dev'));
const store = require('./store/file');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.get('/:projId', (req, res) => {
  store.get(req.params.projId)
    .then(
      ok    => res.json(ok),
      error => res.status(error.status).send(error.message)
    );
});

app.post('/:projId', (req, res) => {
  store.post(req.params.projId, JSON.stringify(req.body))
    .then(
      ok    => res.json(ok),
      error => res.status(error.status).send(error.message)
    );
});

app.put('/:projId', (req, res) => {
  store.put(req.params.projId, JSON.stringify(req.body))
    .then(
      ok    => res.json(ok),
      error => res.status(error.status).send(error.message)
    );
});

app.delete('/:projId', (req, res) => {
  store.delete(req.params.projId)
    .then(
      ok    => res.json(ok),
      error => res.status(error.status).send(error.message)
    );
});

//----------------------------
// Start your engines
//----------------------------
const server = app.listen(app.get('port'), () => {
  console.log('Failstore is running on port', app.get('port'));
  console.log('Failstore is using configuration for "' + (process.argv[2] || 'dev') + '"');
});

//--------------------------
// Shutdown
//-------------------------
const graceful = () => {
  console.log("Gracefully stopping server....");
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit()
  });

  // backstop: force kill it if not dead after 10 secs
  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit()
  }, 10000);
};

// listen for TERM signal .e.g. kill 
process.on('SIGTERM', graceful);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', graceful);   

module.exports = app;
