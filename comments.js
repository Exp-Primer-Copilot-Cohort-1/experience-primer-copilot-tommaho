// Create web server
// 1. Create a web server
// 2. Read the comments.json file
// 3. Convert the file to a JavaScript object
// 4. Send the object to the client

const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const commentsPath = path.join(__dirname, "comments.json");

// 1. Create a web server
const server = http.createServer((req, res) => {
  // 2. Read the comments.json file
  fs.readFile(commentsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal server error");
    } else {
      // 3. Convert the file to a JavaScript object
      const comments = JSON.parse(data);

      // 4. Send the object to the client
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(comments));
    }
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}`));