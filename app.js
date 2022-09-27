const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(fileUpload());

app.use(express.static("uploads"));

app.get("/", function (req, res) {
  res.send(
    '<form method="post" action="/upload" enctype="multipart/form-data">' +
      '<p>Title: <input type="text" name="title" /></p>' +
      '<p>Image: <input type="file" name="companyLogo" /></p>' +
      '<p><input type="submit" value="Upload" /></p>' +
      "</form>"
  );
});

app.get("/files/:fileName", function (req, res) {
  console.log(req);
  res.send(
    `<a href="/">home</> <img src="/${req.params.fileName}" alt="image" />`
  );
});

app.post("/upload", function (req, res) {
  console.clear();
  res.setHeader("Access-Control-Allow-Origin", "*");
  let sampleFile;
  let uploadPath;
  console.log("++++", req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  console.log("req.files: __: ", req.files); // eslint-disable-line

  sampleFile = req.files.companyLogo;

  uploadPath = __dirname + "/uploads/" + sampleFile.name;
  console.log("uploadPath ====", uploadPath);

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    //   res.send("File uploaded to " + uploadPath);
    res.redirect(`/files/${sampleFile.name}`);
  });
});

app.listen(PORT, function () {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
