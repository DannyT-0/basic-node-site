var http = require("http");
var fs = require("fs");
var path = require("path");

http
	.createServer(function (req, res) {
		let filePath = "." + req.url;
		if (filePath == "./") {
			filePath = "./index.html";
		} else if (filePath == "./about") {
			filePath = "./about.html";
		} else if (filePath == "./contact-me") {
			filePath = "./contact-me.html";
		} else {
			filePath = "./404.html";
		}

		const extname = String(path.extname(filePath)).toLowerCase();
		const mimeTypes = {
			".html": "text/html",
			".js": "text/javascript",
			".css": "text/css",
			".json": "application/json",
			".png": "image/png",
			".jpg": "image/jpg",
			".gif": "image/gif",
			".wav": "audio/wav",
			".mp4": "video/mp4",
			".woff": "application/font-woff",
			".ttf": "application/font-ttf",
			".eot": "application/vnd.ms-fontobject",
			".otf": "application/font-otf",
			".svg": "application/image/svg+xml",
		};

		const contentType = mimeTypes[extname] || "application/octet-stream";

		fs.readFile(filePath, function (error, content) {
			if (error) {
				if (error.code == "ENOENT") {
					fs.readFile("./404.html", function (error, content) {
						res.writeHead(200, { "Content-Type": "text/html" });
						res.end(content, "utf-8");
					});
				} else {
					res.writeHead(500);
					res.end(
						"Sorry, check with the site admin for error: " +
							error.code +
							" ..\n"
					);
					res.end();
				}
			} else {
				res.writeHead(200, { "Content-Type": contentType });
				res.end(content, "utf-8");
			}
		});
	})
	.listen(8080);

console.log("Server running at http://localhost:8080/");
