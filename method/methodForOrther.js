const addRequest = (requestList , {hostname, timestamp}) => {
    requestList.push({ hostname, timestamp });
    requestList.sort(function (a, b) {
      return a.timestamp - b.timestamp;
    });
};

const responseRequest = (request) => {
    const _hostname = request.hostname;
    const options = {
      hostname: _hostname,
      port: 8080,
      path: '/cs-response',
      method: 'GET',
    };
  
    const req = http.request(options, (res) => {
      let data = '';
  
      res.on('data', (chunk) => {
        data += chunk;
      });
  
      res.on('end', () => {
        console.log(`sended response to: ${_hostname}`);
      });
    });
  
    req.on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });
  
    req.end();
};


exports.addRequest = addRequest;
exports.responseRequest = responseRequest;