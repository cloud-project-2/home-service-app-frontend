const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:', data);
    if (res.statusCode === 200) {
      console.log('✅ Health check PASSED - Status 200 received');
    } else {
      console.log('❌ Health check FAILED - Expected status 200');
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Health check FAILED - Error: ${e.message}`);
});

req.end(); 