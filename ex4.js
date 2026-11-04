// Exercise 4: Parse and Log URL Parts
// Print the following parts of the URL:
//   Hostname: localhost
//   Pathname: /users/list
//   Protocol: http:
//   Query: ?role=admin&active=true
//   Hash: #top
//
// Run: node ex4.js

const { URL } = require("url");

const urlStr = 'http://localhost:3000/users/list?role=admin&active=true#top';

// write your code here

const http = require("http");
const server = http.createServer((req, res) => {

    const myUrl = new URL(urlStr);
    let obj = {
        hostname: myUrl.hostname, 
        pathname: myUrl.pathname, 
        protocol: myUrl.protocol, 
        query: myUrl.search, 
        hash: myUrl.hash
    }
    
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(obj));

});
server.listen(3000, () => console.log("Server running on http://localhost:3000"));
