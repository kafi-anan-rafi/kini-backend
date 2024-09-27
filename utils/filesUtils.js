const path = require("path");
const fs = require("fs");

function removeFiles(product) {
  // delete all photos without filtering
  product.pictures.map((picture) => {
    const filePath = path.join(__dirname, "..", "uploads", picture);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message);
      } else {
        console.log("File deleted successfully");
      }
    });
  });
  return product;
}

module.exports = removeFiles;
