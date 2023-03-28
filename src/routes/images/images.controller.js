const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const db = require("../../../db/models");
const { Images } = db;

// Use storage engine of multer to store the files

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "pictures");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create multer object
const imageUpload = multer({
  storage: storage,
});

// Image Get Routes
router.get("/:filename", async (req, res) => {
  const { filename } = req.params;
  const images = await Images.findAll({
    where: {
      fileName: filename,
    },
  });
  //   console.log(images[0], "hello");
  if (images[0]) {
    const dirName = path.resolve();
    const fullFilePath = path.join(dirName, images[0].filePath);
    return res.type(images[0].type).sendFile(fullFilePath);
  } else {
    return res.status(400).send({ message: "Image does not exist" });
  }
});

// Image Upload Routes
router.post("/upload", imageUpload.single("image"), async (req, res) => {
    // console.log(req.file, "hello");
  const { filename, mimetype, size } = req.file;
  const filePath = req.file.path;

  const imagesData = await Images.create({
    fileName: filename,
    filePath: filePath,
    type: mimetype,
    size: size,
  });
  if (imagesData) {
    res.status(200).send({ message: "File Uploaded", data: imagesData });
  } else {
    res.status(400).send({ message: "File Uploaded Failed..." });
  }
});

// Image Upload Routes
router.post("/bulk", imageUpload.array("images", 4), async (req, res) => {
  console.log(req.file, "hello");
  const { filename, mimetype, size } = req.file;
  const filePath = req.file.path;

  const imagesData = await Images.create({
    fileName: filename,
    filePath: filePath,
    type: mimetype,
    size: size,
  });
  if (imagesData) {
    res.status(200).send({ message: "File Uploaded", data: imagesData });
  } else {
    res.status(400).send({ message: "File Uploaded Failed..." });
  }
});

module.exports = router;
