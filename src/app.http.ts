import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "content-type": "text/html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "content-type": "application/javascript" });
  } else if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "content-type": "text/css" });
  }

  const contentResponse = fs.readFileSync(`./public/${req.url}`, "utf-8");
  res.end(contentResponse);

  /* res.writeHead(200, {
    "content-type": "text/html",
  });
  res.write(`<h1>URL ${req.url}</h1>`);
  res.end(); */

  /*   const data = { name: "Jhon Doe", age: 30, city: "New York" };
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(data)); */
});

server.listen(8080, () => console.log("Server Running on port 8080"));
