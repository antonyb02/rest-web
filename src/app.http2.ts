import http2 from "http2";
import fs from "fs";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
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

    try {
      const contentResponse = fs.readFileSync(`./public/${req.url}`, "utf-8");
      res.end(contentResponse);
    } catch (error) {
      res.writeHead(404, { "content-type": "text/html" });
      res.end();
    }

    /* res.writeHead(200, {
    "content-type": "text/html",
  });
  res.write(`<h1>URL ${req.url}</h1>`);
  res.end(); */

    /*   const data = { name: "Jhon Doe", age: 30, city: "New York" };
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(data)); */
  },
);

server.listen(8080, () => console.log("Server Running on port 8080"));
