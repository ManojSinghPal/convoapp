const express = require("express");
const multer = require("multer");
const docxTopdf = require("docx-pdf");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// setting up the file storage service
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/convertFile", upload.single("file"), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  try {
    if (!req.file) {
      return res.status(400).json({ message: "File not upload" });
    }

    // defining output file path
    let outputpath = path.join(
      __dirname,
      "files",
      `${req.file.originalname}.pdf`
    );
    docxTopdf(req.file.path, outputpath, (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "error occure while converting word to pdf" });
      }

      res.download(outputpath, () => {
        console.log("file downloaded");
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal error",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
