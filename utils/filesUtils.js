const path = require("path");
const fs = require("fs");

function removeFiles(product, next) {
  // delete all photos without filtering
  product.pictures.map((picture) => {
    const filePath = path.join(__dirname, "..", "uploads", picture);
    fs.unlink(filePath, (err) => {
      if (err) {
        next(err);
      }
    });
  });
  return product;
}

module.exports = removeFiles;
