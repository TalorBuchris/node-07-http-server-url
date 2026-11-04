// Exercise 6: Modify Query Parameters
// - Change the query parameter sort to 'desc'
// - Add a new parameter page=3
// - Remove query
// - Print the final URL:
//   https://app.com/search?sort=desc&page=3
// Hint: .searchParams.set(), .searchParams.append(), .searchParams.delete()
//
// Run: node ex6.js

const { URL } = require("url");

const urlStr = 'https://app.com/search?query=node&sort=asc';

// write your code here

const http = require("http");
const server = http.createServer((req, res) => {
    const myUrl = new URL(urlStr);
    myUrl.searchParams.set('sort', 'desc');
    myUrl.searchParams.set('page', 3);
    myUrl.searchParams.delete('query');
    res.end(myUrl.href)
});
server.listen(3000, () => console.log("Server running on http://localhost:3000"));
