const headers = require('./headers');

const successHandle = (res, data) => {
  res.writeHead(200, headers);
  res.write(JSON.stringify({
    status: 'success',
    data,
  }));
  res.end();
}

const errorHandle = (res, msg) => {
  res.writeHead(400, headers);
  res.write(JSON.stringify({
    status: 'fail',
    msg,
  }));
  res.end();
}

const notFoundHandle = (res, msg) => {
  res.writeHead(404, headers);
  res.write(JSON.stringify({
    status: 'fail',
    msg,
  }));
  res.end();
}

module.exports = {
  successHandle,
  errorHandle,
  notFoundHandle,
}