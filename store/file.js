const fs = require('fs');

// type ProjectId = String
// type Path = String
// type FailText = String
// data FileReport = Report { ...fields TBD }

// pathFor :: ProjectId -> Path
const pathFor = projId => __dirname + '/files/' + projId + '.json';

// del :: ProjectId -> Promise DelResponse
const del = projId => {
  return new Promise((res, rej) => {
    fs.unlink(pathFor(projId), err => {
      if (err) {
        rej({status: 500, message: err});
      } else {
        res({status: 200});
      }
    });
  });
};

// get :: ProjectId -> Promise FailReport
const get = projId => {
  return new Promise((res, rej) => {
    fs.readFile(pathFor(projId), 'utf8', (err, txt) => {
      if (err) {
        rej({status: 404, message: err});
      } else {
        res({
          status: 200,
          body: JSON.parse(txt)
        });
      }
    });
  });
};

// post :: (ProjectId, FailText) -> Promise PostReport
const post = (projId, txt) => {
  return new Promise((res, rej) => {
    const path = pathFor(projId);
    fs.stat(path, (err, _) => {
      if (err) {
        // create the new resource
        fs.writeFile(path, txt, 'utf8', (err) => {
          if (err) {
            rej({status: 500, message: err});
          } else {
            res({'status': 200});
          }
        });
      } else {
        rej({status: 409, message: 'Resource already exists'});
      }
    });    
  });
};

// put :: (ProjectId, FailText) -> Promise PutReport
const put = (projId, txt) => {
  return new Promise((res, rej) => {
    const path = pathFor(projId);
    fs.writeFile(path, txt, 'utf8', (err) => {
      if (err) {
        rej({status: 500, message: err});
      } else {
        res({'status': 200});
      }
    });
  });
};

// The store API
module.exports = {
  'delete': del,
  get: get,
  post: post,
  put: put
};

