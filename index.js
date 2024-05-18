const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	let filePath = "." + req.url;
	if (filePath === "./") {
		filePath = "./index.html";
	} else if (filePath === "./about") {
		filePath = "./about.html";
	} else if (filePath === "./contact-me") {
		filePath = "./contact-me.html";
	} else {
		filePath = "./404.html";
	}

	fs.readFile(filePath, (error, content) => {
		if (error) {
			fs.readFile("./404.html", (error404, content404) => {
				res.writeHead(200, { "Content-Type": "text/html" });
				res.end(content404, "utf-8");
			});
		} else {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(content, "utf-8");
		}
	});
});

server.listen(8080, () => {
	console.log("Server running at http://localhost:8080/");
});
